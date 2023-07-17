'use client'

import { useState } from "react";
import { ParkData } from "../_data/parkDataInterface";
import ParkElement from "./parkElement";
import styles from "../(pages)/page.module.css"
import FilterBar from "./filters/filterBar";
import { Activity } from "../_data/activitiesDataInterface";

interface P extends Props {
    parkData: ParkData[],
    activityData: Activity[]
}

const ENV_LIMIT: number = Number.parseInt(process.env.EXPLORE_LIST_LIMIT || '20');

export default function ParkList(props: P) {
    const { parkData, activityData } = props;
    const [limit, setLimit] = useState(ENV_LIMIT); //todo reset this if filters change

    return (
        <>
            <FilterBar activityData={activityData}/>
            {parkData.stateFilterFunction()
                .typeFilterFunction()
                .activityFilterFunction()
                .slice(0, limit)
                .map((pd: ParkData, index: number) => {
                    return <ParkElement key={pd.id} parkData={pd} />
                })}
            <h2>end</h2>
            <button className={styles.loadMore} onClick={() => setLimit(limit + ENV_LIMIT)}>Load More</button>
        </>
    )
}