import { useSetores } from "@/app/utils";
import UsuarioCadastro from "./UsuarioCadastro";

export default async function UsuarioCadastroPage() {
  const setores = await useSetores();
  return <UsuarioCadastro setores={setores} />;
}
