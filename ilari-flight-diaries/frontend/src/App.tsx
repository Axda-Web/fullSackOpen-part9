import React, { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import { Diaries } from "./types";

import DiariesList from "./components/DiariesList";

function App() {
  const [diaries, setDiaries] = useState<Diaries>([]);
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
      <DiariesList diaries={diaries} />
    </>
  );
}

export default App;
