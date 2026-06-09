import { useEffect, useState } from "react"
import React from 'react'
import { lazy, Suspense } from 'react'
const AddNote=lazy(()=>import('./components/AddNoteModel'))
const NotesCard =lazy(()=> import('./components/NotesCard'))
import Button from "./components/Button"
import Header from "./components/Header"
import EmptyNotes from "./components/EmptyNotesPage"
import { ThemeProvider } from "./ThemeContext"
import Toast from "./components/Toast"

function App() {
  const [toast, setToast] = useState(null)
  const [notes, setNotes] = useState(() => {

    try {
      const data = localStorage.getItem("notes");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  
  const [showModal, setShowModal] = useState(false);
  
  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const addNote = (title, description) => {
    setNotes((prevNote) =>
      [...prevNote,
      {
        title,
        description,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]
    )
    showToast("Note saved ✦", "success")
  }

  const updateNote = (indexToUpdate, newTitle, newDescription) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, index) =>
        index === indexToUpdate
          ? { ...note, title: newTitle, description: newDescription }
          : note
      )
    )
     showToast("Note updated", "update")
  }


  const deleteNote = (indexToDelete) => {
    setNotes((prevNote) =>
      prevNote.filter((note, index) => index !== indexToDelete)
    )
    showToast("Note deleted", "delete")
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);



  return (
    <ThemeProvider>
      <div className="min-h-screen w-full theme-body font-serif">
        <Header setShowModal={() => setShowModal(true)} />
        <div className="flex flex-col justify-center items-center ">
          {showModal && (
            <AddNote
              addNote={addNote}
              closeModal={() => setShowModal(false)}
            />
          )}
          <Suspense fallback={null}>
          {notes && notes.length > 0 ? (
   
            <NotesCard notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
          ) : (
            <EmptyNotes />
          )}
        </Suspense>
        </div>
      {toast && (
        <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
        />
      )}
      </div>
    </ThemeProvider>
  )
}

export default App

