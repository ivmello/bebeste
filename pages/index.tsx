import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { config } from '../utils'
import { Cotacao } from '../components/Cotacao';
import { Ranking } from '../components/Ranking';
import { Participantes } from '../components/Participantes';
import { PriceContext } from '../contexts/PriceContext';

export default function Home() {
  const { isLoading} = useContext(PriceContext);

  return (
    <div>
      <Head>
        <title>Bebeste?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && (
        <div className="preloader">
          carregando ...
        </div>
      )}

      <div className="app">
        <div className="logo"><Image src="/logo.jpg" width="300" height="224" /></div>

        {/* <Cotacao /> */}
        <small>(o saldo dos participantes será mostrado somente na sexta-feira)</small>
        <Participantes />
        {/* <Ranking /> */}
      </div>

      <footer>
        Um projeto de código aberto para ajudar amigos a beberem menos durante a semana. <br/>
        <a href="https://github.com/ivmello/bebeste" target="_blank">Contribua aqui <FaHeart/></a>
      </footer>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`${baseUrl}/users`)
//   const users = await res.json()
//   return {
//     props: {
//       users_data: users
//     },
//   }
// }
