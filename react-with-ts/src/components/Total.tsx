import { CoursePart } from "../types";

type TotalProps = {
  courseParts: CoursePart[];
};
const Total = ({ courseParts }: TotalProps) => {
  const totalEx = courseParts.reduce(
    (total, { exerciseCount }) => total + exerciseCount,
    0
  );
  return <div>Number of exercises {totalEx}</div>;
};
export default Total;
