import { CoursePart } from "../types";
import Part from "./Part";

export type ContentProps = {
  courseParts: CoursePart[];
};
const Content = ({ courseParts }: ContentProps) => {
  const coursePartsView = courseParts.map((coursePart, index) => (
    <Part key={index} coursePart={coursePart} />
  ));
  return <div>{coursePartsView}</div>;
};
export default Content;
