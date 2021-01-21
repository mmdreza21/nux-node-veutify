export const state = () => ({})


export const actions = {
    async nuxtServerInit({ commit }, context) {

        try {
            const products = await context.app.$axios.$get(`/adminP/${context.$auth.$state.user._id}`)
            commit('admin/setProducts', products)
            const cat = await context.app.$axios.$get("/cat")
            commit('product/setCat', cat)

        } catch (error) { console.log(error) }
        // 
    }
}