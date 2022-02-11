export interface fireConfig {
  apiKey: String;
  authDomain: String;
  projectId: String;
  storageBucket: String;
  messagingSenderId: String;
  appId: String;
  measurementId: String;
}

export interface userFavorite {
  id: string,
  name: string,
  image: string,
  favorite: boolean
}