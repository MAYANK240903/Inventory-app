import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import ProductController from './src/controllers/product.controller.js';
import { validRequest } from './src/controllers/middleware/validation.js';
import { uploadFile } from './src/controllers/middleware/file-upload.js';
import {UserController}from './src/controllers/user-controller.js';
import session from 'express-session';
import { auth } from './src/controllers/middleware/auth-middleware.js';
import cookieParser from 'cookie-parser';
import { setlastVisit} from './src/controllers/middleware/last-visit.js';


const server = express();

server.use(express.urlencoded({ extended:true }));
server.use(express.static("public"));
server.set("view engine" ,"ejs");
server.set("views" , path.join(path.resolve(),"src", "views"));
server.use(cookieParser());

server.use(session({
    secret:'SecretKey',
    resave:'false',
    saveUninitialized: true,
    cookie: {secure:false},
    })
);

server.use(ejsLayouts);
const userController = new UserController();
const productController =new ProductController();
server.get('/' ,setlastVisit,auth, productController.getProducts);
server.get('/new' , auth,productController.getAddForm);
server.get('/update/:id',auth , productController.getUpdateProduct);
server.post('/update' , auth,productController.postUpdateProduct);
server.post('/' ,  auth,uploadFile.single("imageUrl"), validRequest,productController.addNewProduct);
server.post('/delete/:id' , auth,productController.deleteProduct);

server.get('/register' , userController.getRegister);
server.get('/login' , userController.getLogin);
server.post('/register' , userController.postRegister);
server.post('/login' , userController.postLogin);
server.get('/logout' , userController.logout);






server.listen(3400);