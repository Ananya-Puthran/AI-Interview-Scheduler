"use client"
import React from 'react';
import CreateOptions from './_components/CreateOptions';
import WelcomeContainer from './_components/WelcomeContainer';
import LatestInterviewsList from './_components/LastestInterviewList';
function Dashboard() {
  
  return (
    <div className="w-full">
      {/* <WelcomeContainer /> */}
      <h2 className="text-lg font-bold ">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;