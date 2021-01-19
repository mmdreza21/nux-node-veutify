export const state = () => ({
    products: [],

})
export const getters = {
    getProducts(state) {
        return state.products
    },


}

export const mutations = {
    setProducts(state, product) {
        state.products = product
    },

    addpro(state, products) {
        state.products.push(products)
    },
    setedite(state, prod) {
        const prodIdex = state.products.findIndex(p => p._id === prod._id)
        state.products.splice(prodIdex, 1, prod);
    },
    delet(state, prod) {
        const prodIdex = state.products.findIndex(p => p._id === prod)
        state.products.splice(prodIdex, 1);
    }
}


export const actions = {
    async sendprods({ commit }, product) {
        try {
            const { data } = await this.$axios.post(`/adminp`, product, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            // const { data } = await this.$axios.post(`/adminp`, product)
            // console.log(data);
            commit("addpro", data)
            return Promise.resolve(data)
        } catch (error) {
            console.log("erroeeeeeeeeeee" + error);

            console.log(error.response.data);
        }
    },
    async editeprods({ commit }, product) {

        try {
            await this.$axios.put(`/adminp/${product._id}`, product)
            // console.log(product);
            commit("setedite", product)
        } catch (e) {
            console.log(e);
            console.log(e.response.data);
        }
    },
    async deleteprod({ commit }, product) {
        try {
            const { data } = await this.$axios.delete(`/adminp/${product}`)
            commit("delet", product)
        } catch (e) {

        }
    }


}

