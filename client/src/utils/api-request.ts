import axios from "axios"

export const apiRequest = async (
    action: string,
    body: object = {},
    type: string = "POST",
    url: string = "http://localhost:3050", // TODO: process.env
    ) => {
try {
    const urlAction= `${url}/${action}`
    switch (type) {
        case "GET":
            const axiosGetResponse = await axios.get(urlAction)
            return axiosGetResponse
        
        case "POST":
            const axiosPostResponse = await axios.post(
                urlAction,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            )
            return axiosPostResponse
    
        default:
            break;
    }
} catch (error: unknown) {
    console.error(`Error with axios request to ${url} - ${error}`)
    return error
}    
    
}