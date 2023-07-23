'use client'

import { useState } from "react";
import { ParkData } from "../_data/parkDataInterface";
import ParkElement from "./parkElement";
import styles from "./parkList.module.css"
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

    const filteredParks = parkData.stateFilterFunction()
    .typeFilterFunction()
    .activityFilterFunction();

    return (
        <>
            <FilterBar activityData={activityData}/>
            {filteredParks.slice(0, limit).map((pd: ParkData, index: number) => {
                    return <ParkElement key={pd.id} parkData={pd} />
                })}
            <h2>Showing {Math.min(filteredParks.length, limit)} / {filteredParks.length} results</h2>
            <button className={styles.showMore} onClick={() => setLimit(limit + ENV_LIMIT)}>Show More</button>
        </>
    )
}