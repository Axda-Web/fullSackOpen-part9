import { CoursePart } from "../types";
import assertNever from "../utils/assertNever";

type PartProps = {
  coursePart: CoursePart;
};
const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>Project exercises {coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
          <p>Background material: {coursePart.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
          <p>Required skills: {coursePart.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};
export default Part;
