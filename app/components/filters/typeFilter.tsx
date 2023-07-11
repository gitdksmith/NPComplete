import { ReactNode } from "react";
import { Dropdown, Option } from "../dropdown";
import parkTypes from "../../_data/parkTypes";
import { ParkData } from "@/app/(pages)/explore/parkDataInterface";


interface Props {
    children?: ReactNode,
    handleSelected: (e:any) => void
}


export const TypeFilter = (props: Props) => {
    return (
        <Dropdown id={"typeFilter"} onChange={props.handleSelected}>
            <Option key={'default'} value={''} text={"Type"} />
            {
                Object.keys(parkTypes).map(type => {
                    return (
                        <Option key={type} value={type} text={type} />
                    )
                })
            }
        </Dropdown>
    )
}

export const typeFilterFunction = (parkData: ParkData[], selectedType: string): ParkData[] => {
    return (selectedType == '' ? parkData : parkData
    .filter((pd: ParkData) => {
        return parkTypes[selectedType].includes(pd.designation);
    }));
}

