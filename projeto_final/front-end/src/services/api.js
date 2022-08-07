import client from "./clientService"


const Api = {
    async getProducts(){
        const response = await client.get("/products")
        return response.data;
    }
}

export default Api;