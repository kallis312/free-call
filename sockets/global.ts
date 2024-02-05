export interface User {
  name?: string
  socket: string
  _id: string
}

export let users: User[] = []