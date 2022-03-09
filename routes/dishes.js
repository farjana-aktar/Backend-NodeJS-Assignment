const express = require("express");
const router = express.Router();
router.use(express.json());

const dishesRoute = [
  { id: 1, name: "Fried Rice" },
  { id: 2, name: "Pizza" },
  { id: 3, name: "Burger" },
  { id: 4, name: "Pasta" },
  { id: 5, name: "Sandwich" },
  { id: 6, name: "Ice-cream" },
];

router.get("/", (req, res) => {
  res.send(dishes);
});

router.get("/:id", (req, res) => {
  const dish = dishes.find((d) => d.id === parseInt(req.params.id));
  if (!dish)
    res
      .status(404)
      .send(
        "Sorry ...!! The Dish you orderd with this given id was not found..(:"
      );
  else res.send(dish);
});

router.post("/", (req, res) => {
  const result = req.body;

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const dish = {
    id: dishes.length + 1,
    name: req.body.name,
  };
  dishes.push(dish);
  res.send(dish);
});

router.put("/:id", (req, res) => {
  const dish = dishes.find((d) => d.id === parseInt(req.params.id));
  if (!dish) {
    res
      .status(404)
      .send(
        "Sorry ...!! The Dish you orderd with this given id was not found..(:"
      );
    return;
  }

  const result = validateDish(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  dish.name = req.body.name;
  res.send(dish);
});

router.delete("/:id", (req, res) => {
  const dish = dishes.find((d) => d.id === parseInt(req.params.id));
  if (!dish) {
    res
      .status(404)
      .send(
        "Sorry ...!! The Dish you orderd with this given id was not found..(:"
      );
    return;
  }

  const index = dishes.indexOf(dish);
  dishes.splice(index, 1);

  res.send(dish);
});

module.exports = router;
