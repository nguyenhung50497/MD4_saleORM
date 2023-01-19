import { Request, Response } from "express";
declare class HomeController {
    private productService;
    constructor();
    showHome: (req: Request, res: Response) => Promise<void>;
    showFormCreate: (req: Request, res: Response) => Promise<void>;
    createProduct: (req: Request, res: Response) => Promise<void>;
    showFormEdit: (req: Request, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
