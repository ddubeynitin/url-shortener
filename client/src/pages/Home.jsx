import React , { useState } from 'react'
import axios from 'axios';
import { FaCopy } from "react-icons/fa";
import { PiCheckFatDuotone } from "react-icons/pi";
import Footer from ".././components/Footer";
import Header from '../components/Header';

const Home = () => {

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
      .post("http://localhost:5000/", {
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
      <div className="bg-black w-full lg:h-150 flex justify-center items-center flex-col gap-4 text-white text-center p-8">
        <h1 className="text-5xl text-red-500 font-bold ">
          Create links that perform with our powerful{" "}
          <span className="text-blue-500 animate-pulse">URL Shortener</span>
        </h1>
        <p className="">
          Welcome to our URL shortening service! Easily create and track your
          links with just a few clicks.
        </p>

        <div className="flex gap-2 w-full max-w-3xl">
          <input
            type="text"
            placeholder="Enter a long URL to shorten or Paste it here"
            className="w-full h-20 bg-white p-4 rounded-lg text-gray-800 mb-4 border border-gray-300 shadow-2xl shadow-gray-300"
            value={longUrl}
            onChange={(e) => {
              setLongUrl(e.target.value);
              console.log(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 w-50 h-20 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-300 hover:text-black shadow-2xl shadow-gray-300"
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