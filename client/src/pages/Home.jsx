import React , { useState } from 'react'
import axios from 'axios';
import { FaCopy } from "react-icons/fa";
import { PiCheckFatDuotone } from "react-icons/pi";
import Footer from ".././components/Footer";
import Header from '../components/Header';

const Home = () => {

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const [visible, setVisible] = useState(false);

  function shortenUrl() {
    setIsCopied(false);
    
    if (!longUrl) {
      alert("Please enter a valid URL");
      return;
    }
    
    axios
      .post(`${API_URL}/`, {
        url: longUrl
      })
      .then((res) => {
        console.log(res.data);
        setShortUrl(res.data.shortURL);
        setVisible(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function copyURL(){
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
  }

 

  return (
    <>
        <Header/>
      <div className="bg-black w-full h-160 lg:h-130 flex lg:justify-center items-center flex-col gap-4 text-white text-center p-8">
        <div className='m-5'>
            <h1 className="text-4xl lg:text-5xl text-red-500 font-bold flex flex-col">
          Create links that perform with our powerful{" "}
          <span className="text-blue-500 animate-pulse">URL Shortener</span>
        </h1>
        <p className="m-5 text-lg lg:text-2xl">
          Welcome to our URL shortening service! Easily create and track your
          links with just a few clicks.
        </p>
        </div>
        <div className="lg:flex gap-2 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Enter a long URL to shorten or Paste it here"
            className="w-full h-15 lg:h-20 placeholder:text-sm bg-white p-4 rounded-lg text-gray-800 mb-4 border border-gray-300 shadow-2xl shadow-gray-300"
            value={longUrl}
            onChange={(e) => {
              setLongUrl(e.target.value);
              console.log(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 w-30 lg:w-50 h-10 lg:h-20 text-sm  text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-300 hover:text-black shadow-2xl shadow-gray-300"
            onClick={shortenUrl}
          >
            Shorten URL
          </button>
          
        </div>
        { visible && (
          <div className=" border p-5 w-150 flex justify-between items-center gap-2 rounded-2xl">
          <p>{shortUrl}</p>
          <div className="border h-full p-2 rounded-lg hover:cursor-pointer hover:bg-blue-200 hover:text-black" onClick={copyURL}>
            {isCopied ? <PiCheckFatDuotone /> : <FaCopy />}
          </div>
        </div>
        )}
      </div>
        <Footer />
    </>
  );
}

export default Home