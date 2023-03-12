import Link from 'next/link'
import api from '../api'

// type Props = {
//   user:number
//   conversations: Conversation[]
// }

const Home = async () => {
  const user = await api.user.fetch()
  const conversations = await api.conversation.list(user)
  // const { user, conversations } = await getData()
  console.log(conversations)
  return (
    <main>
      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        {conversations.map(({ id, senderId, recipientNickname, senderNickname, lastMessageTimestamp }) => (
          <li key={id} style={{ padding: 12, border: '1px solid gainsboro', borderRadius: 12 }}>
            <Link href={`/conversations/${id}`} style={{ fontSize: 24, fontWeight: 'bold' }}>
              {user === senderId ? recipientNickname : senderNickname}
            </Link>
            <p>{new Date(Date.now() - lastMessageTimestamp).toLocaleString('es-CO')}</p>
            <p>{new Date(Date.now() - lastMessageTimestamp).toString()}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home
