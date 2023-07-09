'use client'

import { useState } from "react";
import { ParkData } from "../(pages)/explore/parkDataInterface";
import { Dropdown, Option } from "./dropdown";
import ParkElement from "./parkElement";
import styles from "../(pages)/page.module.css"
import states from "../states";

interface Props {
    parkData: ParkData[]
}

const ENV_LIMIT: number = Number.parseInt(process.env.EXPLORE_LIST_LIMIT || '20');

export default function ParkList(props: Props) {
    const [limit, setLimit] = useState(ENV_LIMIT);
    const [selectedState, setSelectedState] = useState<string>(''); // abbreviation
    const handleSelected = (e:any) => {
        setSelectedState(e.target.value);
    }
    
    const { parkData } = props;
    return (
        <>
            <Dropdown onChange={handleSelected}>
                    <Option key={'default'} value={''} text={"State"} />
                    {
                    states.map(state => {
                        return (
                            <Option key={state.abbreviation} value={state.abbreviation} text={state.name}/>
                        )
                    })
                }
            </Dropdown>
            {(selectedState == '' ? parkData : parkData
                .filter((pd: ParkData) => {
                    return pd.states.includes(selectedState);
                }))
                .slice(0, limit)
                .map((pd: ParkData, index: number) => {
                    return <ParkElement key={pd.id} parkData={pd} />
                })}
            <h2>end</h2>
            <button className={styles.loadMore} onClick={() => setLimit(limit + ENV_LIMIT)}>Load More</button>
        </>
    )
}