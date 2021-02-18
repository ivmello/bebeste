import Head from 'next/head'
import Image from 'next/image'
import { FaHeart } from "react-icons/fa";

export default function Home() {
  const participantes = [
    {
      nome: 'Igor',
      frequencia: [0,1,0,0],
      saldo: 1200,
      winner: 1,
      looser: 0,
    },
    {
      nome: 'Rico',
      frequencia: [1,1,0,0],
      saldo: 900,
      winner: 0,
      looser: 1,
    },
    {
      nome: 'Karenini',
      frequencia: [1,0,0,0],
      saldo: 1000,
      winner: 0,
      looser: 0,
    },
    {
      nome: 'Jess',
      frequencia: [1,0,1,1],
      saldo: 1100,
      winner: 0,
      looser: 0,
    },
  ];

  function openConfirmation() {
    // console.log('aqui');
    alert('Calma, ainda não ta pronto');
  }

  return (
    <div>
      <Head>
        <title>Bebeste?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app">
        <div className="logo"><Image src="/logo.jpg" width="300" height="224" /></div>

        <div className="cotacao">
          <span className="label">Cotação do Beer Coin hoje (<b>bc</b>)</span>
          <span className="valor_cotacao">###</span>
          <div className="linha_cotacao"></div>
        </div>

        <div className="participantes">
          <span className="label">Participantes</span>
          <div className="lista-participantes">
            {participantes.map((item, i) => 
              <div className="item-participante">
                {!!item.winner &&
                  <div className="winner">
                    <Image src="/trophy.png" width="96" height="96"/>
                  </div>
                }
                {!!item.looser &&
                  <div className="looser">
                  <Image src="/drunk.png" width="96" height="96"/>
                </div>
                }
                <div className="nome">{ item.nome }</div>
                <div className="linha"></div>
                <div className="info">
                  <div className="saldo">
                    <small>Saldo</small>
                    <span>{ item.saldo } <small>bc</small></span>
                  </div>
                  <div className="frequencia">
                    <small>Resumo da semana</small>
                    <div className="lista-frequencia">
                      {item.frequencia.map((frequencia) => 
                        <div className={`item-frequencia ${frequencia ? 'vermelho' : 'verde'}`}></div>
                      )}
                      <div className="item-frequencia "></div>
                    </div>
                    <button type="button" onClick={openConfirmation} className="btn-beber">Xi, <b>Bebi hoje</b></button>
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
