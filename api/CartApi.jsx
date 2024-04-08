import AxiosInstance from "../src/helper/AxiosInstance"

export default CartApi = {
    updateCart: async (id, body) => {
        console.log(body)
        try {
            const result = await AxiosInstance().put('/updatecart/' + id, body);
            return result;
        } catch (error) {
            const response = error.response;
            return response.data
        }
    },
    addCart: async (id, body) => {
        try {
            const result = await AxiosInstance().put('/addCart/' + id, body);
            return result;
        } catch (error) {
            const response = error.response;
            return response.data
        }
    },
    getCart: async (id) => {
        try {
            const result = await AxiosInstance().get('/getCart/' + id, null);
            return result;
        } catch (error) {
            const response = error.response;
            return response.data
        }
    }, deleteCart: async (body) => {
        try {
            const result = await AxiosInstance().post('/deleteproductinCart', body);
            return result;
        } catch (error) {
            const response = error.response;
            return response.data
        }
    }, deleteAllCart: async (id) =>{
        try {
            const result = await AxiosInstance().delete('/deleteAllcart/'+id, null);
            return result;
        } catch (error) {
            const response = error.response;
            return response.data
        }
    },
    deleteproducthavecheckCart : async (id) => {
        try {
            const result = await AxiosInstance().delete('/deleteProductHaveCheckcart/'+id, null);
            return result;
        } catch (error) {
            const response = error.response;
            return response.data
        }
    }
}