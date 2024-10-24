import { Link } from 'react-router-dom'
import styles from './notfound.module.css'

export function Notfound() {
    return (
      <div className={styles.container}>
        <h1>Página 404, está página não existe!</h1>
        <Link className={styles.btn} to="/">
          <button className={styles.button}>Início</button>
        </Link>
      </div>
    )
  }
  

  