import { suid } from 'rand-token'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps, NextPage } from 'next'
import { EnumLayout, WithBaseProps } from '../types/types'

type PageProps = WithBaseProps<{
  token: string
}>

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  return {
    props: {
      title: 'Need list',
      layout: EnumLayout.default,
      token: suid(12),
    },
  }
}

const Home: NextPage<PageProps> = (props) => {
  const newRoomCode: string = props.token

  return (
    <div className="container">
      <Head>
        <title>Need Done List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Need Done List</h1>

        <p className="description">予定リストと完了済みを管理します</p>

        <Link href={`/${newRoomCode}/need`}>使う</Link>
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
