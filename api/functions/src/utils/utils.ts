import axios from "axios";
import { homeFavorite } from "../Interfaces/interfaces";


const loadDB = async (db:any) => {
  const response = await axios.get(
    "https://www.thesportsdb.com/api/v1/json/2/all_sports.php"
  );
  const data = response.data.sports;
  data.map(async function(e:homeFavorite){
    await db
    .collection("favorite")
    .doc("/" + e.idSport + "/")
    .create({ strSport: e.strSport, strSportThumb: e.strSportThumb, strSportDescription:e.strSportDescription, favorite:false});
  })
  return 'Load successfully'
  
};

module.exports = {
  loadDB,
};
