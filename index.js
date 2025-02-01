const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

const {getHomePage,getProductPage,viewCategory} = require('./routes/index');
const {addCategoryPage, addCategory, deleteCategory, editCategory, editCategoryPage,addProduct,editProductPage,editProduct,deleteProduct} = require('./routes/category');

const db = mysql.createConnection({
    host:'localhost',
    username:'root',
    password:'',
    database:'nimap'
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    console.log('Database connected');
});
global.db = db;



app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get('/',getHomePage);
app.get('/add',addCategoryPage);
app.get('/edit/:id',editCategoryPage);
app.get('/delete/:id',deleteCategory);
app.post('/add',addCategory);
app.post('/edit/:id',editCategory);
app.get('/view_product',getProductPage);
app.post('/add_product',addProduct);
app.get('/add_product',viewCategory);
app.get('/edit_product/:id',editProductPage);
app.post('/edit_product/:id',editProduct);
app.get('/delete_product/:id',deleteProduct);
app.get('*', function(req, res, next){
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});

app.listen(port,()=>{
    console.log('Server connected to port:',port);
});
