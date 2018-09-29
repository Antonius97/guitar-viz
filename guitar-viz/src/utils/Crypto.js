import Crypto from 'crypto-js';
import Salts from './CryptoSalts';
import dict from '../dict';

const saltStorage = {};

function padstart(len, w, c = "0") {
    w = "" + w;
    while (w.length < len) w = c + w;
    return w;
}

const enc = s => s.split("")
    .map(c => padstart(2, c.charCodeAt(0), "c"))
    .join("")
    .split("")
    .map(a => String.fromCharCode(+a + 65))
    .join("");

function getSalt(saltName) {
    if (!saltName) return saltStorage[dict.DEFAULT];
    let salt = saltStorage[saltName];
    if (!salt) throw "Wrong salt name provided";
    return salt;
}

const CRYPTOOBJ = {
    setSalt(name, salt) {
        saltStorage[name] = enc(salt);
    },
    encode(text, saltName) {
        if (saltName === dict.PASS) return CRYPTOOBJ.hash(text, saltName);
        return Crypto.AES.encrypt("" + text, getSalt(saltName)).toString();
    },
    decode(token, saltName) {
        return Crypto.AES.decrypt(token, getSalt(saltName)).toString(Crypto.enc.Utf8);
    },
    hash(text, saltName) {
        return Crypto.enc.Base64.stringify(Crypto.SHA256(text + getSalt(saltName)));
    }
};

Object.keys(Salts).forEach(k => CRYPTOOBJ.setSalt(k, Salts[k]));

export default CRYPTOOBJ;