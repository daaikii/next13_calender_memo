import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

//PrismaClientのインスタンスを作成
const prismadb = globalThis.prisma || new PrismaClient();

//本番環境以外でprismaを手軽に使用出来るようにする※たぶん
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
