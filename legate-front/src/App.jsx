import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidemenu from './components/Sidemenu'
import ThemeToggle from './components/ThemeToggle'
import './App.css'
let DEBUG = false

function App() {
  const [conversations, setConversations] = useState([])
  const [groups, setGroups] = useState([])

  const API = axios.create({ baseURL: 'http://localhost:3001' });

  useEffect(() => {
    const fetchSidebar = async () => {
      const groups = await API.get('/groups');
      const convs = await API.get('/conversations');
      setConversations(convs.data)
      setGroups(groups.data)
      if (DEBUG) {
        console.log("convs:", convs.data)
        console.log("groups:", groups.data)
      }

    }
    fetchSidebar()
  }, [])

  return (
    <>
    <div className="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>
    <div className="flex bg-white dark:bg-gray-900">
      <Sidemenu conversations={conversations} groups={groups} />
      <div className="flex-1 bg-white dark:bg-gray-900" />

    </div>
    </>
  )}

export default App
