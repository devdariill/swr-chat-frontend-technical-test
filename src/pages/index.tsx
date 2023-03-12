import Link from 'next/link'
import { Conversation } from '../types/conversation'
import { getLoggedUserId } from '../utils/getLoggedUserId'

type Props = {
  user:number
  conversations: Conversation[]
}

export const getServerSideProps = async () => {
  const user = getLoggedUserId()
  const conversations: Conversation[] = await fetch(`http://localhost:3005/conversations/${user}`).then(res => res.json())
  return { props: { conversations, user } }
}
const Home = ({ conversations, user }:Props) => {
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
