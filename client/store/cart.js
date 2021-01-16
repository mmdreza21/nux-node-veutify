export const state = () => ({
    carts: [],
    orders: []
})
export const getters = {
    getProducts(state) {
        return state.products
    },
    getcart(state) {
        return state.carts
    },
    getorder(state) {
        return state.orders
    },


}

export const mutations = {
    setcart(state, carts) {
        state.carts = carts
    },


    addcart(state, cart) {
        state.carts.product.push(cart)

    },
    delet(state, prod) {
        const prodIdex = state.carts.product.findIndex(p => p._id === prod.productId._id)
        const newprice = state.carts.price - prod.TPrice
        state.carts.price = newprice
        state.carts.product.splice(prodIdex, 1);
    },
    clearCart(state, prod) {
        state.carts.product = []
        const newprice = 0
        state.carts.price = newprice
    },
    setorder(state, order) {
        state.orders = order
    },
    addorder(state, order) {
        state.orders.push(order)
    },

}

export const actions = {
    async addtocart({ commit }, ID) {
        try {
            const { data } = this.$axios.post(`/cart/${ID}`)
            commit('addcart', data)
            return Promise.resolve(data)
        } catch (e) {
            console.log(e);
        }
    },
    async grtprods({ commit }) {
        try {
            const { data } = await this.$axios.get('/cart/get')
            commit("setcart", data)
        } catch (e) {
            console.log(e);
        }
    },
    async deletecart({ commit }, item) {

        try {

            await this.$axios.delete(`/cart/${item.productId._id}`)
            commit('delet', item)

        } catch (e) {
            console.log(e);
        }
    },
    async postorder({ commit }) {
        try {
            const { data } = await this.$axios.post('/order')
            commit('setorder', data)
            commit('clearCart')
        } catch (e) {
            console.log(e);

        }
    },

    async getorder({ commit }) {
        try {
            const { data } = await this.$axios.get('/order')
            commit('setorder', data)
        } catch (e) {
            console.log(e);
        }

    }
}


