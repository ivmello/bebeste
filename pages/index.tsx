import { GetStaticProps, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { DateTime } from 'luxon';
import ModalDrink from '../components/ModalDrink'

// type UsersList = {
//   id: number,
//   name: string,
//   total: number,
//   price_of_day: number,
// }

// const baseUrl = 'https://bebeste.vercel.app';
const baseUrl = 'http://localhost:3000';

export default function Home({ users }) {
// export default function Home() {
  let [preloader, setPreloader] = useState(false);
  let [priceOfDay, setPriceOfDay] = useState(0);
  let [modalOpened, setModalOpened] = useState(true);

  // const users = [
  //   {
  //     id: 1,
  //     name: 'Igor',
  //     total: 1200,
  //     price_of_day: 1200,
  //   },
  // ];

  async function openConfirmation(user_id, drank) {
    let msg = `Muito bem, você conseguiu um grande feito. Continue assim que você irá longe.`

    if (drank) {
      msg = `Poxa, que pena que você bebeu. Ninguém aqui está te julgando mas seria bom pensar melhor na próxima vez.`
    }

    if (confirm(`Tem certeza que deseja escolher essa opção? Você não poderá mudar depois`)) {
      setPreloader(true);
      const date = DateTime.local().setZone("America/Campo_Grande").toISODate().toString();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id, date, drank })
    };
    fetch(`${baseUrl}/api/scores/create`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPreloader(false);
          setPriceOfDay(data.price_of_day);
          if(data.status == 2) {
            alert('Você já escolheu sua opção hoje, espertinho.')
          } else {
            alert(msg);
          }
        });
    }
  }

  return (
    <div>
      <Head>
        <title>Bebeste?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {preloader && (
        <div className="preloader">
          Enviando...
        </div>
      )}

      {/* <ModalDrink isOpened={modalOpened} /> */}

      <div className="app">
        <div className="logo"><Image src="/logo.jpg" width="300" height="224" /></div>

        <div className="cotacao">
          <span className="label">Cotação do Beer Coin hoje (<b>bc</b>)</span>
          <span className="valor_cotacao">{priceOfDay ? priceOfDay : '###'}</span>
          <div className="linha_cotacao"></div>
        </div>

        <div className="participantes">
          <span className="label">Participantes</span>
          <div className="lista-participantes">
            {users.map((item, i) =>
              <div key={i} className="item-participante">
                {/* {!!item.winner &&
                  <div className="winner">
                    <Image src="/trophy.png" width="96" height="96"/>
                  </div>
                }
                {!!item.looser &&
                  <div className="looser">
                  <Image src="/drunk.png" width="96" height="96"/>
                </div>
                } */}
                <div className="nome">{ item.name }</div>
                <div className="linha"></div>
                <div className="info">
                  <div className="saldo">
                    <small>Saldo</small>
                    <span>{ item.total ? item.total : 0 } <small>bc</small></span>
                  </div>
                  <div className="frequencia">
                    {/* <small>Resumo da semana</small>
                    <div className="lista-frequencia">
                      {item.frequencia.map((frequencia, i) => 
                        <div key={i} className={`item-frequencia ${frequencia ? 'vermelho' : 'verde'}`}></div>
                      )}
                      <div className="item-frequencia "></div>
                    </div> */}
                    <button type="button" onClick={() => openConfirmation(item.id, 0)} className="btn-nao-bebi">Venci, <b>Não bebi hoje</b></button>
                    <button type="button" onClick={() => openConfirmation(item.id, 1)} className="btn-bebi"><b>Tive que beber</b></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer>
        Um projeto de código aberto para ajudar amigos a beberem menos durante a semana. <br/>
        <a href="https://github.com/ivmello/bebeste" target="_blank">Contribua aqui <FaHeart/></a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${baseUrl}/api/users`)
  const users = await res.json()
  return {
    props: {
      users
    },
  }
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await fetch(`${baseUrl}/api/users`)
//   const users = await res.json()
//   return {
//     props: {
//       users
//     },
//     revalidate: 5,
//   }
// }