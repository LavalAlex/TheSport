// User
export interface IUser {
  _id?: string;
  email: string;
  avatar?: string;
  password?: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserRegister {
  email: string;
  password: string;
  avatar?: string;
}
export interface IUserReducer {
  type: unknown;
  payload: IUser;
}
export interface IUserAuth {
  email: string;
  uId: string;
}

export interface ICard{
  idSport:string;
  name:string;
  description: string;
  image:string;
  favorite?: boolean;
}

export interface ICardHome{
  imageSource:string;
  title:string;
  description:string;
  id?:string
  favorite?:boolean
};

export interface CardComponent{
  strSportThumb?:string;
  strSport?:string;
  strSportDescription?:string;
  idSport?:string;
  favorite? : boolean
}

export interface Index{
  index:number
}

