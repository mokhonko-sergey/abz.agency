export default {
    state: {
        token: null,
        response: {},
    },
    mutations: {
        setResponse (state, obj) {
            state.response = obj;
        },
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {
        //getting token
        async getToken({ commit }) {
            const tkn = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token').then(res => res.json());
            if (tkn.success) {
                commit('setToken', tkn.token);
                localStorage.setItem('user-token', tkn.token);
            } else {
                localStorage.removeItem('user-token');
                console.log("Can't get token from server!");
            }
        },

        //register user
        async registerUser({commit, getters }, data) {

            await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
                method: "POST",
                body: data,
                headers: {
                    Token: getters.getToken
                }
            }).then(function (response) {
                return response.json();
            })
                .then(function (data) {
                    commit('setResponse', data);
                })
                .catch(() => {
                    commit('setResponse', {
                        success: false,
                        message: "Something gone wrong!"
                    })
                });
        }
    },
    getters: {
        getToken: state => state.token,
        getResponse: state => state.response

    }
}