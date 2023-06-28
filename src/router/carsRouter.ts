import { Request, Response, Router } from "express";

const cars = [
  { id: 1, company: "Audi", model: "Q7" },
  { id: 2, company: "BMW", model: "X5" },
  { id: 3, company: "Chevrolet", model: "Camaro" },
  { id: 4, company: "Ford", model: "Mustang" },
  { id: 5, company: "Honda", model: "Civic" },
  { id: 6, company: "Mercedes-Benz", model: "E-Class" },
  { id: 7, company: "Nissan", model: "GT-R" },
  { id: 8, company: "Tesla", model: "Model S" },
  { id: 9, company: "Toyota", model: "Camry" },
  { id: 10, company: "Volkswagen", model: "Golf" },
];

export const carsRouter = Router({});

// Method GET
carsRouter.get("/", (req: Request, res: Response) => {
  res.send(cars);
});

carsRouter.get("/:carTitle", (req: Request, res: Response) => {
  let car = cars.find((c) => c.company === req.params.carTitle);
  car ? res.send(car) : res.send(404);
});

carsRouter.get("/", (req: Request, res: Response) => {
  if (req.query.carCompany) {
    let searchString = req.query.carCompany.toString();
    res.send(cars.filter((c) => c.company.indexOf(searchString) > -1));
  } else {
    res.send(404);
  }
});

// Method DELETE
carsRouter.delete("/:company", (req: Request, res: Response) => {
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].company === req.params.company) {
      cars.splice(i, 1);
      res.send(204);
      return;
    }
  }
  res.send(404);
});

// Method POST
carsRouter.post("/", (req: Request, res: Response) => {
  const newCar = {
    // id: +v1(),
    id: +new Date(),
    company: req.body.company,
    model: req.body.model,
  };
  cars.push(newCar);
  res.status(201).send(newCar);
});

// Method PUT
carsRouter.put("/:company", (req: Request, res: Response) => {
  let car = cars.find((c) => c.company === req.params.company);
  if (car) {
    car.company = req.body.company;
    res.send(car);
  } else {
    res.send(404);
  }
});
