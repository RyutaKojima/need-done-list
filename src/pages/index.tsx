import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'
import { EnumLayout, RoomData, WithBaseProps } from '../types/types'
import { Button } from '@material-ui/core'
import React from 'react'
import { useRouter } from 'next/router'
import { firestore } from '../library/firebase'

type PageProps = WithBaseProps<{}>

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return {
    props: {
      title: 'Need list',
      layout: EnumLayout.default,
    },
  }
}

const Home: NextPage<PageProps> = () => {
  const router = useRouter()

  const handleClick = async () => {
    const initialRoom: RoomData = {
      name: '',
      password: null,
      createdAt: '',
    }

    const documentRef = await firestore.collection('Rooms').add(initialRoom)
    const nextPath = `/${documentRef.id}/need`
    router.push(nextPath)
  }

  return (
    <div className="container">
      <Head>
        <title>Need Done List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Need Done List</h1>

        <p className="description">予定リストと完了済みを管理します</p>

        <Button variant="contained" color="primary" onClick={handleClick}>
          使う
        </Button>
      </main>

      <footer>
        <a
          href="https://github.com/RyutaKojima"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  )
}

export default Home
