import AxiosInstance from "../src/helper/AxiosInstance"

export default OrderApi = {
    addOrder: async(body) =>{
        try {
            const result = await AxiosInstance().post(`/addorder`, body);
            return result;

        } catch (error) {   
            const response = error.response
            return response.data
        }
    },
    getOrder: async(body) =>{
        try {
            const result = await AxiosInstance().get(`/getOrder?id=${body.id}&limit=${body.limit}&page=${body.page}`, null);
            return result;
        } catch (error) {   
            const response = error.response
            return response.data
        }
    }
}