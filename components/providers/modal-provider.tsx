"use client";

import CardModal from "@/components/modals/card-modal";
import { useEffect, useState } from "react";

function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <CardModal />
        </>
    );
}

export default ModalProvider;
