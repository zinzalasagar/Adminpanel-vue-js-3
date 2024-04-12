export default {
    namespaced: true,
    state: {
        data: "hello",
    },
    getters: {
        data: state => state.data,
    },
    actions: {
        async getData({commit }) {
            const data = await fetch('http://api.icndb.com/jokes/random/15');
            commit('SET_DATA', await data.json());
        },
    },
    mutations: {
        SET_DATA(state, data) {
            state.data = data;
        },
    }
}