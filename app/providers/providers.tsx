"use client";

import { PropsWithChildren, ReactNode } from "react";

interface Props {
    children?: ReactNode
}
export default function Providers({ children }: Props) {


    return (
        <>
            {/* <NextUIProvider>{children}</NextUIProvider> */}
            {children}
        </>
    );
}