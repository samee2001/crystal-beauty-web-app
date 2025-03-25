import Product from "../models/productModel.js";
export function createProduct(req,res) {
    if(req.user == null){
        res.json({
            message: "You need to login first",
        });
        return;
    }
    if (req.user.role != "admin") {
        res.json({
            message: "You are not authorized to add product",
        });
        return;
    }
    const product = new Product(req.body);
    product.save()
        .then(() => {
            res.json({
                message: "Product saved successfully",
            });
        })
        .catch((err) => {
            res.json({
                message: "Error saving product",
                error : err.message
                
            });
        });
}

export function getProducts(req,res){
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.json({
                message: "Error getting products",
                //error : err.message
            });
        });
}

 export function searchItem(req,res){
    const name = req.params.name;
    Product.find(
        { name: name }
    ).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            message: "Error getting product",
            error: err.message
        });
    });
}
