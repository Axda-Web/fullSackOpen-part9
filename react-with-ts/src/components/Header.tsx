type HeaderProps = {
  courseName: string;
};
const Total = ({ courseName }: HeaderProps) => {
  return <h1>{courseName}</h1>;
};
export default Total;
