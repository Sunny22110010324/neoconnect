"use client"

import { useState } from "react"

export default function SubmitCase(){

const [category,setCategory] = useState("")
const [department,setDepartment] = useState("")
const [location,setLocation] = useState("")
const [severity,setSeverity] = useState("Low")

async function submit(){

const token = localStorage.getItem("token")

try{

await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases/submit`,{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":token || ""
},

body:JSON.stringify({
category,
department,
location,
severity
})

})

alert("Case Submitted Successfully")

}catch(err){

console.error(err)
alert("Error submitting case")

}

}

return(

<div style={{padding:"40px"}}>

<h1>Submit Complaint</h1>

<input
placeholder="Category"
onChange={(e)=>setCategory(e.target.value)}
/>

<br/><br/>

<input
placeholder="Department"
onChange={(e)=>setDepartment(e.target.value)}
/>

<br/><br/>

<input
placeholder="Location"
onChange={(e)=>setLocation(e.target.value)}
/>

<br/><br/>

<select onChange={(e)=>setSeverity(e.target.value)}>

<option>Low</option>
<option>Medium</option>
<option>High</option>

</select>

<br/><br/>

<button onClick={submit}>
Submit Case
</button>

</div>

)

}