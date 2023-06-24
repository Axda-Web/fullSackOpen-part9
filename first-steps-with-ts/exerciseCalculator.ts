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
  parsedDailyExercices: number[];
  parsedTarget: number;
}

export const parseExerciseCalculatorArguments = (
  daily_exercises: number[],
  target: number
): ExerciseCalculatorArgs => {
  const isDailyExNumbers = daily_exercises.every((x) => !isNaN(Number(x)));
  const isDailyExValidLength =
    daily_exercises.length > 0 && daily_exercises.length <= 7;

  if (!isNaN(Number(target)) && isDailyExNumbers && isDailyExValidLength) {
    return {
      parsedDailyExercices: daily_exercises,
      parsedTarget: target,
    };
  } else {
    throw new Error("malformated parameters");
  }
};

export const calculateExercises = ({
  parsedDailyExercices,
  parsedTarget,
}: ExerciseCalculatorArgs): Result => {
  const periodLength = parsedDailyExercices.length;
  const trainingDays = parsedDailyExercices.filter((day) => day !== 0).length;
  const average = parsedDailyExercices.reduce((a, b) => a + b) / periodLength;
  const success = average >= parsedTarget;

  let rating: Rating;

  if (average < parsedTarget - 1) {
    rating = 1;
  } else if (average >= parsedTarget - 1 && average < parsedTarget) {
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
    target: parsedTarget,
    average,
  };
};
