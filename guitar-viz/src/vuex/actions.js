import dict from '../dict';
import Crypto from 'crypto-js';

const nameSalt = "SALT!@#";

const usersDB = {
    users: [{ name: "Omiant", pass: Crypto.enc.Base64.stringify(Crypto.SHA256("qwe")) }]
}

export default {
    login({ commit }, creds) {
        commit(dict.LOGIN);
        return new Promise((resolve, reject) => {
            let user = usersDB.users.find(user => creds.name === user.name);
            if (user) {
                if (user.pass === creds.pass) {
                    let token = Crypto.enc.Base64.stringify(Crypto.SHA256(creds.name + nameSalt));
                    localStorage.setItem("token", token);
                    commit(dict.LOGIN_SUCCESS);
                    resolve(dict.SUCCESS);
                } else {
                    commit(dict.LOGIN_FAIL_PASS);
                    reject(dict.INVALID_PASS);
                }
            } else {
                commit(dict.LOGIN_FAIL_NAME);
                reject(dict.INVALID_NAME);
            }
        });
    },
    logout({ commit }) {
        localStorage.removeItem("token");
        commit(dict.LOGOUT);
    }
}
