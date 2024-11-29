import { useSetores } from "@/app/utils";
import UsuarioCadastro from "./UsuarioCadastro";

export default async function UsuarioCadastroPage() {
  const setores = await useSetores();
  setores.filter((setor) => setor.status);
  return <UsuarioCadastro setores={setores} />;
}
