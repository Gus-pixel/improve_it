"use client";
import CheckIcone from "../_components/check/CheckIcone";
import commonStyles from "../common.module.css";
import Sidebar from "../_components/sidebar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  router.push("/melhoria");
}
