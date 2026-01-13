import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    
      <div className=" text-white font-bold bg-black p-4 absolute bottom-0 w-full flex justify-around gap-2">
        <p>
          Developed by{" "}
          <a
            href="https://Nitin-Dubey-dev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-500 hover:bg-white "
          >
            {" "}
            Nitin Dubey
          </a>
        </p>
        <div className="flex gap-2 w-50 justify-center items-center text-2xl">
          <a
            href="https://github.com/ddubeynitin"
            className="text-white hover:text-blue-300"
            target="_blank"
          >
            {" "}
            <FaGithub />{" "}
          </a>
          <a
            href="https://www.linkedin.com/in/nitin-dubey-1a862a282"
            className="text-white hover:text-blue-300"
            target="_blank"
          >
            {" "}
            <FaLinkedin />{" "}
          </a>
          <a
            href="https://www.instagram.com/ddubeynitin?igsh=MW42YjZva3R5NGdwag=="
            className="text-white hover:text-blue-300"
            target="_blank"
          >
            {" "}
            <FaInstagram />{" "}
          </a>
        </div>
      </div>
  )
}

export default Footer