import {body , validationResult} from 'express-validator';

export const validRequest = async function(req , res , next){
    const rules=[
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({gt:0}).withMessage("Price should be greater than 0"),
        //body('imageUrl').isURL().withMessage("Invalid Url"),
        body('imageUrl').custom((value , {req})=>{
            if (!req.file){
                throw new Error("file not found");
            }
            return true;
        }),
    ]
    await Promise.all(rules.map(rule=> rule.run(req)));

    var errors = validationResult(req);


        if (!errors.isEmpty()){
            return res.render('new_product' ,{
                errorMessage: errors.array()[0].msg,
            });
        }
        next();
}