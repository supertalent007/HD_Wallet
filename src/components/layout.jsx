import { useState, useEffect, useContext } from 'react'
import { styles } from "../utils/styles"
import Context from "../utils/context"
import Error from "./error"

export default function Layout({ children, title }) {
    const { state, dispatch } = useContext(Context)

    useEffect(() => {
        if (state.error !== '') {
            const timer = setTimeout(() => {
                dispatch({ type: 'SET_ERROR', param: '' })
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [state.error])

    return (
        <div class="w-[400px] my-10 mx-auto border-2 border-gray-400 rounded-lg shadow-lg p-8">
            <div class="text-red-700 font-bold text-xl mb-4">{title}</div>
            {children}
            {state.view !== 'home' && state.view !== 'dashboard' && <div class={styles.link} onClick={() => dispatch({ type: 'SET_VIEW', param: 'home' })}>back home</div>}
            {state.view === 'dashboard' && <div class={styles.link} onClick={() => dispatch({ type: 'EXIT' })}>exit wallet</div>}

            <div class="relative h-8">
                <Error text={state.error} />
            </div>
            {/*<button onClick={()=>dispatch({ type: 'SET_ERROR', param: 'test message' })}>test</button>*/}
        </div>
    )
}