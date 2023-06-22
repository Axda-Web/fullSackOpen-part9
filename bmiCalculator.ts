interface BimCalculatorArgs {
  parsedHeight: number;
  parsedWeight: number;
}

export const parseBimCalculatorArguments = (
  height: string,
  weight: string
): BimCalculatorArgs => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      parsedHeight: Number(height),
      parsedWeight: Number(weight),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Overweight";
  return "Obese";
};
