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

export const carsRepository = {
  findCarById(id: number) {
    let car = cars.find((c) => c.id === id);
    return car;
  },
  findCarByCompany(company: string | null | undefined) {
    if (company) {
      let filteredCars = cars.filter((c) => c.company.indexOf(company) > -1);
      return filteredCars;
    } else {
      return cars;
    }
  },
  createCar(company: string, model: string) {
    const newCar = {
      id: +new Date(),
      company: company,
      model: model,
    };
    cars.push(newCar);
    return newCar;
  },
  updateCar(id: number, company: string) {
    let car = cars.find((c) => c.id === id);
    if (car) {
      car.company = company;
      return true;
    } else {
      return false;
    }
  },
  deleteCar(id: number) {
    for (let i = 0; i < cars.length; i++) {
      if (cars[i].id === id) {
        cars.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};
