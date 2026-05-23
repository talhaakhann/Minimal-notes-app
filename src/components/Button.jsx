import React, { Children } from 'react'

function Button({ className, children, type = 'button', onClick }) {
    return (
        <div className='theme-text'>
            <button type={type}
                onClick={onClick} className={`${className} px-3 py-2 rounded-2xl text-center font-semibold
                 shadow`}>{children}</button>
        </div>
    )
}

export default Button
