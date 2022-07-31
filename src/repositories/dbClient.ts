/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import logger from "../common/logger/logger";
import DatabaseError from "../common/utils/customErrors/databaseError";

class DbClient {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  dbConnect = async (): Promise<void> => {
    try {
      await this.prisma.$connect();
      logger.info("Successfully connected to database");
    } catch (err: any) {
      logger.error({
        message: "Database connection failed",
        error: err,
        __filename,
      });
      throw new DatabaseError("Database Connection Failed", err, this.prisma);
    }
  };

  dbDisconnect = async (): Promise<void> => {
    try {
      await this.prisma.$disconnect();
      logger.info("Database disconnected");
    } catch (err: any) {
      logger.error({
        message: "Unable to disconnect database",
        error: err,
        __filename,
      });
      throw new DatabaseError("Unable to disconnet database", err, this.prisma);
    }
  };
}

export const dbClient = new DbClient();
