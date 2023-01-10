import { PrismaClient } from "@prisma/client";
import RepositoryFactory from "../../domain/factories/RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(readonly connection: PrismaClient) {}

}
