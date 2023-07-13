import { Request, Response } from 'express';

export default interface ReqResInterface {
  req: Request;
  res: Response;
}
