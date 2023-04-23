import axios from "axios";

const API_BASE_URL = "https://cumandra-api.herokuapp.com/create/"

export const baseAPI = axios.create({
    baseURL: "https://random-data-api.com/api/v2",
    headers: {
        'ContentType':
        'application/json',
    },
})

// try {
//     const config = {header: {"Content-Type": "multipart/form-data"}}
//     await axios.post("https://cumandra-api.herokuapp.com/create/", formData, config);
//     setArticle(formData)
// } catch (error) {
//     error?.message && setError("Unable to create article");
// } finally {
//     setLoading(false);
// }