
import Layout from "./components/layout"
import { useReducer } from "preact/hooks"
import Context from "./utils/context"
import { initState, reducer } from "./utils/reducer"
import { pages } from "./components/pages"

export function App() {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <Context.Provider value={{ state, dispatch }}>
            <Layout title="Welcome to HD Wallet!">
                {pages[state.view]}
            </Layout>
        </Context.Provider>)
}
