
import { Fragment, useEffect, useRef, useState } from "react";
type MerchandiseSearchParams = {
    [key: string]: string;
};

export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <>
        
        </>
    )
}