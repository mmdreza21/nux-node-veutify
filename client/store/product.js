export const state = () => ({
    products: [],
    category: []
})
export const getters = {
    getProducts(state) {
        return state.products
    },
    getCat(state) {
        return state.category
    },

}

export const mutations = {
    setProducts(state, product) {
        state.products = product
    },
    setCat(state, category) {
        state.category = category
    },



}

export const actions = {
    async search({ commit }, search) {
        try {

            const { data } = await this.$axios.get(`/prods/sea?q=${search}`)
            commit("setProducts", data)
            Promise.resolve()
        } catch (e) {
            Promise.reject(e)
            console.log(e)
        }
    },
    async getcat({ commit }) {
        try {
            const { data } = await this.$axios.get("/cat")
            commit('setCat', data)
        } catch (e) {
            console.log(e);
        }
    }

}



