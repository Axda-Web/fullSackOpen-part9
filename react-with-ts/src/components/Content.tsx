import { CoursePart } from "../types";

export type ContentProps = {
  courseParts: CoursePart[];
};
const Content = ({ courseParts }: ContentProps) => {
  const coursePartsView = courseParts.map(({ name, exerciseCount }, index) => (
    <p key={index}>
      {name} {exerciseCount}
    </p>
  ));
  return <div>{coursePartsView}</div>;
};
export default Content;
