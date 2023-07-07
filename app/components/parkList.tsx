'use client'

import { useState } from "react";
import { ParkData } from "../(pages)/explore/parkDataInterface";
import ParkElement from "./parkElement";
import styles from "../(pages)/page.module.css"

interface Props {
    parkData: ParkData[]
}
const ENV_LIMIT: number = Number.parseInt(process.env.EXPLORE_LIST_LIMIT || '20');

export default function ParkList(props: Props) {
    const [limit, setLimit] = useState(ENV_LIMIT);
    const { parkData } = props;
    return (
        <>
            {parkData.slice(0, limit).map((pd: ParkData, index: number) => {
                return <ParkElement key={pd.id} parkData={pd} />
            })}
            <h2>end</h2>
            <button className={styles.loadMore} onClick={() => setLimit(limit + ENV_LIMIT)}>Load More</button>
        </>
    )
}