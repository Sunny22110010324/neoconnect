const {PrismaClient} = require("@prisma/client")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const prisma = new PrismaClient()

exports.register = async(req,res)=>{

 const {name,email,password,role} = req.body

 const hashed = await bcrypt.hash(password,10)

 const user = await prisma.user.create({

  data:{
   name,
   email,
   password:hashed,
   role
  }

 })

 res.json(user)

}

exports.login = async(req,res)=>{

 const {email,password} = req.body

 const user = await prisma.user.findUnique({where:{email}})

 if(!user) return res.status(400).json({msg:"User not found"})

 const valid = await bcrypt.compare(password,user.password)

 if(!valid) return res.status(400).json({msg:"Wrong password"})

 const token = jwt.sign(

 {id:user.id,role:user.role},

 process.env.JWT_SECRET

 )

 res.json({token})

}