import { calculateBmi, parseBimCalculatorArguments } from "./bmiCalculator";
import express from "express";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) {
    res.status(400).json({ error: "height and weight are required" });
    return;
  }

  try {
    const { parsedHeight, parsedWeight } = parseBimCalculatorArguments(
      height as string,
      weight as string
    );
    const bmi = calculateBmi(parsedHeight, parsedWeight);
    res.status(200).json({
      height,
      weight,
      bmi,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    console.log("Something went wrong");
  }
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
