import AxiosInstance from "../src/helper/AxiosInstance"

export default ProductApi = {
    getProductDetail: async (id) => {
        try {
            const result = await AxiosInstance().get('/getproduct/oneproduct/' + id);
            return result;
        } catch (error) {
            const response = error.response
            return response.data
        }
    },
    getProductWithKey: async (body) =>{
        try {
            const result = await AxiosInstance().get(`/getproduct/timkiem?limit=${body.limit}&page=${body.page}&key=${body.key}` ,null);
            return result;
        } catch (error) {
            const response = error.response
            return response.data
        }
    },
    getProduct: async (body) => {
        try {
            const result = await AxiosInstance().get(`/getplantgrow?limit=${body.limit}&page=${body.page}` ,null);
            return result;
        } catch (error) {
            const response = error.response
            return response.data
        }
    }
}