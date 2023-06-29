import { Request, Response, Router } from "express";
import { v1 } from "uuid";
import { carsRepository } from "../repositories/carsRepository";

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

// Method POST
carsRouter.post("/", (req: Request, res: Response) => {
  const newCar = carsRepository.createCar(req.body.company, req.body.model);
  res.status(201).send(newCar);
});

// Method DELETE
carsRouter.delete("/:carId", (req: Request, res: Response) => {
  const isDeletedCarById = carsRepository.deleteCar(+req.params.carId);
  isDeletedCarById ? res.send(204) : res.send(404);
});

// Method PUT
carsRouter.put("/:id", (req: Request, res: Response) => {
  const isUpdated = carsRepository.updateCar(+req.params.id, req.body.company);
  if (isUpdated) {
    const updatedCar = carsRepository.findCarById(+req.params.id);
    res.status(201).send(updatedCar);
  } else {
    res.send(404);
  }
});
