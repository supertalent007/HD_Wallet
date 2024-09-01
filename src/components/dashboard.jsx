import { useContext, useEffect } from "preact/hooks"
import Context from "../utils/context"
import * as storage from "../utils/storage"
import { styles } from "../utils/styles"
export default function Dashboard() {
    const { state, dispatch } = useContext(Context)
    useEffect(() => {
        const w = storage.getTempWallet()
        if(w) {
            dispatch({type:'SET_WALLET',param:w})
        }else{
            dispatch({type:'SET_VIEW',param:'home'})
        }
    }, [])
    return (
        <>
            <div class={styles.subTitle}>Dashboard</div>
            <div class="pb-4">
            {
                 state.wallet && state.wallet.accounts.map((a,i)=>{
                    return (
                        <div class={"flex justify-left gap-2 pt-2 pb-1 border-b-2 border-gray-300 " + (i===0 ? 'border-t-2 border-gray-300' : '')}>
                            <div class="font-bold">{a.coin}:</div>
                            <div class="truncate">{a.address}</div>
                        </div>
                    )
                 }) 
            }    
            </div>       
        </>
    )
}