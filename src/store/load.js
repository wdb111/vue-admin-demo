// import Cookies from 'js-cookie'
// 用户信息
const load = {
    state: {
        token: localStorage.getItem("token") || '',
        userList: JSON.parse(localStorage.getItem("userList")) || {}
    },
    getters: {

    },
    mutations: {
        // addToken(state, src) {
        //     if (src.checked) {
        //         Cookies.set('token', src.token, {
        //             expires: 7
        //         })
        //     } else {
        //         Cookies.set('token', src.token)
        //     }
        // },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token)
        },
        removeToken(state) {
            state.token = ''
            // Cookies.remove('token')
            localStorage.removeItem("token")
        },
        setUser(state, src) {
            state.userList = src;
            localStorage.setItem("userList", JSON.stringify(src))
        }
    },
    actions: {

    }
}
export default load;