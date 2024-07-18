import { Request, Response, NextFunction } from "express";

export default class LoginController {
    index(req: Request, res:Response, next:NextFunction) {
        res.json({message: "Hola mundo desde LoginController!"})
    }
}