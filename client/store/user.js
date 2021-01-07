export const state = () => ({
    user: {}

})
export const getters = {


}

export const mutations = {

}


export const actions = {
    async submit({ commit }, user) {
        try {
            const { data } = await this.$axios.post("/user", user)
            console.log(data);

        } catch (e) {
            console.log(e);

        }
    }


}

