import React, { useState } from 'react'
import NotesContainer from './NotesContainer'

function NotesCard({ notes, deleteNote, updateNote }) {
    const [editingIndex, setEditingIndex] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editDesc, setEditDesc] = useState('')

    const startEdit = (index, note) => {
        setEditingIndex(index)
        setEditTitle(note.title)
        setEditDesc(note.description)
    }

    const saveEdit = (index) => {
        updateNote(index, editTitle, editDesc)
        setEditingIndex(null)
    }

    const cancelEdit = () => setEditingIndex(null)

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 mx-auto items-center'>
            {notes.map((note, index) => (
                <NotesContainer key={index} className={"border-1 border-gray-300 rounded-2xl p-6   theme-header w-[360px]  transition-all duration-400 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02] cursor-pointer"}>
                    {editingIndex === index ? (
                        <>
                            <input
                                className='w-full text-2xl font-bold mb-3 theme-text bg-transparent border-b-2 theme-header outline-none pb-1'
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Title"
                            />
                            <textarea
                                className='w-full mb-4 font-bold theme-subtext bg-transparent border theme-header rounded-lg outline-none p-2 '
                                rows={3}
                                value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}
                                placeholder="Description"
                            />
                            <div className='flex gap-2 justify-end'>
                                <button
                                    className="theme-header p-2 px-3 cursor-pointer rounded-full font-semibold shadow-md text-sm"
                                    onClick={cancelEdit}
                                >✕ Cancel</button>
                                <button
                                    className="theme-btn p-2 px-3 cursor-pointer rounded-full font-semibold shadow-md text-sm"
                                    onClick={() => saveEdit(index)}
                                >✓ Save</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className='text-2xl font-bold mb-4 theme-text'>{note.title}</h1>
                            <p className='mb-4 font-bold theme-subtext'>{note.description}</p>
                            <div className='flex'>
                                <span className='flex-1 font-semibold mt-2 theme-text'>📅 {note.date} &nbsp; </span>
                                <button
                                    className="theme-btn p-2 cursor-pointer rounded-full font-semibold shadow-2xl mr-2"
                                    onClick={() => startEdit(index, note)}
                                >✏️</button>
                                <button
                                    className="theme-btn p-2 cursor-pointer rounded-full font-semibold shadow-2xl"
                                    onClick={() => deleteNote(index)}
                                >🗑️</button>
                            </div>
                        </>
                    )}
                </NotesContainer>
            ))}
        </div>
    )
}

export default NotesCard