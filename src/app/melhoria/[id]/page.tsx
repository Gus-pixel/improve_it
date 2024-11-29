import { usePilares } from "@/app/utils";
import MelhoriaCadastro from "./MelhoriaCadastro";

export default async function MelhoriaCadastroPage() {
  const pilares = await usePilares();
  return <MelhoriaCadastro pilares={pilares} />;
}
