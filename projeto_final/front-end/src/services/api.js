import client from "./clientService"


const Api = {

    async login(data) {
        const response = await client.post("/login", data)
        return response.data;
    },


    async logout(data) {
        const response = await client.post("/logout", data)
        return response.data;
    },


    //usado para criar colaboratores e fazer cadastro
    async signup(data) {
        const response = await client.post("/users", data)
        return response.data;
    },


    async getUser(id) {
        const response = await client.get(`/users/${id}/`)
        return response.data;
    },

    async deleteUser(id) {
        const response = await client.delete(`/users/${id}/`)
        return response.data;
    },



    async createAddress(id, data) {
        const response = await client.post(`/users/${id}/address`, { data, usuarioID: id })
        return response.data;
    },



    async getCollaboratos(id) {
        const response = await client.get(`/users/${id}/collaborators`)
        return response.data;
    },

    async getProducts() {
        const response = await client.get("/products")
        return response.data;
    },

    async getProductById(id) {
        const response = await client.get(`/products/${id}`)
        return response.data;
    },

    async createProdut(data) {
        const response = await client.post("/products/", data)
        return response.data;
    },

    async uploadImage(v) {
        const response = await client({
            method: 'POST',
            url: "/products/upload",
            headers: { 'content-type': 'multipart/form-data' },
            data: v
          });

        return response.data;
    },


    async updateProdut(data, id) {
        const response = await client.put(`/products/${id}`, data)
        return response.data;
    },

    async deleteProdut(id) {
        const response = await client.delete(`/products/${id}`)
        return response;
    },

    async createOrder(id, data) {
        const response = await client.post(`/users/${id}/orders`, data)
        return response;
    }
}

export default Api;