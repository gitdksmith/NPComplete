'use client'

import { useState } from "react";
import { ParkData } from "../(pages)/explore/parkDataInterface";
import ParkElement from "./parkElement";
import styles from "../(pages)/page.module.css"
import FilterBar from "./filterBar";
import {StateFilter, stateFilterFunction} from "./filters/stateFilter";
import { TypeFilter, typeFilterFunction } from "./filters/typeFilter";

interface Props {
    parkData: ParkData[]
}

const ENV_LIMIT: number = Number.parseInt(process.env.EXPLORE_LIST_LIMIT || '20');

export default function ParkList(props: Props) {
    const { parkData } = props;
    const [limit, setLimit] = useState(ENV_LIMIT);
    const [selectedState, setSelectedState] = useState<string>(''); // abbreviation
    const handleSelectedState = (e: any) => {
        setSelectedState(e.target.value);
    }

    const [selectedType, setSelectedType] = useState<string>(''); 
    const handleSelectedType = (e: any) => {
        setSelectedType(e.target.value);
    }
                
    return (
        <>
            <FilterBar>
                <StateFilter handleSelected={handleSelectedState} />
                <TypeFilter handleSelected={handleSelectedType} />
            </FilterBar>
            {
            stateFilterFunction(
                typeFilterFunction(parkData, selectedType), 
                selectedState)
                .slice(0, limit)
                .map((pd: ParkData, index: number) => {
                    return <ParkElement key={pd.id} parkData={pd} />
                })}
            <h2>end</h2>
            <button className={styles.loadMore} onClick={() => setLimit(limit + ENV_LIMIT)}>Load More</button>
        </>
    )
}