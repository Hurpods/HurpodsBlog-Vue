export const userStatus = (state, userName) => {
    if (userName) {
        state.currentUser = userName
        state.isLogin = true
    } else if (userName == null) {
        localStorage.setItem('userName', null);
        localStorage.setItem('token', '');
        localStorage.setItem('userAvatar', null);
        state.currentUser = null;
        state.isLogin = false;
        state.token = '';
        state.userAvatar = null;
    }
}

export const setUserAvatar = (state, imgUrl) => {
    state.userAvatar = imgUrl;
}

export const setUserToken = (state, token) => {
    state.token = token;
}