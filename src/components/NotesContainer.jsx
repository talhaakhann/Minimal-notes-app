import React from 'react'

function NotesContainer({children,className}) {
  return (
    <div className={` p-3 min-h-min items-center mt-10 rounded-2xl  shadow ${className}`}>
        {children}
    </div>
  )
}

export default NotesContainer
