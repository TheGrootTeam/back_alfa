"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const api = express_1.default.Router();
// --------------- Instantiating controllers ------------------
const myAdsController = new controllers_1.controllers.MyAds();
const loginController = new controllers_1.controllers.Login();
const adsController = new controllers_1.controllers.Ads();
// Login
api.get('/login', loginController.index);
// Ads
api.get('/ads', adsController.index);
// MyAds
api.get('/myAds', myAdsController.index);
exports.default = api;
