import styles from "./index.module.css";
import Logo from "../../public/Logo"
import Link from "next/link";

export default function Navbar () {
    return(
        <nav className={styles.barra}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <div className={styles.content}>
                <Link href="/login">
                    <div>Login</div>
                </Link>
                <Link href="/home">
                    <div>Home</div>
                </Link>
            </div>
        </nav>
    );
}