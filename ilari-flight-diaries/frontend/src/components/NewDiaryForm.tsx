import { useState } from "react";
import axios, { AxiosError } from "axios";
import diaryService from "../services/diaryService";
import { NewDiary, Diaries, NotificationType } from "../types";

import Notification from "./Notification";

type NewDiaryFormProps = {
  notification: NotificationType | null;
  setNotification: React.Dispatch<
    React.SetStateAction<NotificationType | null>
  >;
  setDiaries: React.Dispatch<React.SetStateAction<Diaries>>;
};
const NewDiaryForm = ({
  notification,
  setNotification,
  setDiaries,
}: NewDiaryFormProps) => {
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
    try {
      const addedDiary = await diaryService.add(newDiary);
      setNotification({
        type: "success",
        content: "Diary added successfully",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      setDiaries((prevDiaries) => [...prevDiaries, addedDiary]);
      setNewDiary({
        date: "",
        weather: "",
        visibility: "",
        comment: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification({
          type: "error",
          content: error.response?.data,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {notification && (
        <Notification type={notification.type} content={notification.content} />
      )}
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
