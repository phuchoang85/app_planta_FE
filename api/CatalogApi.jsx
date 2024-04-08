import AxiosInstance from "../src/helper/AxiosInstance"


export default CatalogApi = {
    getOneCatalog: async (data) =>{
        try {
            const result = await AxiosInstance().get(`/getcatalog/${data.id}?limit=${data.limit}&page=${data.page}`, null);
            return result;

        } catch (error) {   
            const response = error.response
            return response.data
        }
    },
    getNewCatalog: async (data) =>{
        try {
            const result = await AxiosInstance().get(`/getnewcatalog/${data.id}?limit=${data.limit}&page=${data.page}`, null);
            return result;
        } catch (error) {
            const response = error.response
            return response.data
        } 
    }
}