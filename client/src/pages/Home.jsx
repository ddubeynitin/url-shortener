import React , { useState } from 'react'
import axios from 'axios';
import { FaCopy } from "react-icons/fa";
import { PiCheckFatDuotone } from "react-icons/pi";
import Footer from ".././components/Footer";
import Header from '../components/Header';
import { getApiBaseUrl } from "../utils/apiBaseUrl";

const API_URL = getApiBaseUrl();

const Home = () => {

  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = useState(false);

  function shortenUrl() {
    setIsCopied(false);
    
    if (!longUrl) {
      alert("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function copyURL(){
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
  }

 

  return (
    <>
        <Header/>
      <div className="bg-black w-full min-h-[75vh] flex justify-center items-center flex-col gap-5 text-white text-center px-4 sm:px-6 lg:px-8 py-8">
        <div className='max-w-4xl'>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-red-500 font-bold flex flex-col leading-tight">
          Create links that perform with our powerful{" "}
          <span className="text-blue-500 animate-pulse">URL Shortener</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg lg:text-2xl">
          Welcome to our URL shortening service! Easily create and track your
          links with just a few clicks.
        </p>
        </div>
        <div className="w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <input
            type="text"
            placeholder="Enter a long URL to shorten or Paste it here"
            className="w-full h-12 sm:h-14 lg:h-16 placeholder:text-sm bg-white px-4 rounded-lg text-gray-800 border border-gray-300 shadow-xl shadow-gray-800/40"
            value={longUrl}
            onChange={(e) => {
              setLongUrl(e.target.value);
              console.log(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 w-full lg:w-48 h-12 sm:h-14 lg:h-16 text-sm text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-300 hover:text-black shadow-xl shadow-gray-800/40 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={shortenUrl}
            disabled={isLoading}
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </button>
          
        </div>
        {isLoading && (
          <div className="w-full h-1 bg-gray-700 rounded-full mt-3 overflow-hidden">
            <div className="loading-bar h-full bg-blue-500 rounded-full" />
          </div>
        )}
        </div>
        { visible && (
          <div className="border border-gray-600 p-3 sm:p-4 w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-3 rounded-2xl bg-gray-900/60">
          <p className="break-all text-sm sm:text-base">{shortUrl}</p>
          <div className="border border-gray-500 p-2 rounded-lg hover:cursor-pointer hover:bg-blue-200 hover:text-black" onClick={copyURL}>
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
