import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import express from "express";
import mongoose from "mongoose";
import supertest from "supertest";
import MealModel from "./meal";
import app from "../connection"; // Assuming your express app is exported from this module

const request = supertest(app);

beforeAll(async () => {
  mongoose.connect(
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
    const retrievedMeal = MealModel.findById(createdMeal._id);
    expect(retrievedMeal.Name).toBe(newMeal.Name);
    expect(retrievedMeal.Description).toBe(newMeal.Description);
    expect(retrievedMeal.Image).toBe(newMeal.Image);
    expect(retrievedMeal.Price).toBe(newMeal.Price);
    expect(retrievedMeal.Course).toBe(newMeal.Course);
  }, 10000);
});
