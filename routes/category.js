module.exports = {
    addCategoryPage: (req, res) => {
        res.render('add-category.ejs', {
            title: 'category',
            message: ''
        });
    },
    addCategory:(req,res)=>{
        let message = '';
        let category_name = req.body.category_name;

        let categorynameQuery = "SELECT * FROM category WHERE category_name = '"+category_name+"'";

        db.query(categorynameQuery, (err, result) => {
            if(err){
                return res.status(500).send(err);
            }
            if(result.length > 0){
                message = 'category already exists';
                res.render('add-category.ejs', {
                    message,
                    title: 'category'
                });
            }else{
                let query = "INSERT INTO `category`(category_name)VALUES('"+category_name+"')";
                db.query(query,(err,result)=>{
                    if(err){
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
        });
    },

    editCategoryPage: (req, res) => {
        let categoryId = req.params.id;
        let editquery = "SELECT * FROM `category` WHERE `category`.`category_id` = '"+categoryId+"'";
        db.query(editquery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }else{
            res.render('edit-category.ejs', {
                title: 'Category',
                category: result,
                message: ''
            });
        }

        });
    },
    editCategory:(req,res)=>{
        let categoryId = req.params.id;
        let category_name = req.body.category_name;
        let editcategoryquery = "UPDATE `category` SET `category_name`='"+ category_name +"' WHERE `category`.`category_id`='"+ categoryId +"'";
        db.query(editcategoryquery,(err,result)=>{
            if(err){
                return res.status(500).send(err);
            }else{
            res.redirect('/');
            }
        });
    },

    deleteCategory:(req,res)=>{
        let categoryId = req.params.id;
        console.log("this is for delete",categoryId);
        let deleteCategoryQuery = "DELETE FROM category WHERE category_id='"+categoryId+"'";

        db.query(deleteCategoryQuery,(err,result)=>{
            if(err){
                res.status(500).send(err);
            }else{
            res.redirect('/');
            }
        });
    },
// CRUD functions for product
    // addProductPage: (req,res)=>{
    //     res.render('add-product.ejs',{
    //         title:'Product',
    //         message:''
    //     });
    // },

    addProduct: (req,res)=>{
        let message = "";
        let category_id = req.body.category_name;
        let product_name = req.body.product_name;
        let productQuery = "SELECT * FROM products WHERE product_name = '"+product_name+"'";

        db.query(productQuery,(err,result)=>{
            if(err){
                return res.status(500).send(err);
            }
            if(result.length > 0){
                message = 'Product already Exists';
                res.render('add-product.ejs',{
                    message,
                    title: 'Product'
                });
            }
            else{
                let query = "INSERT INTO `products`(product_name,category_id)VALUES('"+product_name+"','"+category_id+"')";
                db.query(query,(err,result)=> {
                    if(err){
                        return res.status(500).send(err);
                    }else{
                        res.redirect('/view_product');
                    }
                });
            }
        });
    },

    editProductPage: (req,res)=> {
        let productId = req.params.id;
        let productEditQuery = "SELECT c.category_id as category_id,c.category_name as category_name,p.product_id as product_id,p.product_name as product_name FROM products p INNER JOIN category c ON p.product_id = c.category_id WHERE p.product_id = '"+ productId +"'";

        db.query(productEditQuery,(err,result)=>{
            if(err){
                return res.status(500).send(err);
            }else{
                res.render('edit-product.ejs',{
                    
                        title: 'Product',
                        product: result,
                        message: ''
                    
                });
            }
        });
    },

    editProduct: (req,res) => {
        let product_id = req.params.id;
        let category_id = req.body.category_name;
        let product_name = req.body.product_name;
        
        let productUpdateQuery = "UPDATE products SET `product_name`='"+ product_name +"',`category_id`='"+ category_id+"' WHERE `products`.`product_id`='"+ product_id+"'";
        db.query(productUpdateQuery,(err,result)=>{
            if(err){
                return res.status(500).send(err);
            }else{
            res.redirect('/view_product');
            }
        });
    },

    deleteProduct: (req,res) => {
        let product_id = req.params.id;

        let productDeleteQuery = "DELETE FROM product WHERE product_id='"+product_id+"'";
        db.query(productDeleteQuery,(err,result)=>{
            if(err){
                res.status(500).send(err);
            }else{
            res.redirect('/view_product');
            }
        });
    }
    
}
