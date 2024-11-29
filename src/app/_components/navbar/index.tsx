"use client";
import styles from "./index.module.css";
import Logo from "../../public/Logo";
import { useContext } from "react";
import { AuthContext } from "@/app/auth/auth";

export default function Navbar() {
  const { usuario } = useContext(AuthContext);
  return (
    <nav className={styles.barra}>
      <div className={styles.logo}>
        <Logo />
      </div>
      {/* <div className={styles.content}>
                <Link href="/login">
                    <div>Login</div>
                </Link>
                <Link href="/home">
                    <div>Home</div>
                </Link>
            </div> */}
      {usuario && (
        <div className={styles.content}>
          <span>IMPROVE</span>
          <span>IT</span>
        </div>
      )}
    </nav>
  );
}
