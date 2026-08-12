"use client";

import React, { useState } from "react";
import { Camera, Video } from "lucide-react";

function LatestInterviewsList() {
  const [interviewList, setInterviewList] = useState([]);

  return (
    <div className="bg-white p-3 rounded-lg shadow-md w-full mt-4">
      <h2 className="text-xl font-bold">Previously Created Interviews</h2>

      {interviewList?.length === 0 && (
        <div className="p-5 flex flex-col items-center justify-center">
          <Video className="h-10 w-10 text-primary" />

          <h2 className="mt-2">
            You don't have any interviews created!
          </h2>

          <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg">
            Create New Interview
          </button>
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;