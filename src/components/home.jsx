import { styles } from "../utils/styles.js"
import { useContext } from "preact/hooks"
import Context from "../utils/context"

export default function Home() {
    const { state, dispatch } = useContext(Context)
    return (<div class="ml-8">
        <div class={styles.link} onClick={() => dispatch({type: 'SET_VIEW',param:'existing'})}>Open existing wallet</div>
        <div class={styles.link} onClick={() => dispatch({type: 'SET_VIEW',param:'create'})}>Create new wallet</div>
        <div class={styles.link} onClick={() => dispatch({type: 'SET_VIEW',param:'restore'})}>Import wallet by mnemonic phrase</div>
    </div>)
}