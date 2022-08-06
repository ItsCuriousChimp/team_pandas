/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import DatabaseError from "../common/utils/customErrors/databaseError";

class DbClient {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
    this.prisma
      .$connect()
      .then(() => logger.info("Database connected"))
      .catch((err: any) => {
        throw new DatabaseError("Unable to connect to database", err, null);
      });
  }
}

export const dbClient = new DbClient();
