import React from 'react'

const Error = ({mensaje}) => {
    return(
    <div className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md'>
        <p>{mensaje}</p>
    </div>
    )
}

// Otra forma de pasar prop :children

// const Error = ({children}) => {
//     return(
//     <div className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md'>
//         {children}
//     </div>
//     )
// }

export default Error