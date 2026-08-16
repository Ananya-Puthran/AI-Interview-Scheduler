import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@base-ui/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  List,
  Mail,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;

    const GetInterviewUrl = () => {
        return url;
    };

    const onCopyLink=async()=>{
        await navigator.clipboard.writeText(url);
        toast('Link Copied')
    }

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <Image
                src="/check_box.png"
                alt="check"
                width={200}
                height={200}
                className="w-[60px] h-[50px]"
            />

            <h2 className="font-bold text-lg mt-4">
                Your AI Interview is Ready!
            </h2>

            <p>
                Share this link with the candidate to start the interview process
            </p>

            <div className="w-full p-7 mt-6 rounded-xl bg-white">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold">Interview Link</h2>

                    <h2 className="p-0 px-2 text-primary bg-blue-50 rounded-2xl">
                        Valid for 30 Days
                    </h2>
                </div>

                <div className="mt-3 flex gap-3 items-center">
                    <Input
                        className="px-2 w-full border border-gray-300"
                        defaultValue={GetInterviewUrl()}
                        disabled={true}
                    />

                    <Button className="rounded-lg whitespace-nowrap" onClick={()=>onCopyLink()}>
                        <Copy />
                        Copy Link
                    </Button>
                </div>

                <hr className="my-4" />

                <div className="flex gap-5">
                    <h2 className="text-sm text-gray-500 flex items-center gap-2"><Clock className="h-4 w-4" /> {formData?.duration} </h2>
                    <h2 className="text-sm text-gray-500 flex items-center gap-2"><List className="h-4 w-4" />  10 questions</h2>
                    {/* <h2 className="text-sm text-gray-500 flex items-center gap-2"><Calendar className="h-4 w-4" />  {formData?.duration} </h2> */}
                </div>
            </div>

            <div className="mt-7 bg-white p-5 rounded-lg w-full">
                <h2 className="font-bold">Share via</h2>
                <div className='flex gap-5 mt-2'>
                    <Button variant={"outline"}className="flex-1"><Mail /> Email</Button>
                    <Button variant={"outline"}className="flex-1"><Mail /> Whatsapp</Button>
                </div>
            </div>

            <div className="flex w-full gap-5 justify-between mt-6">
                <Link href={'/dashboard'}>
                <Button className="rounded-lg" variant={"outline"}> <ArrowLeft/> Back to Dashboard</Button>
                </Link>
                <Link href={"/dashboard/create-interview"}>
                <Button className="rounded-lg"> <Plus/> Create New Interview</Button>
                </Link>

            </div>
        </div>
    );
}

export default InterviewLink;