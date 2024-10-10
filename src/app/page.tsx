import styles from "./page.module.css";
import Logo from "./public/Logo";

export default function Home() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.loginBoxHeader}>
          <Logo />
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
          <button className={styles.botao}>ENTRAR</button>
        </form>
      </div>
    </div>
  );
}
