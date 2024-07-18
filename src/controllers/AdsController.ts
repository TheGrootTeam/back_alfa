import { Request, Response, NextFunction } from "express";

export default class AdsController {
    index(req: Request, res:Response, next:NextFunction) {
        res.json({message: "Hola mundo desde AdsController!"})
    }
}