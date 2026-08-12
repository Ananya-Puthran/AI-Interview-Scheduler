"use client"
import Image from "next/image";
import react from 'react';
import { useUserDetail } from '@/app/provider';

function WelcomeContainer(){
    const {user}=useUserDetail();
    return(
        <div className="bg-white p-3 rounded-lg shadow-md w-full flex items-center justify-between">
            <div >
                <h2 className="text-lg font-bold">Welcome Back, {user?.name || 'User'}!</h2>
                <h2 className="text-md">AI-Driven Interview, Hassle-Free Hiring</h2>
            </div>
            {user && (
                <Image src={user?.picture} alt="userAvatar" width={50} height={50} className="w-10 h-10 rounded-full" />
            )}
        </div>
    )
}

export default WelcomeContainer;