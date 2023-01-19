import { Request, Response } from "express";
declare module "express-session" {
    interface SessionData {
        User: {
            [key: string]: any;
        };
    }
}
declare class HomeController {
    private userService;
    constructor();
    showFormLogin: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    showFormRegister: (req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
    showFormChangePassword: (req: Request, res: Response) => Promise<void>;
    changePassword: (req: Request, res: Response) => Promise<void>;
    orderProduct: (req: Request, res: Response) => Promise<void>;
    showFormCart: (req: Request, res: Response) => Promise<void>;
    searchProduct: (req: Request, res: Response) => Promise<void>;
    payOrder: (req: Request, res: Response) => Promise<void>;
    priceRange: (req: Request, res: Response) => Promise<void>;
    deleteCart: (req: Request, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
