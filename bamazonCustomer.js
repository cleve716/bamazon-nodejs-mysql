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
        purchaseItems();

    });

};
showProducts();

function updatedInv() {
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
        console.log();
        console.log("Thank you for your purchase!");
        console.log();
        console.log("See you next time!");
        console.log();
        console.log("____________________________________________________________________");
        console.log();

        console.log("(BELOW IS THE UPDATED DATABASE... MINUS THE PURCHASED ITEMS)");
        console.log(table.toString());

        connection.end();


    });

};


function purchaseItems() {
    inquirer
        .prompt({
            name: "productID",
            type: "input",
            message: "What is the product ID# of the item you want to buy?"
        })
        .then(function (selectID) {
            var selection = selectID.productID;
            connection.query("SELECT * FROM products WHERE item_id=?", selection, function (
                err,
                res
            ) {
                if (err) throw err;
                if (res.length === 0) {
                    console.log(
                        "This is an invalid Product ID#, please select one from above"
                    );
                    purchaseItems();

                } else {
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "How many " + res[0].product_name + "s would you like to order?"
                    })
                        .then(function (amount) {
                            var numberOrd = amount.quantity;
                            var onHand = res[0].stock_quantity;
                            var name = res[0].product_name;
                            var price = res[0].price;
                            if (numberOrd > onHand) {
                                console.log("We only have " + onHand + " " + name + "s available. Sorry.")

                                purchaseItems();
                            } else {
                                console.log();
                                console.log(numberOrd + " " + name + "s ordered at $" + price + " each");

                                var updateInv = onHand - numberOrd;
                                connection.query(
                                    "UPDATE bamazon.products SET stock_quantity = " +
                                    updateInv +
                                    " WHERE item_id =" +
                                    res[0].item_id,
                                    function (err, newInv) {
                                        if (err) throw (err);
                                        var total = numberOrd * price;
                                        console.log();
                                        console.log("Your total is $" + total.toFixed(2));
                                        updatedInv();


                                    }
                                )
                            }
                        }
                        )
                }

            });
        });
};





