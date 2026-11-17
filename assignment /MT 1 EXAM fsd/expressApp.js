const express = require("express");

const app = express();

const PORT = 4000;

app.use(express.json());


let foods = [
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


// GET /foods

app.get("/foods", (req, res) => {

    res.status(200).json(foods);

});


// GET /foods/:id

app.get("/foods/:id", (req, res) => {

    const id = Number(req.params.id);

    const food = foods.find(
        item => item.id === id
    );

    if (!food) {

        return res.status(404).json({
            message: "Food item not found"
        });

    }

    res.status(200).json(food);

});


// POST /foods

app.post("/foods", (req, res) => {

    const {
        id,
        foodName,
        category,
        price,
        availability
    } = req.body;


    if (
        id === undefined ||
        !foodName ||
        !category ||
        price === undefined ||
        availability === undefined
    ) {

        return res.status(400).json({
            message: "Missing required fields"
        });

    }


    if (
        typeof price !== "number" ||
        price <= 0
    ) {

        return res.status(400).json({
            message:
                "Price must be a positive number"
        });

    }


    const newFood = {
        id,
        foodName,
        category,
        price,
        availability
    };


    foods.push(newFood);


    res.status(201).json({
        message: "Food item added successfully",
        food: newFood
    });

});


// PUT /foods/:id

app.put("/foods/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = foods.findIndex(
        item => item.id === id
    );


    if (index === -1) {

        return res.status(404).json({
            message: "Food item not found"
        });

    }


    const {
        foodName,
        category,
        price,
        availability
    } = req.body;


    if (
        !foodName ||
        !category ||
        price === undefined ||
        availability === undefined
    ) {

        return res.status(400).json({
            message: "Missing required fields"
        });

    }


    if (
        typeof price !== "number" ||
        price <= 0
    ) {

        return res.status(400).json({
            message:
                "Price must be a positive number"
        });

    }


    foods[index] = {
        id,
        foodName,
        category,
        price,
        availability
    };


    res.status(200).json({
        message: "Food item updated successfully",
        food: foods[index]
    });

});


// DELETE /foods/:id

app.delete("/foods/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = foods.findIndex(
        item => item.id === id
    );


    if (index === -1) {

        return res.status(404).json({
            message: "Food item not found"
        });

    }


    const deletedFood =
        foods.splice(index, 1);


    res.status(200).json({
        message: "Food item deleted successfully",
        food: deletedFood[0]
    });

});


// INVALID ROUTE

app.use((req, res) => {

    res.status(404).json({
        message: "Route not found"
    });

});


app.listen(PORT, () => {

    console.log(
        `Express Server running at http://localhost:${PORT}`
    );

});