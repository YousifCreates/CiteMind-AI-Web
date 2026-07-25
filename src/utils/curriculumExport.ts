import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  BorderStyle,
} from 'docx'
import { saveAs } from 'file-saver'
import type { LearningPathWithModules, Topic } from '../types'

interface ModuleWithOptionalTopics {
  title: string
  description?: string
  topics?: Topic[]
}

export async function exportCurriculumToDocx(
  path: LearningPathWithModules,
  moduleTopicsMap: Record<string, Topic[]>,
) {
  const sortedModules = [...path.modules].sort(
    (a, b) => a.order_index - b.order_index,
  )

  const children: Paragraph[] = [
    new Paragraph({
      text: path.topic,
      heading: HeadingLevel.TITLE,
    }),
  ]

  if (path.description) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: path.description, italics: true })],
        spacing: { after: 300 },
      }),
    )
  }

  sortedModules.forEach((module, moduleIndex) => {
    children.push(
      new Paragraph({
        text: `${moduleIndex + 1}. ${module.title}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 100 },
      }),
    )

    if (module.description) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: module.description })],
          spacing: { after: 150 },
        }),
      )
    }

    const topics = moduleTopicsMap[module.id] ?? []
    const sortedTopics = [...topics].sort((a, b) => a.order_index - b.order_index)

    if (sortedTopics.length === 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '(No topics generated for this module yet)',
              italics: true,
              color: '8B93A7',
            }),
          ],
          spacing: { after: 200 },
        }),
      )
    } else {
      sortedTopics.forEach((topic, topicIndex) => {
        children.push(
          new Paragraph({
            text: `${moduleIndex + 1}.${topicIndex + 1} ${topic.title}`,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 80 },
          }),
        )

        if (topic.description) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: topic.description })],
              spacing: { after: 100 },
            }),
          )
        }

        // Notes placeholder — blank ruled space for the learner to fill in
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'Notes:', bold: true, size: 20 })],
            spacing: { before: 80, after: 40 },
          }),
        )

        for (let i = 0; i < 4; i++) {
          children.push(
            new Paragraph({
              text: '',
              border: {
                bottom: {
                  color: 'CCCCCC',
                  space: 1,
                  style: BorderStyle.SINGLE,
                  size: 6,
                },
              },
              spacing: { after: 200 },
            }),
          )
        }
      })
    }
  })

  const doc = new Document({
    sections: [{ children }],
  })

  const blob = await Packer.toBlob(doc)
  const filename = `${path.topic.replace(/[^a-z0-9]+/gi, '_')}_curriculum.docx`
  saveAs(blob, filename)
}