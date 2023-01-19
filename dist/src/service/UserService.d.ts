declare class UserService {
    private userRepository;
    private cartRepository;
    constructor();
    getAll: () => Promise<any>;
    checkUser: (user: any) => Promise<any>;
    checkUsername: (user: any) => Promise<any>;
    registerUser: (user: any) => Promise<any>;
    findById: (id: any) => Promise<any>;
    private changePassword;
    private orderProduct;
    findCartByUser: (user: any) => Promise<any>;
    changeStatusCart: (user: any) => Promise<string>;
    private removeCart;
}
declare const _default: UserService;
export default _default;
