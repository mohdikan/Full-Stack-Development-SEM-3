const http = require("http");
const fs = require("fs");

const PORT = 3000;

const foods = [
    {
        id: 1,
        foodName: "Pizza",
        category: "Fast Food",
        price: 250,
        availability: true
    },
    {
        id: 2,
        foodName: "Burger",
        category: "Fast Food",
        price: 150,
        availability: true
    },
    {
        id: 3,
        foodName: "Biryani",
        category: "Indian",
        price: 200,
        availability: true
    }
];

const server = http.createServer((req, res) => {

    // HOME
    if (req.method === "GET" && req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <html>
            <body>
                <h1>Welcome to Online Food Ordering</h1>
                <p>Node.js HTTP Server is running.</p>
            </body>
            </html>
        `);

        return;
    }


    // GET /foods
    if (req.method === "GET" && req.url === "/foods") {

        const availableFoods =
            foods.filter(food => food.availability === true);

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(availableFoods));

        return;
    }


    // GET /about
    if (req.method === "GET" && req.url === "/about") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <html>
            <body>
                <h1>About Our Restaurant</h1>
                <p>Online Food Ordering Web Application.</p>
            </body>
            </html>
        `);

        return;
    }


    // GET /menu
    if (req.method === "GET" && req.url === "/menu") {

        fs.readFile(
            "./public/menu.html",
            "utf8",
            (err, data) => {

                if (err) {

                    res.writeHead(500, {
                        "Content-Type": "text/plain"
                    });

                    res.end("Error reading menu file.");

                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(data);
            }
        );

        return;
    }


    // POST /add-food
    if (
        req.method === "POST" &&
        req.url === "/add-food"
    ) {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {

                const data = JSON.parse(body);

                if (
                    data.id === undefined ||
                    !data.foodName ||
                    !data.category ||
                    data.price === undefined ||
                    data.availability === undefined
                ) {

                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "Missing required fields"
                    }));

                    return;
                }


                if (
                    typeof data.price !== "number" ||
                    data.price <= 0
                ) {

                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message:
                            "Price must be a positive number"
                    }));

                    return;
                }


                foods.push(data);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Food item added successfully",
                    food: data
                }));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));
            }

        });

        return;
    }


    // INVALID ROUTE
    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        message: "Route not found"
    }));

});

server.listen(PORT, () => {

    console.log(
        `HTTP Server running at http://localhost:${PORT}`
    );

});