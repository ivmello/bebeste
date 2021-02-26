import styles from '../styles/components/Participantes.module.scss';
import { useContext, useEffect } from 'react';
import { ParticipanteItem } from '../components/ParticipanteItem';
import { PriceContext } from '../contexts/PriceContext';

export function Participantes() {
  const { isLoading, users, loadUsers } = useContext(PriceContext);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      {isLoading ?
        <div className={styles.loadingUsers}>
          carregando <strong>.</strong><strong>.</strong><strong>.</strong>
        </div>
      : (
      <div className={styles.participantes}>
        <span className={styles.label}>Participantes</span>
        <div className={styles.listaParticipantes}>
          {users.map((item, i) =>
            <ParticipanteItem key={i} i={i} item={item} />
          )}
        </div>
      </div>
      )}
    </>
  )
}