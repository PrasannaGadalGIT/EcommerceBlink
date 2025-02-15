"use client"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

import LoginComp from "../../components/LoginComp"
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Login = () => {
  const {data : session} = useSession();



  return (

  <>
 
  <div className=' bg-black l-6'>
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <LoginComp/>
              </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
   
  </>
    
  )
}

export default Login
