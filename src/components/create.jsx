import { CreateWallet, CreateMnemonic } from "../utils/lib"
import { styles } from "../utils/styles"
import { useRef,useEffect, useContext } from "preact/hooks"
import * as storage from "../utils/storage"
import Context from "../utils/context"

export default function Create() {
    const { state, dispatch } = useContext(Context)
    const nameRef = useRef()
    const passwordRef = useRef()
    const confirmRef = useRef()

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== confirmRef.current.value) {        
            dispatch({type:'SET_ERROR',param:'passwords do not match'})            
            return
        } else {
            // todo: create 1 mnemonic for all coin accounts
            const mnemonic = await CreateMnemonic()
            // ...
            const wBTC = await CreateWallet("BTC", mnemonic)
            const wETH = await CreateWallet("ETH", mnemonic)
            const wallet = {
                mnemonic,
                name: nameRef.current.value,
                accounts: {
                    "BTC": wBTC,
                    "ETH": wETH
                }
            }
            console.log(wallet)
            // encrypt wallet (SHA256) and save to localStorage
            storage.encryptObjectToLocalStorage(wallet, passwordRef.current.value, nameRef.current.value)            
            dispatch({ type: 'SET_VIEW', param: 'dashboard' })
        }       
    }

    return (
        <>
            <div>
                <div class={styles.subTitle}>Create new wallet</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class={styles.label}>Wallet name</div>
                        <div><input type="text" class={styles.textInput} required ref={nameRef} /></div>
                        <div class={styles.label}>Password</div>
                        <div><input type="password" class={styles.textInput} required ref={passwordRef} /></div>
                        <div class={styles.label}>Confirm password</div>
                        <div><input type="password" class={styles.textInput} required ref={confirmRef} /></div>
                        <div class="mt-4 mb-2">
                            <button type="submit" class={styles.button}>Create wallet</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}