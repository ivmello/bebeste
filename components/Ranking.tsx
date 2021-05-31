import styles from '../styles/components/Ranking.module.scss';

export function Ranking() {
  const users = [
    {
      name: 'igor',
      weeks: [
        {
          number: 1,
          date: '19/02/2021',
          result: 0, // perdeu
        },
        {
          number: 2,
          date: '22/02/2021',
          result: 1, // ganhou
        },
        {
          number: 3,
          date: '26/02/2021',
          result: 2, // indiferente
        },
      ]
    },
    {
      name: 'Karenini',
      weeks: [
        {
          number: 1,
          date: '19/02/2021',
          result: 1, // perdeu
        },
        {
          number: 2,
          date: '22/02/2021',
          result: 1, // ganhou
        },
        {
          number: 3,
          date: '26/02/2021',
          result: 2, // indiferente
        },
      ]
    },
  ]

  return (
    <div className={styles.ranking}>
      <span className={styles.label}>Placar geral</span>
      
      <table className={styles.table_ranking} >
        <thead>
          <tr>
            <th colSpan={0}>#</th>
            <th colSpan={0}>Semanas</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr>
              <td>{user.name}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      {user.weeks.map(week => (
                        <th>
                          {week.number}<br/>
                          <small>{week.date}</small>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      {user.weeks.map(week => (
                        <td>
                          {week.result == 1 &&
                            <div className={styles.winner}></div>
                          }
                          {week.result == 0 &&
                            <div className={styles.loser}></div>
                          }
                          {week.result == 2 &&
                            <div className={styles.middle}></div>
                          }
                        </td>
                      ))}
                    </tr>
                  </thead>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}