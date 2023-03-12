import { Conversation } from './types/conversation'
import { Message } from './types/message'
import { User } from './types/user'

const api = {
  user: { fetch: () : User['id'] => 1 },
  conversation: {
    list: async (user:User['id']): Promise<Conversation[]> => fetch(`http://localhost:3005/conversations/${user}`).then(res => res.json())
  },
  meesages: {
    list: async (conversation:Conversation['id']): Promise<Message[]> => fetch(`http://localhost:3005/messages/${conversation}`).then(res => res.json())
  }
}

export default api
