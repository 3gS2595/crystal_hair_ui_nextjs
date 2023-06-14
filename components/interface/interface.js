import React, { Suspense } from "react"
import Side from "./side";
import Threejs from "./threejs";
import { atom, useAtom } from 'jotai'
import { filt, tabi } from "../../pages/_app";
export  function  Controls (i)  {
	// setCount === update: (draft: Draft<Value>) => void
	const [, setTabIndex] = useAtom(tabi)
	const increment = (i) => setTabIndex((c) => (c = i))
}	

export default function Interface() {
    return (
        <>
            <div id="interface">
                <div id="split">
                    <Side />
                </div>
                <div id="root">
                    <Threejs />
				</div>
            </div>
        </>
    )
} 
