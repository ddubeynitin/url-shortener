import { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaCopy, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
const App = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  function shortenUrl() {
    axios
      .post("http://localhost:5000/", { longUrl })
      .then((res) => {
        console.log(res.data);
        setShortUrl(res.data.shortUrl);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <div className="bg-white w-full h-182 flex justify-center items-center flex-col gap-4 text-white text-center p-8">
        <h1 className="text-5xl text-blue-600 font-bold">
          Create links that perform with our powerful{" "}
          <span className="text-emerald-500">URL Shortener</span>
        </h1>
        <p className="text-black">
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
            className="bg-emerald-500 w-50 h-20 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-200 hover:text-black shadow-2xl shadow-gray-300"
            onClick={shortenUrl}
          >
            Shorten URL
          </button>
        </div>
        <div className="text-black border p-5 w-150 flex justify-between items-center gap-2 rounded-2xl">
          <p>{"http://localhost:5000/" + shortUrl}</p>
          <div className="border h-full p-2 rounded-lg hover:cursor-pointer hover:bg-gray-200">
            <FaCopy className="text-2xl" />
          </div>
        </div>
      </div>

      <div className=" text-white font-bold bg-blue-500 p-4 absolute bottom-0 w-full flex justify-around gap-2">
        <p>
          Developed by{" "}
          <a
            href="http://Nitin-Dubey-dev.vercel.app"
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
    </>
  );
};

export default App;
