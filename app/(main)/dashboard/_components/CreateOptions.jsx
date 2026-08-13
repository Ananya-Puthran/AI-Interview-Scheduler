import React from "react";
import { Phone, Video } from "lucide-react";
import Link from "next/link";

function CreateOptions() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">

      {/* Create New Interview */}
      <Link href="/dashboard/create-interview" className="bg-white p-3 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-100 
      transition duration-300 cursor-pointer">
        <Video className="p-2 text-primary bg-blue-100 rounded-full h-12 w-12" />

        <div className="ml-4">
          <h2 className="text-lg font-bold">Create New Interview</h2>
          <p className="text-gray-600">
            Start a new video interview session
          </p>
        </div>
      </Link>

      {/* Phone Screening */}
      <div className="bg-white p-3 rounded-lg shadow-md flex items-center cursor-pointer hover:bg-gray-100 transition duration-300">
  
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <Phone className="h-6 w-6 text-primary" />
        </div>

      <div className="ml-4">
          <h2 className="text-lg font-bold">Phone Screening</h2>
             <p className="text-gray-600">
                Conduct a phone-based screening
            </p>
      </div>

      </div>

    </div>
  );
}

export default CreateOptions;