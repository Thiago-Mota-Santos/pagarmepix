'use client'
import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextProps {
  user: User | null
  googleSignIn: () => Promise<void>
  logOut: () => Promise<void>
  email: string
  password: string
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  normalSignIn: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const normalSignIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const logOut = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        email,
        password,
        googleSignIn,
        logOut,
        setEmail,
        setPassword,
        normalSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function UserAuth() {
  return useContext(AuthContext)
}
