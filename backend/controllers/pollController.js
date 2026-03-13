const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

exports.createPoll = async(req,res)=>{

 const {question,options} = req.body

 const poll = await prisma.poll.create({

  data:{
   question,
   options:JSON.stringify(options),
   votes:JSON.stringify([])
  }

 })

 res.json(poll)

}

exports.getPolls = async(req,res)=>{

 const polls = await prisma.poll.findMany()

 res.json(polls)

}