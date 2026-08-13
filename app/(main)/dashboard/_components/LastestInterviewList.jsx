"use client";

import React, { useState } from "react";
import { Camera, Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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

          <Button className="mt-5 rounded-lg">
            <Plus />
             Create New Interview
          </Button>
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;