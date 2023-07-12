import { ReactNode, useContext } from "react";
import { Dropdown, Option } from "../dropdown";
import states from "../../_data/states";
import { ParkData } from "@/app/(pages)/explore/parkDataInterface";
import { FilterTypes, FiltersContext } from "../filterStateProvider";

interface Props {
    children?: ReactNode,
}

declare global {
    interface Array<T> {
        stateFilterFunction(): ParkData[];
    }
}

export const StateFilter = (props: Props) => {
    const { dispatch } = useContext(FiltersContext);
    const handleSelectedState = (e: any) => {
        dispatch({ type: FilterTypes.STATE_SELECTED, payload: e.target.value })
    }

    return (
        <Dropdown id={"stateFilter"} onChange={handleSelectedState}>
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

Array.prototype.stateFilterFunction = function (): ParkData[] {
    const { selectedState } = useContext(FiltersContext).filtersState;

    return (selectedState == '' ? this : this
        .filter((pd: ParkData) => {
            return pd.states.includes(selectedState);
        }));
}
