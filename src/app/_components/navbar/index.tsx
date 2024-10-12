import styles from "./index.module.css";
import Logo from "../../public/Logo"

export default function Navbar () {
    return(
        <nav className={styles.barra}>
            <div className={styles.logo}>
                <Logo/>
            </div>
        </nav>
    );
}