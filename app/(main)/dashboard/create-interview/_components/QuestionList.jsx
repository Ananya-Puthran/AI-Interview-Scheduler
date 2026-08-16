"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { v4 as uuid } from 'uuid';
import { useUserDetail } from "@/app/provider";

const QuestionList = ({ formData }) => {
    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState();
    const { user } = useUserDetail();
    const [saveLoading, setSaveLoading] = useState(false);

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

            console.log(result.data.content);

            const Content = result.data.content;

            const FINAL_CONTENT = Content.replace("```json", "")
                .replace("```", "")
                .trim();

            setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);

            setLoading(false);
        } catch (e) {
            console.error("AI API Error:", e);
            toast("Server Error, Try Again!");
            setLoading(false);
        }
    };
    const onFinish = async () => {
        setSaveLoading(true);
        const interview_id = uuid();
        const { data, error } = await supabase
            .from('Interviews')
            .insert([
                {
                    ...formData,
                    questionList: questionList,
                    userEmail: user?.email,
                    interview_id: interview_id
                }
            ])
            .select()
        setSaveLoading(false);
        console.log(data);

    }
    return (
        <div>
            {loading && (
                <div className="mt-5 p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center">
                    <Loader2Icon className="animate-spin" />

                    <div>
                        <h2 className="font-medium">Generating interview questions</h2>
                        <p className="text-primary">
                            Our AI is crafting personalized questions based on your job
                            position.
                        </p>
                    </div>
                </div>
            )}

            {questionList?.length > 0 && (
                <div>
                    <QuestionListContainer questionList={questionList} />
                </div>
            )}

            <div className="flex justify-end mt-5">
                <Button
                    onClick={() => onFinish()}
                    disabled={saveLoading}
                    className="mt-5 p-5 rounded-lg text-lg"
                >
                    {saveLoading && <Loader2 className="animate-spin" />}
                    {saveLoading ? "Saving..." : "Finish"}
                </Button>
            </div>
        </div>
    );
};

export default QuestionList;