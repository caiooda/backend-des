import { Request, Response } from "express";
import GetOpportuntiesUseCase from "../../../application/usecases/opportunities/GetOpportunitiesUseCase";

export class GetOpportunitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const service = new GetOpportuntiesUseCase();
      const result = await service.execute();
      return response.status(200).send(result);
    } catch (erro: any) {
      console.log("ERROR ===>", erro);
      return response.status(400).json(erro);
    }
  } 
}
