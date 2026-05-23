import { useEffect, useState } from "react"
import React from 'react'
import AddNote from "./components/AddNoteModel"
import NotesCard from "./components/NotesCard"
import Button from "./components/Button"
import Header from "./components/Header"
import EmptyNotes from "./components/EmptyNotesPage"
import { ThemeProvider } from "./ThemeContext"

function App() {
  const [notes, setNotes] = useState(() => {
  try {
    const data = localStorage.getItem("notes");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
});


  const [showModal, setShowModal] = useState(false);


  const addNote = (title, description) => {
    setNotes((prevNote) =>
      [...prevNote,
      { title, description, date: new Date().toLocaleTimeString() }]
    )
  }

  const updateNote = (indexToUpdate, newTitle, newDescription) => {
    setNotes((prevNotes) =>
        prevNotes.map((note, index) =>
            index === indexToUpdate
                ? { ...note, title: newTitle, description: newDescription }
                : note
        )
    )
}


  const deleteNote = (indexToDelete) => {
    setNotes((prevNote) =>
      prevNote.filter((note, index) => index !== indexToDelete)
    )
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
          {notes && notes.length > 0 ? (
            <NotesCard notes={notes}  updateNote={updateNote} deleteNote={deleteNote} />
          ) : (
            <EmptyNotes />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

