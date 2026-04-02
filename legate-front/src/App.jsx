import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidemenu from './components/Sidemenu'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [conversations, setConversations] = useState([])
  const API = axios.create({ baseURL: 'http://localhost:3001' });

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await API.get('/conversation_list');
      setConversations(res.data)
    }
    fetchConversations()
  }, [])

  return (
    <>
    <div className="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>
    <div className="flex bg-white dark:bg-gray-900">
      <Sidemenu conversations={conversations} />
      <div className="flex-1 bg-white dark:bg-gray-900" />

    </div>
    </>
  )}

export default App
