import axios from "axios";


const loadDB = async (db:any) => {
  const response = await axios.get(
    "https://www.thesportsdb.com/api/v1/json/2/all_sports.php"
  );
  const data = response.data.sports;
  data.map(async function(e:any){
    await db
    .collection("favorite")
    .doc("/" + e.idSport + "/")
    .create({ name: e.strSport, image: e.strSportThumb, description:e.strSportDescription});
  })
  return 'Load successfully'
  
};

module.exports = {
  loadDB,
};
