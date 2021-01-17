export const state = () => ({
    users: {}

})
export const getters = {
    getUser(state) {
        return state.user
    }

}


export const mutations = {
    setUser(state, edit) {
        state.users = edit
    },
    editeUser(state, edit) {
        state.users = edit
    }
}


export const actions = {
    async submit({ commit }, user) {
        try {
            const { data } = await this.$axios.post("/user", user)
            console.log(data);
            return Promise.resolve(data)
        } catch (e) {
            return Promise.reject(e)

        }
    },
    async edite({ commit }, user) {
        try {
            const { data } = await this.$axios.put(`/user/${user._id}`, user)
            commit("editeUser", data)

        } catch (e) {
            console.log(e);
            console.log(e.response.data);

        }
    },

    async getbyID({ commit }) {
        try {
            const { data } = await this.$axios.get(`/user/${this.$auth.user._id}`)

            commit('setUser', data)
        } catch (e) {
            console.log(e)
        }
    },

}

