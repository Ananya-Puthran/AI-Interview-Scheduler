"use client";

import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { vapi } from "@/services/vapiClient";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [activeUser, setActiveUser] = useState(false);

  useEffect(() => {
    if (interviewInfo) {
      startCall();
    }
  }, [interviewInfo]);

  useEffect(() => {
    vapi.on("call-start", () => {
      console.log("Call connected");
      toast("Call connected...");
    });

    vapi.on("speech-start", () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    });

    vapi.on("call-end", () => {
      console.log("Call has ended");
      toast("Interview Ended");
    });
  }, []);

  const startCall = () => {
    let questionList = "";

    interviewInfo?.interviewData?.questionList?.forEach((item) => {
      questionList = questionList + item?.question + ", ";
    });

    const assistantOptions = {
      name: "AI Recruiter",

      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition,

      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },

      voice: {
        provider: "openai",  //playht    //openai
        voiceId: "shimmer",  //jennifer    //alloy
      },

      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.

Your job is to ask candidates the provided interview questions and assess their responses.

Ask one question at a time and wait for the candidate's response.

Below are the interview questions:
${questionList}

Keep the conversation natural and engaging.

Be friendly, professional, and concise.
            `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi.stop();
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session

        <span className="flex gap-2 items-center">
          <Timer />
          00.00.00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* AI Recruiter */}
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}

            <Image
              src="/ai.png"
              alt="ai"
              width={100}
              height={100}
              className="mt-2 w-[60px] h-[70px] object-cover"
            />
          </div>

          <h2>AI Recruiter</h2>
        </div>

        {/* Candidate */}
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}

            <h2 className="w-16 h-16 flex items-center justify-center text-2xl bg-primary text-white rounded-full">
              {interviewInfo?.userName?.[0]}
            </h2>
          </div>

          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-5">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full" />

        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full" />
        </AlertConfirmation>
      </div>

      <h2 className="mt-2 text-sm text-gray-400 text-center">
        Interview in progress...
      </h2>
    </div>
  );
}

export default StartInterview;