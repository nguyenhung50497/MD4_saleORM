import { Request, Response } from "express";
declare class HomeController {
    private productService;
    private categoryService;
    constructor();
    showHome: (req: Request, res: Response) => Promise<void>;
    test: (req: Request, res: Response) => Promise<void>;
    showHomeLogined: (req: Request, res: Response) => Promise<void>;
    showHomeCustomer: (req: Request, res: Response) => Promise<void>;
    showFormCreate: (req: Request, res: Response) => Promise<void>;
    createProduct: (req: Request, res: Response) => Promise<void>;
    showFormEdit: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    showFormDelete: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
    showFormDetail: (req: Request, res: Response) => Promise<void>;
    searchProduct: (req: Request, res: Response) => Promise<void>;
}
declare const _default: HomeController;
export default _default;
