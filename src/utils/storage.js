// localStorage is used for storing wallet data
// CryptoJS is used for encrypting and decrypting wallet data
// temp wallet is used for storing wallet name and addresses
import CryptoJS from "crypto-js"

const tempName = "temp_wallet"

export const encrypt = (text, password) => {
    return CryptoJS.AES.encrypt(text, password).toString()
}

export const decrypt = (text, password) => {
    return CryptoJS.AES.decrypt(text, password).toString(CryptoJS.enc.Utf8)
}

export const encryptObject = (obj, password) => {
    const text = JSON.stringify(obj)
    return encrypt(text, password)
}

export const decryptObject = (text, password) => {
    const obj = decrypt(text, password)
    return JSON.parse(obj)
}

export const encryptObjectToLocalStorage = (obj, password, key) => {
    const text = encryptObject(obj, password)
    localStorage.setItem(key, text)
    setTempWallet(obj)
}

export const decryptObjectFromLocalStorage = (password, key) => {
    const text = localStorage.getItem(key)
    return decryptObject(text, password)
}
// save new or restored wallet
export const saveWallet = async (wallet, password, key) => {
    // all wallet data inc pks
    encryptObjectToLocalStorage(wallet, password, key)
    // only wallet name and addresses
    const tempWallet = {
        name: wallet.name,
        accounts: Object.entries(wallet.accounts).map(([k,a]) => { return { coin: k, address: a.address } })
    }   
    localStorage.setItem(tempName, JSON.stringify(tempWallet))
}

// check and if exists -> set temp wallet
export const checkWallet = (password, key) => {
    try {
        const wallet = decryptObjectFromLocalStorage(password, key)        
        if (wallet) {
            setTempWallet(wallet)
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}

export const setTempWallet = (wallet) => {
    const w = {
        name: wallet.name,
        accounts:Object.entries(wallet.accounts).map(([k,a]) => { return { coin: k, address: a.address } })        
    }    
    localStorage.setItem(tempName, JSON.stringify(w))
}

export const getTempWallet = () => {
    try{
        const wallet = localStorage.getItem(tempName)
        return JSON.parse(wallet)
    }catch(e){
        return null
    }    
}

export const clearTempWallet = () => {
    localStorage.removeItem(tempName)
}