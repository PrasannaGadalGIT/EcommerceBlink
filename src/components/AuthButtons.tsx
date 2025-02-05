"use client"
import React from 'react';
import { Button } from './ui/button';
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { signIn, useSession } from 'next-auth/react';
const AuthButtons: React.FC = () => {

    const { data: session } = useSession()
    console.log(session)
  
  return (
    
    <div className="flex flex-col sm:flex-row gap-4 my-4 bg-black">
      <Button className="flex-1 border border-zinc-800 p-y text-white w-[18rem] py-6 rounded-lg font-medium " onClick={() => signIn("")}>
      <FaGoogle /> Google
      </Button>
      <Button className="flex-1 border border-zinc-800 text-white w-[9rem] py-6 rounded-lg font-medium" onClick={() => signIn("github")}>
       <FaGithub/> GitHub
      </Button>

      

   
    </div>
  );
};

export default AuthButtons;
