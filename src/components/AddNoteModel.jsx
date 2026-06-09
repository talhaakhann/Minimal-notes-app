import React, { useState } from 'react'
import Button from './Button'
import NotesContainer from './NotesContainer'


function AddNote({ addNote,closeModal  }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    function Submit(e) {
        e.preventDefault();
        
        if (title.length < 1 || title.length > 20) {
            console.error("Please Enter Valid Title !");
            return;
        }

       if (description.length < 1 || description.length >= 40){
            console.error("Please Enter Valid Description !");
            return;
        }

        addNote(title, description);


        setTitle("");
        setDescription("");
        closeModal(); 
    }
    return (
              <>
            {/* BACKDROP */}
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={closeModal}
            />

            {/* MODAL */}
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
                <NotesContainer onClick={(e) => e.stopPropagation()}  className={"py-6 px-8 theme-body rounded-2xl shadow-xl w-[400px]"}>
                    
                    <h2 className='text-3xl font-bold text-center mb-4'>
                        Create New Note
                    </h2>

                    <form className='flex flex-col gap-4 ' onSubmit={Submit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='py-3 px-3 theme-header border-1 border-gray-100  rounded-2xl text-medium outline-none'
                            placeholder='Enter Title'
                        />

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='rounded-2xl py-3 px-3 border-1 border-gray-100 h-[200px] theme-header  text-medium outline-none'
                            placeholder='Enter Description...'
                        />

                        <div className='flex justify-center gap-10 mt-2'>
                            <Button type={"submit"} children={"Save"} className={"theme-card theme-btn2  "} />
                            <Button onClick={closeModal} children={"Cancel"} className={"theme-header  border-1 border-gray-100"}/>
                        </div>
                    </form>
                </NotesContainer>
            </div>
        </>

    )
}

export default AddNote
