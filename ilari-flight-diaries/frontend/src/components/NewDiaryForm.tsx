import { useState } from "react";
import axios from "axios";
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
            required
            name="date"
            value={newDiary.date}
            onChange={handleChange}
            id="date"
            type="date"
          />
        </div>
        <div>
          <span style={{ marginRight: 10 }}>Visibility</span>
          <label htmlFor="great">great</label>
          <input
            required
            checked
            type="radio"
            name="visibility"
            value="great"
            onChange={handleChange}
            id="great"
          />
          <label htmlFor="good">good</label>
          <input
            required
            type="radio"
            name="visibility"
            value="good"
            onChange={handleChange}
            id="good"
          />
          <label htmlFor="ok">ok</label>
          <input
            required
            type="radio"
            name="visibility"
            value="ok"
            onChange={handleChange}
            id="ok"
          />
          <label htmlFor="poor">poor</label>
          <input
            required
            type="radio"
            name="visibility"
            value="poor"
            onChange={handleChange}
            id="poor"
          />
        </div>
        <div>
          <span style={{ marginRight: 10 }}>Weather</span>
          <label htmlFor="sunny">sunny</label>
          <input
            required
            checked
            name="weather"
            value="sunny"
            onChange={handleChange}
            id="sunny"
            type="radio"
          />
          <label htmlFor="rainy">rainy</label>
          <input
            required
            name="weather"
            value="rainy"
            onChange={handleChange}
            id="rainy"
            type="radio"
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            required
            name="weather"
            value="cloudy"
            onChange={handleChange}
            id="cloudy"
            type="radio"
          />
          <label htmlFor="stormy">stormy</label>
          <input
            required
            name="weather"
            value="stormy"
            onChange={handleChange}
            id="stormy"
            type="radio"
          />
          <label htmlFor="windy">windy</label>
          <input
            required
            name="weather"
            value="windy"
            onChange={handleChange}
            id="windy"
            type="radio"
          />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            required
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
