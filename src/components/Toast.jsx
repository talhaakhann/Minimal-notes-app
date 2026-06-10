import React, { useEffect } from 'react'

function Toast({ message, type = "success", onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [])

    const icons = {
        success: "✓",
        delete: "🗑️",
        update: "✏️",
        error:"🚫"
    }

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl  border-gray-300 theme-header transition-all duration-500 ease-in-out animate-slide-up`}>
            <span className="text-lg">{icons[type]}</span>
            <p className="font-semibold theme-text text-sm">{message}</p>
            <button onClick={onClose} className="ml-2 theme-subtext text-xs opacity-50 hover:opacity-100 cursor-pointer">✕</button>
        </div>
    )
}

export default Toast