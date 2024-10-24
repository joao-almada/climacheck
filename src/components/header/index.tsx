
import logoImg from '../../assets/logo.png'
import styles from './header.module.css'

export function Header(){
    return(
            <header className={styles.container}>
                <img src={logoImg} alt="Logo ClimaCheck" />
            </header>
    )
}