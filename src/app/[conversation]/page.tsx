import type React from 'react'
import api from '../../api'
import ConversationClientPage from './client'

type Props = {
 params:{
    conversation: number
 }
}

const ConversationPage = async ({ params: { conversation } }:Props) => {
  const messages = await api.meesages.list(conversation)
  const user = await api.user.fetch()
  return (
    <ConversationClientPage messages={messages} user={user} conversation={conversation} />
  )
}

export default ConversationPage
