export interface fireConfig {
  apiKey: String;
  authDomain: String;
  projectId: String;
  storageBucket: String;
  messagingSenderId: String;
  appId: String;
  measurementId: String;
}

export interface homeFavorite {
  strSportThumb?: string;
  strSport?: string;
  strSportDescription?: string;
  id?: string;
  idSport:string;
  favorite?: boolean;
  data(): {
    strSportThumb?: string;
    strSport?: string;
    strSportDescription?: string;
    idSport?: string;
    favorite?: boolean;
  };
}
