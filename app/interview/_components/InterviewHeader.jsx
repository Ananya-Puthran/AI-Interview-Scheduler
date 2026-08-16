import React from 'react'
import Image from 'next/image'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
        <Image src={'/logo2.png'} alt='logo' width={200} height={80}
        className='w-[200px] h-[60px] rounded'
        />
    </div>
  )
}

export default InterviewHeader
