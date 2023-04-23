import axios from "axios";

export const baseAPI = axios.create({
    // baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    baseURL: "https://random-data-api.com/api/v2",
    headers: {
        'ContentType': 'application/json',
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