import { render } from "ejs";
import UserModel from "../models/user-model.js";
import ProductModel from "../models/product_model.js";


export class UserController{
    getRegister(req,res){
        res.render('register');
    }
    getLogin(req,res){

        res.render('login',{errorMessage:null});
    }
    postRegister(req,res){
        const {name , email , password} = req.body;
        UserModel.add(name , email , password);
        res.render('login',{errorMessage:null});
    }
    postLogin(req,res){
        const {email , password} = req.body;
        const user = UserModel.isValidsUser(email,password);
        if(!user){
            const errorMessage=("Invalid Credential");
            return res.render('login',{errorMessage:errorMessage});
        }
        else{
            req.session.userEmail = email;
            var products = ProductModel.get();
            res.render('product' , {products, userEmail:req.session.userEmail});
        }
    }

    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/login');
            }
        });
        res.clearCookie('lastVisit');
    }
}