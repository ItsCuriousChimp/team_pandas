/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { dbClient } from "./dbClient";
import logger from "../common/logger/logger";
import { Show } from "../models/show.model";
import CustomError from "../common/utils/customErrors/customError";

class ShowRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = dbClient.prisma;
  }

  getShow = async (showId: string): Promise<Show | null> => {
    try {
      const show: Show | null = await this.prisma.show.findUnique({
        where: {
          id: showId,
        },
      });
      return show;
    } catch (err: any) {
      logger.error({
        message: "Unable to fetch show",
        error: err,
        __filename,
      });
      throw new CustomError({
        ...err,
        data: showId,
        statusCode: 500,
        message: "Unable to fetch show",
      });
    }
  };
}

export const showRepository = new ShowRepository();
