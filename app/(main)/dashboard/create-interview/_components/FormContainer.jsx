"use client";

import { Input } from "@base-ui/react";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const FormContainer = ({ onHandleInputChange }) => {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    onHandleInputChange("type", interviewType);
  }, [interviewType]);

  const items = [
    { label: "5 Min", value: "5 Min" },
    { label: "15 Min", value: "15 Min" },
    { label: "30 Min", value: "30 Min" },
    { label: "45 Min", value: "45 Min" },
    { label: "60 Min", value: "60 Min" },
  ];

  const handleInterviewType = (title) => {
    setInterviewType((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="p-5 mt-5 bg-white rounded-lg shadow-md">

      {/* Job Position */}
      <div>
        <h2 className="text-sm font-semibold">
          Job Position
        </h2>

        <Input
          placeholder="e.g., Full Stack Developer"
          className="mt-2 h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm placeholder:text-gray-400"
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
        />
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="text-sm font-semibold">
          Job Description
        </h2>

        <Textarea
          placeholder="e.g., We are looking for a skilled Full Stack Developer to join our team..."
          className="mt-2 h-[100px] w-full resize-none rounded-md border px-3 py-3 text-sm shadow-sm placeholder:text-gray-400"
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
        />
      </div>

      {/* Interview Duration */}
      <div className="mt-5">
        <h2 className="text-sm font-semibold">
          Interview Duration
        </h2>

        <Select
          onValueChange={(value) =>
            onHandleInputChange("duration", value)
          }
        >
          <SelectTrigger className="mt-2 h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm text-gray-700">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mt-5">
        <h2 className="text-sm font-semibold">
          Interview Type
        </h2>

        <div className="flex flex-wrap gap-2 mt-2">
          {InterviewType.map((type) => {
            const isSelected = interviewType.includes(type.title);

            return (
              <div
                key={type.title}
                onClick={() => handleInterviewType(type.title)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-blue-100 border-blue-500 text-blue-600"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
              >
                <type.icon className="h-3.5 w-3.5" />
                <span className="text-sm">{type.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generate Questions */}
      <div className="mt-7 flex justify-end">
        <Button className="mt-5 rounded-lg">
          Generate Question
          <ArrowRight />
        </Button>
      </div>

    </div>
  );
};

export default FormContainer;