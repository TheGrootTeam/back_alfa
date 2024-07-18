import { Request, Response, NextFunction } from "express";

export default class MyAdsController {
    index(req: Request, res:Response, next:NextFunction) {
        res.json({message: "Hola mundo desde MyAdsController!"})
    }
}