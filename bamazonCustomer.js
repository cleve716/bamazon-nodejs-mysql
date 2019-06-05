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
    showProducts();
});

function showProducts() {
    connection.query("SELECT * FROM bamazon.products", function (err, res) {
        if (err) throw err;

        var table = new Table(
            {
                head: ["Product ID#", "Description", "Cost"],
                colWidths: [15, 45, 10],
            });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price]
            );
            console.log(table.toString());
        }

        console.log("____________________________")
        console.log("BAMAZON.COM");
        console.log("____________________________");
        console.log("See your options below");
        console.log("____________________________");
        console.log(table.toString());


    });




};
