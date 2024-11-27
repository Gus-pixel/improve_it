import Sidebar from "@/app/_components/sidebar";
import commonStyles from "@/app/common.module.css";

export default function UsuarioCadastro() {
  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <form className={commonStyles.form}>
          <h2>Usuário</h2>
          <p>Cadastro de usuário</p>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" />
          <label htmlFor="cargo">Cargo</label>
          <input type="text" id="cargo" name="cargo" />
          <label htmlFor="email">Usuário</label>
          <input type="text" id="usuario" name="usuario" />
          <label htmlFor="senha">Senha</label>
          <input type="password" id="senha" name="senha" />
          <button type="submit" className={commonStyles.botao}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
