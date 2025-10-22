"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <--- Importar useRouter
import Button from "./Button";
import { useEffect } from "react";


export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      router.push("/pantalla_principal"); 
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    console.log("Usuario guardado:", username);

    router.push("/pantalla_principal");
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5 w-80 mx-auto mt-5">
      <input
        className="border px-3 py-2 rounded text-gray-800 "
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        
        required
      />
      <input
        className="border px-3 py-2 rounded text-gray-800"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit"> Iniciar sesión </Button>
    </form>
  );
}
