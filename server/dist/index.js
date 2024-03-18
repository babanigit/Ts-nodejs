"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import express,{Express,Request,Response} from "express"
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const connection_1 = __importDefault(require("./db/connection"));
const noteRoutes_1 = __importDefault(require("./Routes/noteRoutes"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const http_errors_1 = __importStar(require("http-errors"));
dotenv_1.default.config({ path: "./.env" });
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// import utilEnv from "./util/validateEnv";
(0, connection_1.default)();
// routes
app.use("/api/notes", noteRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.get("/", (req, res, next) => {
    try {
        res.status(200).json({
            message: "Express.js + Typescript server is live ",
        });
    }
    catch (error) {
        next(error);
    }
});
// end point middleware
app.use((res, req, next) => {
    // next(Error("endpoint not found"));
    next((0, http_errors_1.default)(404, "endpoint not found"));
});
// error handler middleware
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "an unknown error occurred";
    let statusCode = 500;
    // if (error instanceof Error) errorMessage = error.message;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
app.listen(port, () => {
    console.log(`[server]: hello, my Server is running at http://localhost:${port}`);
});
