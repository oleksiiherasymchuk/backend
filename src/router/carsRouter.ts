import { Request, Response, Router } from "express";
import { v1 } from "uuid";
import { carsRepository } from "../repositories/carsRepository";
import { inputValidatorsMiddleware } from "../middlewares/inputValidatorsMiddleware";
import { body } from "express-validator";

export const carsRouter = Router({});

// Method GET
carsRouter.get("/", (req: Request, res: Response) => {
  let foundCarByCompany = carsRepository.findCarByCompany(
    req.query.company?.toString()
  );
  res.send(foundCarByCompany);
});

carsRouter.get("/:carId", (req: Request, res: Response) => {
  const foundCarById = carsRepository.findCarById(+req.params.carId);
  res.send(foundCarById);
});

// Method DELETE
carsRouter.delete("/:carId", (req: Request, res: Response) => {
  const isDeletedCarById = carsRepository.deleteCar(+req.params.carId);
  isDeletedCarById ? res.send(204) : res.send(404);
});

const company = body("company")
  .isLength({ min: 3, max: 30 })
  .withMessage("Company name should be 3-30 characters");

const model = body("model")
  .isLength({ min: 3, max: 20 })
  .withMessage("Model should be 3-20 characters");

// Method POST
carsRouter.post(
  "/",
  company,
  model,
  inputValidatorsMiddleware,
  (req: Request, res: Response) => {
    const newCar = carsRepository.createCar(req.body.company, req.body.model);
    res.status(201).send(newCar);
  }
);

// Method PUT
carsRouter.put(
  "/:id",
  company,
  model,
  inputValidatorsMiddleware,
  (req: Request, res: Response) => {
    const isUpdated = carsRepository.updateCar(
      +req.params.id,
      req.body.company
    );
    if (isUpdated) {
      const updatedCar = carsRepository.findCarById(+req.params.id);
      res.status(201).send(updatedCar);
    } else {
      res.send(404);
    }
  }
);
