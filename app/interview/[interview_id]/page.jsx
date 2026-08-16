"use client"
import React, { useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Video } from 'lucide-react';
import { Input } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';

function Interview() {
  const { interview_id } = useParams();
  console.log(interview_id)
  const [interviewData, setInterviewData]=useState();
  const [userName, setUserName]=useState();
  const [loading, setLoading]=useState(false);

  useEffect(()=>{
    interview_id&&GetInterviewDetails();
  },[interview_id])
  

  const GetInterviewDetails=async()=>{
    setLoading(true);
    try{
    let{data:Interviews, error}=await supabase
      .from('Interviews')
      .select("jobPosition, jobDescription ,duration, type")
      .eq('interview_id', interview_id)
      
      setInterviewData(Interviews[0]);
      setLoading(false);
      if(Interviews?.length==0){
        toast('Incorrect Interview Link')
        return ;
      }
    }catch(e){
        setLoading(false);
    }
  }

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-10">
      <div className="flex flex-col items-center justify-center border 
      rounded-lg bg-white p-7 lg:px-33 xl:px-52 ">
        <Image
          src="/logo2.png"
          alt="logo"
          width={200}
          height={100}
          className="w-[140px] h-auto"
        />
        <h2 className="mt-1">AI-Powered Interview Platform</h2>
        <Image
          src="/interview.png"
          alt="interview"
          width={400}
          height={400}
          className="w-[180px] h-auto"
          priority
        />

        <h2 className="font-bold text-xl">{interviewData?.jobPosition}</h2>
        <h2 className='flex gap-2 items-center text-grey-500'><Clock className='h-4 w-4' />{interviewData?.duration}</h2>

        <div className="mt-3 w-full shadow-mid">
          <h2> Enter your full name</h2>
          <Input className="w-full border border-gray-250 mt-3 p-2" 
          placeholder='e.g., Ananya Puthran' onChange={(event)=>setUserName(event.target.value)}/>
        </div>


        <div className="p-3 bg-blue-100 flex gap-4 rounded-lg mt-5">
          <Info className="text-primary" />

          <div>
            <h2 className="font-bold">Before you begin</h2>

            <ul>
              <li className="text-sm text-primary">
                Test your microphone and camera before starting the interview.
              </li>
              <li className="text-sm text-primary">
                Ensure you have a stable internet connection.
              </li>
              <li className="text-sm text-primary">
                Find a quiet place and make sure you are ready.
              </li>
            </ul>
          </div>
        </div>
        <Button className="h-10 rounded-lg mt-5 mb-15 w-full font-bold text-lg "
        disabled={loading||!userName}> 
          <Video /> Join Interview
        </Button>

      </div>
    </div>
  );
}
export default Interview
