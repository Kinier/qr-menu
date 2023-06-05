import AppHeader from "./header/AppHeader"
import { useRef, useState } from "react";
import {SlidingBlock} from "./SlidingBlock";
export default function Layout() {
    const [open, setOpen] = useState(false);
    const toggleButtonRef = useRef(null);
    return (
        <>
            <AppHeader setOpen={setOpen} open={open} bref={toggleButtonRef}/>
            <SlidingBlock setOpen={setOpen} open={open} bref={toggleButtonRef}/>
        </>
    )
}