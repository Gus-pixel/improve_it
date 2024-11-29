import MelhoriaComponent, { Melhoria } from "./MelhoriaComponent";
import * as api from "../api/api";

export default async function MelhoriaPage() {
  const melhorias = await api.get<Melhoria[]>("melhoria");
  return <MelhoriaComponent melhorias={melhorias} />;
}
