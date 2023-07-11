import { ReactNode } from "react";
import { Dropdown, Option } from "../dropdown";
import states from "../../_data/states";
import { ParkData } from "@/app/(pages)/explore/parkDataInterface";


interface Props {
    children?: ReactNode,
    handleSelected: (e:any) => void
}


export const StateFilter = (props: Props) => {
    return (
        <Dropdown id={"stateFilter"} onChange={props.handleSelected}>
            <Option key={'default'} value={''} text={"State"} />
            {
                states.map(state => {
                    return (
                        <Option key={state.abbreviation} value={state.abbreviation} text={state.name} />
                    )
                })
            }
        </Dropdown>
    )
}

export const stateFilterFunction = (parkData: ParkData[], selectedState: string): ParkData[] => {
    return (selectedState == '' ? parkData : parkData
    .filter((pd: ParkData) => {
        return pd.states.includes(selectedState);
    }));
}

