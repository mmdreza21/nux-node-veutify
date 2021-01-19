export const state = () => ({})


export const actions = {
    async nuxtServerInit({ commit }, context) {
        try {
            const products = await context.app.$axios.$get("/prods")
            commit('product/setProducts', products)
            commit('admin/setProducts', products)
            const cat = await context.app.$axios.$get("/cat")
            commit('product/setCat', cat)




        } catch (error) { console.log(error) }

    }
}