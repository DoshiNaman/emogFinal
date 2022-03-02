import Head from 'next/head'
import { useContext, useEffect } from 'react'
//import { SocketContext } from '../context/socket/SocketContext'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

export default function Home() {
  useAuth();
  //const socket = useContext(SocketContext)

  useEffect(() => {
    sessionStorage.clear()
  }, [])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Emo-G</title>
        <meta name="description" content="Emo-G" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href= '/play'>
        <div className='flex justify-center items-end h-full'>
        <button className='rounded-md px-4 py-2 text-2xl font-bold buttonNew startButton ml-auto mr-auto mb-32'>
          PLAY
        </button>
        </div>
      </Link>
    </div>
  )
}
