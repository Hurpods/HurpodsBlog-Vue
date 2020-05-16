export const setUser = ({commit}, userName) => {
    commit('userStatus', userName);
}

export const setAvatar = ({commit}, imgUrl) => {
    commit('setUserAvatar', imgUrl);
}

export const setToken = ({commit}, token) => {
    commit('setUserToken', token);
}