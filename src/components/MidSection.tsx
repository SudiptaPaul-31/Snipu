import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const MidSection = () => {
  return (
    <div className="w-full h-[83%] flex flex-col items-center p-10 lg:p-16 space-y-10">
      <div className="text-4xl w-full lg:text-6xl text-center flex flex-col font-bold space-y-3">
        <h1 className="bg-gradient-to-r from-gray-900 via-gray-50 to-white inline-block text-transparent bg-clip-text">
          Quickly save, share, manage{" "}
        </h1>
        <h1 className="bg-gradient-to-r from-gray-900 via-gray-50 to-white inline-block text-transparent bg-clip-text">
          your code snippets.
        </h1>
      </div>
      <Link
        href={"/snippet"}
        className="flex text-white px-4 py-2  lg:px-6 lg:py-3 rounded-md bg-gradient-to-r from-[#6C45E4] to-[#FF2BB1] cursor-pointer"
      >
        <Plus className="mr-2" />
        <h1>New Snippet</h1>
      </Link>
    </div>
  );
}

export default MidSection
