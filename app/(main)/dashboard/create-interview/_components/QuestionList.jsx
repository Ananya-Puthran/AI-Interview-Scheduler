"use client";

import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const QuestionList = ({ formData }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData]);

    const GenerateQuestionList = async () => {
        setLoading(true);

        try {
            const result = await axios.post("/api/ai-model", {
                ...formData,
            });

            console.log("AI Response:", result.data);

            setLoading(false);
        } catch (e) {
            console.error("AI API Error:", e);
            toast("Server Error, Try Again!");
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && (
                <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center">
                    <Loader2Icon className="animate-spin" />

                    <div>
                        <h2>Generating interview questions</h2>
                        <p>
                            Our AI is crafting personalized questions based on your job position.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionList;