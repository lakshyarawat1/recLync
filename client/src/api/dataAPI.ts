import axios from "axios";


export const getGamesData = async () => {
    const response = await axios.get("/games");

    
    const data = response.data.data;
    console.log(data);


    const fetchedData = data.map((game : Array<string>) => {
        return {
              id: game[0],
            name: game[1],
            released: game[2],
            requiredAge: game[3], 
            price: game[4],
            description: game[5],
            supportedLanguages: game[6],
            reviews: game[7],
            image: game[8],
            website: game[9],
            supportURL: game[10],
            supportEmail: game[11],
            windows: game[12],
            mac: game[13],
            linux: game[14],
            positive: game[15],
            negative: game[16],
            developers: game[17],
            publishers: game[18],
            categories: game[19],
            genres: game[20],
            tags: game[21],
            screenshots: game[22],
            movies: game[23],
        }
    })


    return fetchedData;
    
}
    
export const setPreferences = async (tags: string) => { 
    const response = await axios.post("/set-preferences", {preferences : tags, token : sessionStorage.getItem("token")});
    return response.data;
}