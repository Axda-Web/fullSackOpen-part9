import { useState } from "react";
import diaryService from "../services/diaryService";
import { NewDiary, Diaries } from "../types";

type NewDiaryFormProps = {
  setDiaries: React.Dispatch<React.SetStateAction<Diaries>>;
};
const NewDiaryForm = ({ setDiaries }: NewDiaryFormProps) => {
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary((prevNewDiary) => {
      return {
        ...prevNewDiary,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const addedDiary = await diaryService.add(newDiary);
    setDiaries((prevDiaries) => [...prevDiaries, addedDiary]);
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            name="date"
            value={newDiary.date}
            onChange={handleChange}
            id="date"
            type="date"
          />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <input
            name="weather"
            value={newDiary.weather}
            onChange={handleChange}
            id="weather"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <input
            name="visibility"
            value={newDiary.visibility}
            onChange={handleChange}
            id="visibility"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            name="comment"
            value={newDiary.comment}
            onChange={handleChange}
            id="comment"
            type="text"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default NewDiaryForm;
