import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosCut } from "react-icons/io";

const Header = () => {
  return (
   
        <header className="bg-black text-white p-4 mt-5 shadow-md flex justify-between items-center border-b border-blue-500 mx-5">
          <div className="container mx-auto flex justify-start items-center gap-2">
          <h1 className="text-xl font-bold">URL Shortener</h1>
          <IoIosCut className='text-2xl'/>
          </div>
          <div>
            <Link to="/analytics" className="text-blue-500 hover:text-gray-200 border rounded-lg p-2"> Analytics</Link>
          </div>
        </header>
    
  )
}

export default Header