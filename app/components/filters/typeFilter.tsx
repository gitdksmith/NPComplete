import { ReactNode, useContext, useState } from "react";
import { Dropdown, Option } from "../dropdown";
import parkTypes from "../../_data/parkTypes";
import { ParkData } from "@/app/_data/parkDataInterface";
import { FilterTypes, FiltersContext } from "./filterStateProvider";

declare global {
    interface Array<T> {
        typeFilterFunction(): ParkData[];
    }
}

export const TypeFilter = (props: Props) => {
    const { dispatch } = useContext(FiltersContext);
    const handleSelectedType = (e: any) => {
        dispatch({ type: FilterTypes.TYPE_SELECTED, payload: e.target.value })
    }
    return (
        <Dropdown id={"typeFilter"} stateModifier="selectedType" onChange={handleSelectedType}>
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

Array.prototype.typeFilterFunction = function (): ParkData[] {
    const { selectedType } = useContext(FiltersContext).filtersState;

    return (selectedType == '' ? this : this
    .filter((pd: ParkData) => {
        return parkTypes[selectedType].includes(pd.designation);
    }));
}
