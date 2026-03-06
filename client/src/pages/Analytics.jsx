import React, { useState } from "react";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { getApiBaseUrl } from "../utils/apiBaseUrl";

const Analytics = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [totalClicks, setTotalClicks] = useState(null);
  const [redirectURL, setRedirectURL] = useState(null);
  const [clickTimes, setClickTimes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = getApiBaseUrl();

  function analyzeUrl() {
    // setIsCopied(false );

    if (!shortUrl) {
      alert("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    const shortId = shortUrl.split('/').pop();

    axios
      .get(`${API_URL}/analytics/${shortId}`, {
        url: shortId,
      })
      .then((res) => {
        console.log(res.data);
        setTotalClicks(res.data.totalClicks);
        setRedirectURL(res.data.redirectURL);
        const times = res.data.analytics.map((entry) => {
          const date = new Date(entry.timestamp);
          return date.toLocaleString();
        });
        setClickTimes(times);
        setVisible(true);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="w-full min-h-screen gap-4 px-4 sm:px-6 lg:px-8 py-8 flex flex-col bg-black">

        <div className="flex gap-3 sm:gap-5 w-full justify-start items-center border-b-2 border-white pb-4">
            <button onClick={ () => { navigate(-1)} }  className="text-2xl lg:text-4xl text-blue-500 hover:text-white" > <IoArrowBackCircleOutline />
  </button>
            <h1 className="lg:text-5xl text-center text-2xl font-bold flex text-white gap-3 items-center"> <MdOutlineAnalytics  /> URL Analytics</h1>

        </div>
        <div className="w-full mt-8 flex flex-col lg:flex-row justify-center gap-3 lg:gap-5 max-w-5xl self-center">
          <input
            type="text"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            className="w-full border border-gray-300 bg-white rounded-md px-3 py-2 h-12 lg:h-14"
            placeholder="Enter the short-Url to analysis"
          />

          <button
            className="bg-blue-500 w-full lg:w-48 h-12 lg:h-14 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-200 hover:text-black shadow-xl shadow-gray-800/40 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={analyzeUrl}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze URL"}
          </button>
        </div>
        {isLoading && (
          <div className="w-full max-w-5xl self-center h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="loading-bar h-full bg-blue-500 rounded-full" />
          </div>
        )}

        <div className="grid gap-5 mt-8 grid-cols-1 lg:grid-cols-3">

       
            { visible && (
              <div className="flex flex-col w-full min-h-56 border border-gray-300 rounded-2xl shadow-lg shadow-gray-300/30 overflow-hidden">
                <h3 className=" text-center text-lg text-white font-bold border-b border-gray-300">  Total Clicks</h3> 
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-4xl font-bold text-white ">{totalClicks}</span>

                </div>
            </div>
            )}

            { visible && (
              <div className="flex flex-col w-full min-h-56 border border-gray-300 rounded-2xl shadow-lg shadow-gray-300/30 overflow-hidden">
                <h3 className="text-lg text-white font-bold border-b border-gray-300  text-center">Redirect URL</h3> 
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-lg sm:text-xl font-bold p-5 text-white break-all">{redirectURL}</span>

                </div>
              </div>)}
             { visible && (
            <div className="flex flex-col w-full min-h-56 border border-gray-300 rounded-2xl shadow-lg shadow-gray-300/30 overflow-hidden">
                <h3 className="text-lg text-white font-bold border-b border-gray-300 text-center ">Click Time</h3> 
                <div className="w-full h-full flex justify-center items-center">
                    <div className="p-5 overflow-y-auto max-h-64 w-full">
                    { clickTimes.length === 0 ? (
                      <p className="text-white mt-8 text-center">No clicks recorded yet.</p>
                    ) : (
                      clickTimes.map((time, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <FaClock className="text-white" />
                          <span className="text-white">{time}</span>
                        </div>
                      ))
                    )}
                    </div>

                </div>
            </div>)}

        </div>
       

      </div>
    </>
  );
};

export default Analytics;
