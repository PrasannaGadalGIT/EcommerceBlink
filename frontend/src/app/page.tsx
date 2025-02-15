"use client"
import React, {useEffect} from 'react';
import ChatBot from '../components/ChatBot';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
function App() {
  
   const router = useRouter()
   
      const { data: session } = useSession()
        
      useEffect(() => {
        console.log("Session : ", session)
        if(session){
          router.push('/')
        }
  
  if(!session){
    router.push('/login')
  }
}, [session])
return (
    
  <ChatBot/>
) 
 
}

export default App;