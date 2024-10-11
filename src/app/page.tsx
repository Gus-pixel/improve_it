import Link from "next/link";
import styles from "./page.module.css";
import commonStyles from "./common.module.css";
import Logo from "./public/Logo";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginBoxHeader}>
          <Logo/>
          <div className={styles.loginBoxHeaderTitle}>
            <span>IMPROVE</span><span>IT</span>
          </div>
        </div>
        <h2>Login</h2>
        <form>
          <label htmlFor="usuario">Usuário</label>
          <input type="text" id="usuario" name="Usuário" />

          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" name="Senha" />
          <Link href={"home"}>
            <button className={commonStyles.botao} type="button">ENTRAR</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
