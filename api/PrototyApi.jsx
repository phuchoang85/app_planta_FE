import AxiosInstance from "../src/helper/AxiosInstance"

export default PrototyApi = {
    getPrototyWithId: async (data) =>{
        try {
            const result = await AxiosInstance().get(`/getAllprototyWithID/${data.id}?limit=${data.limit}&page=${data.page}`, null);
            return result
        } catch (error) {
            const response = error.response
            return response.data
        }
    }
}