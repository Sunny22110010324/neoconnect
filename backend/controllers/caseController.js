const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

function generateTrackingId(){

 const year = new Date().getFullYear()
 const num = Math.floor(Math.random()*1000)

 return `NEO-${year}-${num}`

}

exports.submitCase = async(req,res)=>{

 const {category,department,location,severity} = req.body

 const caseData = await prisma.case.create({

  data:{
   trackingId:generateTrackingId(),
   category,
   department,
   location,
   severity,
   status:"New"
  }

 })

 res.json(caseData)

}

exports.getCases = async(req,res)=>{

 const cases = await prisma.case.findMany()

 res.json(cases)

}

exports.updateStatus = async(req,res)=>{

 const {id,status} = req.body

 const updated = await prisma.case.update({

  where:{id},
  data:{status}

 })

 res.json(updated)

}