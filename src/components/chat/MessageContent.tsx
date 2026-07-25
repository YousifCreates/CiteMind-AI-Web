import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import 'katex/dist/katex.min.css'

interface MessageContentProps {
  content: string
}

export default function MessageContent({ content }: MessageContentProps) {
  return (
    <div className="text-sm leading-relaxed prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-bold text-[#E8EAED] mt-4 mb-2 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold text-[#E8EAED] mt-4 mb-2 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-bold text-[#E8EAED] mt-3 mb-1.5 first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 last:mb-0 whitespace-pre-wrap">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-5 mb-3 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 mb-3 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          a: ({ href, children }) => (

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4F9DFF] hover:underline"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#4F9DFF]/40 pl-3 italic text-[#8B93A7] mb-3">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border border-[#232838] rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-[#12161F] border border-[#232838] px-3 py-1.5 text-left text-xs font-semibold text-[#E8EAED]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-[#232838] px-3 py-1.5 text-xs text-[#8B93A7]">
              {children}
            </td>
          ),
          code(props) {
            const { className, children } = props
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !className

            if (isInline) {
              return (
                <code className="bg-[#0B0E14] border border-[#232838] rounded px-1.5 py-0.5 text-xs font-mono text-[#4F9DFF]">
                  {children}
                </code>
              )
            }

            return (
              <div className="rounded-lg overflow-hidden border border-[#232838] mb-3 mt-1">
                {match && (
                  <div className="bg-[#1e1e1e] px-3 py-1.5 text-[10px] font-mono text-[#8B93A7] border-b border-[#232838]">
                    {match[1]}
                  </div>
                )}
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match ? match[1] : undefined}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    fontSize: '13px',
                    padding: '12px 14px',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}