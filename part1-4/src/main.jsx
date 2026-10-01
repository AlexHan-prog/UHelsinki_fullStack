import { createRoot } from 'react-dom/client'
import NotesApp from './NotesApp.jsx'
import AppPhoneBook from './part2/phoneBook.jsx'
import './index.css'



createRoot(document.getElementById('root')).render(
    <>
        <NotesApp />
    </>
)
