import React, { useState } from "react";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [totalClicks, setTotalClicks] = useState(null);
  const [redirectURL, setRedirectURL] = useState(null);
  const [clickTimes, setClickTimes] = useState([]);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  function analyzeUrl() {
    // setIsCopied(false );

    if (!shortUrl) {
      alert("Please enter a valid URL");
      return;
    }


    const shortId = shortUrl.split('/').pop();

    axios
      .get("http://localhost:5000/analytics/" + shortId, {
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
      });
  }

  return (
    <>
      <div className=" w-full h-170 gap-4 p-8  flex flex-col  bg-black">

        <div className="flex gap-5 w-full justify-start items-center border-b-2 border-white pb-4">
            <button onClick={ () => { navigate(-1)} }  className="text-sm lg:text-4xl text-blue-500 hover:text-white" > <IoArrowBackCircleOutline />
  </button>
            <h1 className="lg:text-5xl text-center text-2xl font-bold flex text-white gap-3"> <MdOutlineAnalytics  /> URL Analytics</h1>

        </div>
        <div className=" w-full mt-10 flex justify-center gap-5">
          <input
            type="text"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            className=" w-full border border-gray-300 bg-white rounded-md p-2 lg:w-150 lg:h-20 h-10"
            placeholder="Enter the short-Url to analysis"
          />

          <button
            className="bg-blue-500 w-50 h-20 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-200 hover:text-black shadow-2xl shadow-gray-300"
            onClick={analyzeUrl}
          >
            Analyze URL
          </button>
        </div>

        <div className="grid gap-5 mt-10 grid-cols-1 lg:grid-cols-3">

       
            { visible && (
              <div className="flex flex-col w-full h-50 border border-gray-300 rounded-2xl shadow-lg shadow-gray-300 overflow-hidden">
                <h3 className=" text-center text-lg text-white font-bold border-b border-gray-300">  Total Clicks</h3> 
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-4xl font-bold text-white ">{totalClicks}</span>

                </div>
            </div>
            )}

            { visible && (
              <div className="flex flex-col w-full h-50 border border-gray-300 rounded-2xl shadow-lg shadow-gray-300 overflow-hidden">
                <h3 className="text-lg text-white font-bold border-b border-gray-300  text-center">Redirect URL</h3> 
                <div className="w-full h-full flex justify-center items-center">
                    <span className="text-2xl font-bold p-5 text-white">{redirectURL}</span>

                </div>
              </div>)}
             { visible && (
            <div className="flex flex-col w-full h-50 border border-gray-300 rounded-2xl shadow-lg shadow-gray-300 overflow-hidden">
                <h3 className="text-lg text-white font-bold border-b border-gray-300 text-center ">Click Time</h3> 
                <div className="w-full h-full flex justify-center items-center">
                    <div className="p-5 overflow-y-auto h-60">
                    { clickTimes.length === 0 ? (
                      <p className="text-white mt-15">No clicks recorded yet.</p>
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
