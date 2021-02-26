import { useContext, useState } from 'react';
import { PriceContext } from '../contexts/PriceContext';
import styles from '../styles/components/Cotacao.module.scss';

export function Cotacao() {
  const ctx = useContext(PriceContext);
  const [priceOfDay, setPriceOfDay] = useState(0);

  return (
    <div className={styles.cotacao}>
      <span className={styles.label}>Cotação do Beer Coin hoje (<b>bc</b>)</span>
      <span className={styles.valor_cotacao}>{priceOfDay ? priceOfDay : '###'}</span>
      <div className={styles.linha_cotacao}></div>
    </div>
  )
}