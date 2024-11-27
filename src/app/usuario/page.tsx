import Link from "next/link";
import CheckIcone from "../_components/check/CheckIcone";
import Sidebar from "../_components/sidebar";
import commonStyles from "../common.module.css";
import { UUID } from "crypto";
import * as api from "../api/api";
import { verifyCargoString } from "../utils";

export type Usuario = {
  id: UUID;
  nome: string;
  cargo: boolean;
  status: boolean;
};

export type UsuarioLogin = Usuario & {
  usuario: string;
  senha: string;
};

export default async function Usuario() {
  const usuarios = await api.get<UsuarioLogin[]>("usuario");

  return (
    <div className={commonStyles.homeContainer}>
      <Sidebar />
      <div className={commonStyles.pageContainer}>
        <table className={commonStyles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>
                <Link href="/usuario/cadastro">
                  <button className={commonStyles.botao}>Novo usuário</button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios
              .sort((a, b) => Number(b.status) - Number(a.status))
              .map((usuario) => (
                <tr
                  key={usuario.id}
                  className={!usuario.status ? commonStyles.disabled : ""}
                >
                  <td>
                    <CheckIcone checked={usuario.status} />
                  </td>
                  <td>{usuario.nome}</td>
                  <td>{verifyCargoString(usuario.cargo)}</td>
                  <td>
                    <Link href={`/usuario/${usuario.id}`}>
                      <button className={commonStyles.botao}>Editar</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
