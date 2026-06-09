import React from 'react'
import Button from './Button'
import { useTheme } from "../ThemeContext";

function Header({ setShowModal }) {
  const { randomize } = useTheme();
  return (
    <header className='pt-6 md:pt-12'>
      <div className="flex flex-col sm:flex-row sm:items-center
                  justify-between gap-4
                  px-4 sm:px-8 lg:px-20">

        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold scroll-m-20 border-b pb-2 tracking-tight first:mt-0">
          My Notes
        </h1>

        <div className="flex items-center gap-3">
          <Button
            onClick={randomize}
            className="border border-gray-300 p-2 theme-header text-xl sm:text-2xl"
            children="✨"
          />
          
          <Button
            onClick={() => setShowModal(true)}
            className="border border-gray-300 px-3 py-2 sm:px-4 sm:py-3
                   theme-header text-sm sm:text-xl"
            children="Create ➕"
          />
        </div>

      </div>
    </header>


  )
}

export default Header
