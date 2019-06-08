var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");  //npm installed packages

var connection = mysql.createConnection({ // connect to the database
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"

});

connection.connect(function (err) {
    if (err) {
        console.log("error connecting: " + err.stack);
    }

});

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table(
            {
                head: ["Product ID#", "Description", "Cost", "On Hand"],
                colWidths: [15, 30, 10, 15],
            });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
            
        }

        console.log("____________________________");
        console.log();
        console.log("BAMAZON.COM");
        console.log("____________________________");
        console.log();
        console.log("See your options below");
        console.log("____________________________");
        console.log();
        console.log(table.toString());
itemID();

    });
    
};
showProducts();


function itemID (){
    inquirer
    .prompt({
        name:"productID",
        type: "input",
        message: "What is the product ID# of the item you want to buy?"
    })
    .then(function(selectID) {
        var selection = selectID.productID;
        connection.query("SELECT * FROM products WHERE item_id=?", selection, function(
            err, 
            res
            ) {
            if (err) throw err;
            if(res.length === 0) {
                console.log(
                    "This is an invalid Product ID#, please select one from above"
                     );
                     itemID();   
             
            } else {
                console.log("Product ID# accepted");
            }  
            
        });
    });
};





