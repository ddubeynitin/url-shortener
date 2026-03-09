import React from "react";

const AdvanceAnalytics = () => {
  return (
    <>
      <div className=" h-screen bg-white p-2">
        <div className="mb-2 text-center rounded-lg shadow-md shadow-black">
          <h1 className="text-3xl font-bold">Advance Analytics</h1>
          <p>
            This is the advance analytics page. Only authorized users can access
            this page.
          </p>
        </div>
        <div className="h-150 rounded-lg shadow-md shadow-black flex">
            <div className=" w-[15%] border p-2 flex flex-col justify-start items-center">
                <h2 className="w-full text-center mb-2 border-b border-b-gray-300">
                    Options
                </h2>
                <button className="w-25 h-8 flex justify-center items-center bg-black text-white rounded-md hover:bg-black/50">All List</button>
            </div>
            <div className="w-[85%] border">
            {/* show list of all url as list that conatains short url, original url, total , clicks, and action buttons */}
                <div className="border-b border-b-gray-300 grid grid-cols-5">
                    <h1>Short Url</h1>
                    <h1>Original Url</h1>
                    <h1>Total Clicks</h1>
                    <h1>Action</h1>
                </div>
                {/* list */}
                <div className="border border-gray-300 h-20">
                    <div>

                    </div>
                </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default AdvanceAnalytics;
