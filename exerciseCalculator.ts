type Rating = 1 | 2 | 3;
type RatingDescription = "Bad" | "Fair" | "Good";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

interface ExerciseCalculatorArgs {
  target: number;
  stats: number[];
}

const parseExerciseCalculatorArguments = (
  args: string[]
): ExerciseCalculatorArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 10) throw new Error("Too many arguments");

  const [target, ...stats] = process.argv.slice(2);
  const isStatNumbers = stats.every((x) => !isNaN(Number(x)));

  if (!isNaN(Number(target)) && isStatNumbers) {
    return {
      target: Number(target),
      stats: stats.map((x) => Number(x)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (target: number, stats: number[]): Result => {
  const periodLength = stats.length;
  const trainingDays = stats.filter((day) => day !== 0).length;
  const average = stats.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;

  let rating: Rating;

  if (average < target - 1) {
    rating = 1;
  } else if (average >= target - 1 && average < target) {
    rating = 2;
  } else {
    rating = 3;
  }

  let ratingDescription: RatingDescription;

  switch (rating) {
    case 1:
      ratingDescription = "Bad";
      break;
    case 2:
      ratingDescription = "Fair";
      break;
    case 3:
      ratingDescription = "Good";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, stats } = parseExerciseCalculatorArguments(process.argv);
  console.log(calculateExercises(target, stats));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
