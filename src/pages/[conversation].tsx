import type { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import type { Message } from '../types/message'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import useSWR from 'swr'

type Props = {
  user:number
  messages: Message[],
  conversation: string
}
export const getServerSideProps: GetServerSideProps = async ({ params: { conversation } }) => {
  const user = getLoggedUserId()
  const messages: Message[] = await fetch(`http://localhost:3005/messages/${conversation}`).then(res => res.json())
  return { props: { messages, user, conversation } }
}

const ConversationPage = ({ messages: initialMessages, user, conversation }:Props) => {
  const [message, setMessage] = useState<string>('')
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: messages } = useSWR(`http://localhost:3005/messages/${conversation}`, fetcher, {
    refreshInterval: 5000,
    fallbackData: initialMessages
  })
  async function handleSubmit (event:React.FormEvent) {
    // event.preventDefault()
    await fetch(`http://localhost:3005/messages/${conversation}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ conversationId: conversation, body: message, authorId: user, timestamp: 0 })
    })
  }

  // useEffect(() => {
  //   let timeout: any
  //   if (!message) {
  //     timeout = setTimeout(() => {
  //       window.location.reload()
  //     }, 5000)
  //   }
  //   return () => {
  //     clearTimeout(timeout)
  //   }
  // }, [message])

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map(({ id, body, authorId }) => {
          const isSender = user === authorId
          return (
            <li key={id} style={{ padding: 12, border: '1px solid gainsboro', borderRadius: 12, backgroundColor: isSender ? 'dodgerblue' : 'gray', width: 'fit-content', alignSelf: isSender ? 'flex-end' : 'flex-start' }}>
              {body}
            </li>
          )
        })}
      </ul>
      <div style={{ display: 'flex', height: '50px', gap: '10px', marginTop: '10px' }}>
        <input value={message} onChange={e => { setMessage(e.target.value) }} type='text' style={{ flex: 1, backgroundColor: 'transparent', color: '#fff', border: '1px solid gainsboro', padding: '0 12px' }} autoFocus />
        <button type='submit' style={{ borderRadius: 10, minWidth: 120 }}>Enviar</button>
      </div>
    </form>
  )
}

export default ConversationPage
