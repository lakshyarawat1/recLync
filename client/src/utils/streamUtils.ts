export const fetchDataFromArray = (data :Array<string>) => {
    const response = {
        name: data[1],
        released: data[2],
        requiredAge: data[5],
        price: data[6],
        description: data[8],
        supportedLanguages: data[9],
        reviews: data[11],
        image: data[12],
        website: data[13],
        supportURL: data[14],
        supportEmail: data[15],
        windows: data[16],
        mac: data[17],
        linux: data[18],
        positive: data[22],
        negative: data[23],
        notes: data[27],
        developers: data[32],
        publishers: data[33],
        categories: data[34],
        genres: data[35],
        tags: data[36],
        screenshots: data[37],
        movies: data[38],
    }
    return response;
}

export const getTags = (tags: string) => {
    return tags.split(",");
}