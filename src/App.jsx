import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useState, useEffect } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import { index } from "./services/userService"
import * as userService from './services/userService'


const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(getUserFromToken())
  const [allUsers, setAllUsers]= useState([])

    useEffect(() => {

    const fetchAllUsers = async () => {
      try {
        const usersData = await userService.index()
        setAllUsers(usersData)
      } catch (error){
        console.log(error)
      } finally  {
        setIsLoading(false)
      }
    }
    
    fetchAllUsers()

  }, [])


  
  
  return (
    <div>
      <Nav user={user}  setUser={setUser}/>
      <main className="app-main">
      <Routes>
        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser}/>} />
        <Route path='/' element={user ? <Dashboard user={user} allUsers={allUsers} /> : <Landing />} />
      </Routes>
      </main>
    </div>
  )
}

export default App