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

const calculateExercises = (stats: number[], target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
