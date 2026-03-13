"use client"

import axios from "axios"
import { useState } from "react"

export default function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

async function login(){

try{

const res = await axios.post(
`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
{ email, password }
)

if(res.status === 200){
localStorage.setItem("token",res.data.token)
alert("Login successful")
}

}catch(err){

console.error(err)
alert("Login failed")

}

}

return(

<div style={styles.container}>

<div style={styles.card}>

<h1 style={styles.title}>NeoConnect Login</h1>

<input
style={styles.input}
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
style={styles.input}
placeholder="Password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button style={styles.button} onClick={login}>
Login
</button>

</div>

</div>

)

}

const styles = {

container:{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#4facfe,#00f2fe)"
},

card:{
background:"white",
padding:"40px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.2)",
width:"350px",
textAlign:"center"
},

title:{
marginBottom:"30px"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"6px",
border:"1px solid #ccc",
fontSize:"16px"
},

button:{
width:"100%",
padding:"12px",
background:"#4facfe",
border:"none",
color:"white",
fontSize:"16px",
borderRadius:"6px",
cursor:"pointer"
}

}