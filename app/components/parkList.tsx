'use client'

import { useState } from "react";
import { ParkData } from "../explore/parkDataInterface";
import ParkElement from "./parkElement";

interface Props {
    parkData: ParkData[]
}
export default function ParkList(props: Props) {
    const [limit, setLimit] = useState(20);
    const { parkData } = props;
    return (
        <>
            {parkData.slice(0, limit).map((pd: ParkData, index: number) => {
                return <ParkElement key={pd.id} parkData={pd} />
            })}
            <h2>end</h2>
            <button onClick={() => setLimit(limit + 20)}>Load More</button>
        </>
    )
}