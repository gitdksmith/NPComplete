'use client'

import { useState } from "react";
import { ParkData } from "../(pages)/explore/parkDataInterface";
import ParkElement from "./parkElement";
import styles from "../(pages)/page.module.css"
import FilterBar from "./filterBar";
import { StateFilter } from "./filters/stateFilter";
import { TypeFilter } from "./filters/typeFilter";

interface Props {
    parkData: ParkData[]
}

const ENV_LIMIT: number = Number.parseInt(process.env.EXPLORE_LIST_LIMIT || '20');

export default function ParkList(props: Props) {
    const { parkData } = props;
    const [limit, setLimit] = useState(ENV_LIMIT);

    return (
        <>
            <FilterBar>
                <StateFilter />
                <TypeFilter />
            </FilterBar>
            {parkData.stateFilterFunction()
                .typeFilterFunction()
                .slice(0, limit)
                .map((pd: ParkData, index: number) => {
                    return <ParkElement key={pd.id} parkData={pd} />
                })}
            <h2>end</h2>
            <button className={styles.loadMore} onClick={() => setLimit(limit + ENV_LIMIT)}>Load More</button>
        </>
    )
}