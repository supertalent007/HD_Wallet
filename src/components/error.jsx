import { useState, useEffect } from "preact/hooks"

export default function Error({ text }) {
    return (<>
        <div class="absolute text-red-600">{text}</div>
    </>

    )
}