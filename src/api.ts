import { Conversation } from './types/conversation'
import { User } from './types/user'

const api = {
  user: { fetch: () : User['id'] => 1 },
  conversation: {
    list: async (user:User['id']): Promise<Conversation[]> => fetch(`http://localhost:3005/conversations/${user}`).then(res => res.json())
  }
}

export default api
