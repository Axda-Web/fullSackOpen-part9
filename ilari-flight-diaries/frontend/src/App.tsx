import React, { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import { Diaries, NotificationType } from "./types";

import DiariesList from "./components/DiariesList";
import NewDiaryForm from "./components/NewDiaryForm";

function App() {
  const [diaries, setDiaries] = useState<Diaries>([]);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  useEffect(() => {
    const abortController = new AbortController();
    diaryService.getAll(abortController.signal).then((data) => {
      setDiaries(data);
    });
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <NewDiaryForm
        setDiaries={setDiaries}
        notification={notification}
        setNotification={setNotification}
      />
      <DiariesList diaries={diaries} />
    </>
  );
}

export default App;
