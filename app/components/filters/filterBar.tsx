import { ReactNode, useContext, useRef, useState } from "react"
import styles from './filterBar.module.css'
import { IconContext } from "react-icons";
import FilterIconAndModal from "./filterIconAndModal";
import { FiltersContext } from "../filterStateProvider";
import Selection from "./selection";
import { StateFilter } from "./stateFilter";
import { TypeFilter } from "./typeFilter";

const FilterBar = (props: Props) => {
    const iconValues = {
        size: '2em',
        style: { verticalAlign: 'middle' }
    }

    const { filtersState } = useContext(FiltersContext);

    return (
        <IconContext.Provider value={iconValues}>
            <div className={styles.filterBar}>

                {/* Display selected filters */}
                <div style={{ display: "flex" }}>
                    {Object.entries(filtersState).map(([key, value], index) => {
                        if (value) {
                            return (
                                <Selection key={key} filterKey={key} filterValue={value} />
                            );
                        }
                    })}
                </div>

                {/* Filter icon opens modal */}
                <div>
                    <FilterIconAndModal>
                        <StateFilter />
                        <TypeFilter />
                    </FilterIconAndModal>
                </div>
            </div>
        </IconContext.Provider>
    )
}

export default FilterBar;