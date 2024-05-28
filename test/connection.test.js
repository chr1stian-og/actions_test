import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import mongoose from "mongoose";
import supertest from "supertest";
import MealModel from "./meal";
import OrderModel from "./order";
import app from "../connection"; // Ensure your express app is correctly imported

const request = supertest(app);

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://christian2:christian2@beatstore.todsx.mongodb.net/EasyOrder?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await MealModel.deleteMany({});
});

afterEach(async () => {
  await MealModel.deleteMany({});
});

describe("Testing the Connection", () => {
  it("should create and retrieve a meal", async () => {
    const newMeal = {
      Name: "Test Meal",
      Description: "This is a test meal",
      Image: "image_url",
      Price: "10.99",
      Course: "Main",
    };

    // Creating the meal
    const createdMeal = await MealModel.create(newMeal);

    // Retrieve the meal
    const retrievedMeal = await MealModel.findById(createdMeal._id);

    expect(retrievedMeal.Name).toBe(newMeal.Name);
    expect(retrievedMeal.Description).toBe(newMeal.Description);
    expect(retrievedMeal.Image).toBe(newMeal.Image);
    expect(retrievedMeal.Price).toBe(newMeal.Price);
    expect(retrievedMeal.Course).toBe(newMeal.Course);
  }, 10000);

  it("Should set and Retrieve an order", async () => {
    const newOrder = OrderModel.create({
      Name: "Pizza",
      Price: "10.99",
      Mesa: "1",
      Estado: "sendo_preparado",
    });

    const createdOrder = await OrderModel.create(newOrder);

    expect(createdOrder.Name).toBe(newOrder.Name);
    expect(createdOrder.Price).toBe(newOrder.Price);
    expect(createdOrder.Mesa).toBe(newOrder.Mesa);
    expect(createdOrder.Estado).toBe(newOrder.Estado);
  }, 10000);
});
