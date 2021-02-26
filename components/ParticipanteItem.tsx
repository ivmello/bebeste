import styles from '../styles/components/ParticipanteItem.module.scss';

import Image from 'next/image';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import { PriceContext } from '../contexts/PriceContext';
import { useSpring, animated } from 'react-spring'
import { easeElasticOut } from 'd3-ease';

export function ParticipanteItem({ item, i }) {
  const { baseUrl, togglePreloader, togglePrice, loadUsers } = useContext(PriceContext);

  /** animation */
  const props = useSpring({
    from: {
      opacity: 0,
      transform: 'scale(0.1)'
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
    config: {
      duration: 1000 * (i + 1),
      easing: easeElasticOut
    }
  })
  /** --- */

  async function openConfirmation(user_id, drank) {
    let msg = `Muito bem, você conseguiu um grande feito. Continue assim que você irá longe.`

    if (drank) {
      msg = `Poxa, que pena que você bebeu. Ninguém aqui está te julgando mas seria bom pensar melhor na próxima vez.`
    }

    if (confirm(`Tem certeza que deseja escolher essa opção? Você não poderá mudar depois`)) {
      togglePreloader(true)

      const date = DateTime.local().setZone("America/Campo_Grande").toISODate().toString();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id, date, drank })
      };

      fetch(`${baseUrl}/scores`, requestOptions)
        .then(response => response.json())
        .then(data => {
          togglePreloader(false);
          togglePrice(data.price_of_day);
          loadUsers();

          if(data.msg) {
            alert(data.msg)
          } else {
            alert(msg);
          }
        });
    }
  }

  return (
    <animated.div style={props}>
      <div className={styles.participante}>
        {!!item.winner &&
          <div className={styles.winner}>
            <Image src="/trophy.png" width="96" height="96"/>
          </div>
        }
        {!!item.loser &&
          <div className={styles.loser}>
          <Image src="/drunk.png" width="96" height="96"/>
        </div>
        }
        <div className={styles.nome}>{ item.name }</div>
        <div className={styles.linha}></div>
        <div className={styles.info}>
          <div className={styles.saldo}>
            <small>Saldo</small>
            <span>{ item.total ? item.total : 0 } <small>bc</small></span>
          </div>
          <div className={styles.frequencia}>
            <small>Resumo da semana</small>
            <div className={styles.listaFrequencia}>
              {item.frequency.map((frequencia, i) =>
                <div key={i} className={`${styles.itemFrequencia} ${frequencia.drank ? styles.vermelho : styles.verde}`}></div>
              )}
              <div className={styles.itemFrequencia}></div>
            </div>
            <button type="button" onClick={() => openConfirmation(item.id, 0)} className={styles.btnNaoBebi}>Venci, <b>Não bebi hoje</b></button>
            <button type="button" onClick={() => openConfirmation(item.id, 1)} className={styles.btnBebi}><b>Tive que beber</b></button>
          </div>
        </div>
      </div>
    </animated.div>
  )
}