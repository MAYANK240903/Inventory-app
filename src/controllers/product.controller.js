import path from 'path';
import ProductModel from '../models/product_model.js';
import { getSystemErrorMap } from 'util';

export default class ProductController{
    getProducts(req,res){
        let products = ProductModel.get();
        // return res.sendFile(path.join(path.resolve() , "src", "views" , "product.ejs"));
        res.render("product" ,{products:products , userEmail:req.session.userEmail});
    }
    getAddForm(req,res){
        return res.render("new_product",{
            errorMessage: null, userEmail:req.session.userEmail
        });
    }

    addNewProduct(req , res , next){

        const {name , desc , price} = req.body;
        const imageUrl = 'images/'+req.file.filename;
        ProductModel.add(name , desc , price , imageUrl);
        let products = ProductModel.get();
        res.render("product" ,{products, userEmail:req.session.userEmail});
    }

    getUpdateProduct(req , res , next){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

        if (productFound){
            res.render('update-product' , {product:productFound , errorMessage:null, userEmail:req.session.userEmail});
        }
        else{
            res.status(401).send("Product Not Found");
        }
    }
    postUpdateProduct(req , res, next){
        ProductModel.update(req.body);
        var products = ProductModel.get();
        res.render('product' , {products, userEmail:req.session.userEmail});
    }
    deleteProduct(req , res , next){
        const id = req.params.id;
        const productFound = ProductModel.delete(id);
        if (productFound){
            let products = ProductModel.get();
            res.render('product' , {products, userEmail:req.session.userEmail});
        }
        else{
            res.status(401).send("Product Not Found");
        }
    }
}