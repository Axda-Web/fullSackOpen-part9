import { Diaries, Diary } from "../types";

type DiariesListProps = {
  diaries: Diaries;
};
const DiariesList = ({ diaries }: DiariesListProps) => {
  const diariesView = diaries.map((diary: Diary) => (
    <div key={diary.id}>
      <h3>{diary.date}</h3>
      <p>Visibility: {diary.visibility}</p>
      <p>Weather: {diary.weather}</p>
    </div>
  ));
  return (
    <div>
      <h1>Diary entries</h1>
      <div>{diariesView}</div>
    </div>
  );
};
export default DiariesList;
