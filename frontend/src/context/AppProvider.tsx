import { FC, ReactNode, createContext, useState } from "react"

type Props = {
  children: ReactNode
}

type ContextType = {
  setUser: React.Dispatch<React.SetStateAction<User>>
  user: User,
  setCalling: React.Dispatch<React.SetStateAction<boolean>>
  calling: boolean
}

export type User = {
  id?: number
  name?: string | null
  phone?: string
  email?: string | null
  token?: string | null
}


export const AppContext = createContext<ContextType>({
  setUser: () => { throw Error('function is undefined') },
  setCalling: () => { throw Error('function is undefined') },
  calling: false,
  user: {
    token: localStorage.getItem('token')
  }
})

const AppProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>({
    token: localStorage.getItem('token')
  })
  const [calling, setCalling] = useState<boolean>(false)
  return (
    <AppContext.Provider value={{
      user, setUser,
      calling, setCalling
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider