import axios from "axios";


export const getGamesData = async () => {
    const response = await axios.get("/games");

    
    const data = response.data.data;


    const fetchedData = data.map((game : Array<string>) => {
        return {
            
            id : game[0],
            name: game[1],
            released: game[2],
            requiredAge: game[5],
            price: game[6],
            description: game[8],
            supportedLanguages: game[9],
            reviews: game[11],
            image: game[12],
            website: game[13],
            supportURL: game[14],
            supportEmail: game[15],
            windows: game[16],
            mac: game[17],
            linux: game[18],
            positive: game[22],
            negative: game[23],
            developers: game[32],
            publishers: game[33],
            categories: game[34],
            genres: game[35],
            tags: game[36],
            screenshots: game[37],
            movies: game[38],
        }
    })

    return fetchedData;
    
}
    
export const setPreferences = async (tags: Array<string>) => { 
    const response = await axios.post("/set-preferences", {preferences : tags, token : sessionStorage.getItem("token")});
    return response.data;
}