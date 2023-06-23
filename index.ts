import { calculateBmi, parseBimCalculatorArguments } from "./bmiCalculator";
import {
  parseExerciseCalculatorArguments,
  calculateExercises,
} from "./exerciseCalculator";
import express from "express";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) {
    res.status(400).json({ error: "parameters missing" });
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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  try {
    const { parsedDailyExercices, parsedTarget } =
      parseExerciseCalculatorArguments(
        daily_exercises as number[],
        target as number
      );
    const result = calculateExercises({
      parsedDailyExercices,
      parsedTarget,
    });
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
    console.log("Something went wrong");
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
