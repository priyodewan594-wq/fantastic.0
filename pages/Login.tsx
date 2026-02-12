import { useState } from "react";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [secret,setSecret] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password,secretCode:secret})
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    alert("Logged in as "+data.role);
  }

  return (
    <div>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)}/>
      <input placeholder="Secret Code (Admin)" onChange={e=>setSecret(e.target.value)}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
