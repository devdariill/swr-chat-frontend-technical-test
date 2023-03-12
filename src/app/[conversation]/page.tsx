import type React from 'react'
import type { Message } from '../../types/message'
import { getLoggedUserId } from '../../utils/getLoggedUserId'
import ConversationClientPage from './client'

type Props = {
 params:{
    conversation: string
 }
}
const getConversations = async (conversation:any) => {
  const user = getLoggedUserId()
  const messages: Message[] = await fetch(`http://localhost:3005/messages/${conversation}`).then(res => res.json())
  return { messages, user }
}

const ConversationPage = async ({ params: { conversation } }:Props) => {
  const { messages, user } = await getConversations(conversation)
  return (
    <ConversationClientPage messages={messages} user={user} conversation={conversation} />
  )
}

export default ConversationPage
