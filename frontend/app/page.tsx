"use client"

import { useState } from "react"

export default function Home() {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function login(){

const res = await fetch("http://localhost:5000/api/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

})

const data = await res.json()

localStorage.setItem("token",data.token)

alert("Login successful")

}

return(

<div className="flex justify-center items-center h-screen bg-gray-100">

<div className="bg-white p-8 rounded-lg shadow-md w-80">

<h1 className="text-2xl font-bold mb-6 text-center">
NeoConnect Login
</h1>

<input
className="border p-2 w-full mb-3 rounded"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border p-2 w-full mb-4 rounded"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="bg-blue-500 text-white w-full py-2 rounded"
onClick={login}
>
Login
</button>

</div>

</div>

)

}