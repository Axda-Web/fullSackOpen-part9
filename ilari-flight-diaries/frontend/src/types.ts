export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface Diary {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;

export type Diaries = Diary[];

export interface NotificationType {
  content: string;
  type: string;
}
