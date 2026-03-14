const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function startServer() {
  await prisma.$connect();
  console.log("Database connected");

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();