import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { createChatSession, updateChatSession, sendChatMessage } from '../api/chat'
import { listModuleTopics } from '../api/learning'
import { useChatStore } from '../store/chatStore'
import { ROUTES } from '../constants'
import type { LearningModule } from '../types'

export function useStartModuleChat() {
  const navigate = useNavigate()
  const setActiveSessionId = useChatStore((state) => state.setActiveSessionId)
  const queryClient = useQueryClient()

  async function startModuleChat(module: LearningModule, pathTopic: string) {
    const session = await createChatSession({ title: module.title })

    let topics: string[] = []
    try {
      const moduleTopics = await listModuleTopics(module.id)
      topics = moduleTopics
        .sort((a, b) => a.order_index - b.order_index)
        .map((t) => t.title)
    } catch {
      // no topics generated yet — proceed without them
    }

    const intro = topics.length
      ? `I'd like to continue learning "${module.title}" from my "${pathTopic}" curriculum. Please teach me this module, covering: ${topics.join(', ')}.`
      : `I'd like to continue learning "${module.title}" from my "${pathTopic}" curriculum. Please teach me this module.`

    await sendChatMessage(session.id, { content: intro })
    await updateChatSession(session.id, { title: module.title })

    queryClient.invalidateQueries({ queryKey: ['chat', 'sessions'] })
    setActiveSessionId(session.id)
    navigate(ROUTES.LEARN)
  }

  return { startModuleChat }
}