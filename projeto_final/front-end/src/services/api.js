import client from "./clientService"


const Api = {

    async login(data){
        const response = await client.post("/login", data)
        return response.data;
    },

    //usado para criar colaboratores e fazer cadastro
    async signup(data){
        const response = await client.post("/users", data)
        return response.data;
    },


    async getUser (id){
        const response = await client.get(`/users/${id}/`)
        return response.data;
    },

    async deleteUser(id){
        const response = await client.delete(`/users/${id}/`)
        return response.data;
    },
  
  

    async getCollaboratos (id){
        const response = await client.get(`/users/${id}/collaborators`)
        return response.data;
    },

    async getProducts(){
        const response = await client.get("/products")
        return response.data;
    },

    async getProductById(id){
        const response = await client.get(`/products/${id}`)
        return response.data;
    },

    async createProdut(data){
        const response = await client.post("/products/", data)
        return response.data;
    },

    async updateProdut(data, id){
        const response = await client.put(`/products/${id}`, data)
        return response.data;
    },

    async deleteProdut(id){
        const response = await client.delete(`/products/${id}`)
        console.log({response}, "responmse");
    }
}

export default Api;