module.exports = {
    getHomePage: (req,res) => {
        let query = "SELECT * FROM `category` ORDER BY category_id ASC";

        db.query(query,(err,result)=>{
            if(err){
                res.redirect('/');
            }
            res.render('index.ejs',{
                title: 'Category',
                category:result

            });
        });
    },

    getProductPage: (req,res) => {
        
        let productQuery = "SELECT c.category_id as category_id,c.category_name as category_name,p.product_id as product_id,p.product_name as product_name FROM products p INNER JOIN category c ON p.category_id = c.category_id";

        db.query(productQuery,(err,result)=>{
            if(err){
                res.redirect('/view_product');
            }
            res.render('product.ejs',{
                title: 'Category',
                product: result
            });
        });
    },

    viewCategory:(req,res) => {
        let viewCategory = "SELECT * FROM category";

        db.query(viewCategory,(err,result) => {
            if(err){
                res.redirect('/')
            }
                res.render('add-product.ejs',{
                title: 'Product',
                product: result,
                message:''
                });
                console.log(result);
            
        });
    }
};