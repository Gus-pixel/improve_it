import { Setor } from "./setor/page";
import { UsuarioLogin } from "./usuario/page";
import * as api from "./api/api";
import { Pilar } from "./melhoria/[id]/MelhoriaCadastro";

export function verifyCadastro(pathname: string) {
  if (pathname.includes("cadastro")) {
    return "Cadastro";
  } else {
    return "Edição";
  }
}

export function verifyStatus(status: string) {
  if (status === "ativo") {
    return true;
  } else {
    return false;
  }
}

export function verifyStatusString(status: boolean) {
  if (status) {
    return "ativo";
  } else {
    return "inativo";
  }
}

export function verifyCargoString(cargo: boolean) {
  if (cargo === true) {
    return "Gestor";
  } else {
    return "Funcionário";
  }
}

export function hideUserData(user: UsuarioLogin) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { usuario, senha, ...rest } = user;
  return rest;
}

export async function useSetores(){
  const setores = await api.get<Setor[]>("setor");
  return setores as Setor[];
}

export async function usePilares() {
  const pilares = await api.get<Pilar[]>("pilar");
  return pilares as Pilar[];
}
