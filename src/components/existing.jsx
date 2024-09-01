import { styles } from "../utils/styles"
import { useRef, useState, useContext, useEffect } from "preact/hooks"
import * as storage from "../utils/storage"
import Context from "../utils/context"

export default function Existing() {
    const { state, dispatch } = useContext(Context)
    const nameRef = useRef()
    const passwordRef = useRef()
    const [wallet, setWallet] = useState(null)

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (storage.checkWallet(passwordRef.current.value, nameRef.current.value)) {
            dispatch({ type: 'SET_VIEW', param: 'dashboard' })            
        } else {
            dispatch({type:'SET_ERROR',param:'no wallet with these credentials'})           
        }

    }
    return (
        <>
            <div>
                <div class={styles.subTitle}>Enter existing wallet</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class={styles.label}>Wallet name</div>
                        <div><input type="text" class={styles.textInput} required ref={nameRef} /></div>
                        <div class={styles.label}>Password</div>
                        <div><input type="password" class={styles.textInput} required ref={passwordRef} /></div>
                        <div class="mt-4 mb-2">
                            <button type="submit" class={styles.button}>Open wallet</button>
                        </div>
                    </form>
                </div>
            </div>
            {/*temp for wallet content*/}
            {wallet && <div>
                <pre>{JSON.stringify(wallet, null, 4)}</pre>
            </div>}
        </>
    )
}
