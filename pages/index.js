import { useWallet } from '@solana/wallet-adapter-react';
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer';
import LoginBox from '../components/LoginBox';
import MainView from '../components/MainView';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css'

export default function Home() {
  const { connected } = useWallet()
  return (
    <div className='layout'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <div>
        <Navbar connected={connected} />
        <div className={styles.container}>
          {connected ? <MainView /> : <LoginBox />}
        </div>
      </div>
      <Footer />
    </div>
  )
}
