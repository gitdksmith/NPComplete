import { ReactNode, useContext, useRef, useState } from "react"
import styles from './filterBar.module.css'
import { IconContext } from "react-icons";
import FilterIconAndModal from "./filterIconAndModal";
import { FiltersContext } from "./filterStateProvider";
import Selection from "./selection";
import { StateFilter } from "./stateFilter";
import { TypeFilter } from "./typeFilter";
import { ActivityFilter } from "./activityFilter";
import parkActivities from "@/app/_data/parkActivites";
import { Activity } from "@/app/_data/activitiesDataInterface";

interface P extends Props {
    activityData: Activity[]
}

const FilterBar = (props: P) => {
    const { activityData } = props;
    const iconValues = {
        size: '2em',
        style: { verticalAlign: 'middle' }
    }

    const { filtersState } = useContext(FiltersContext);

    return (
        <IconContext.Provider value={iconValues}>
            <div className={styles.filterBar}>

                {/* Display selected filters */}
                <div className={styles.selectedFiltersContainer}>
                    {
                        !!filtersState.selectedState &&
                        <Selection key={'selectedState'}
                            filterName={'selectedState'}
                            filterValue={filtersState.selectedState}
                            filterText={filtersState.selectedState}
                        />
                    }
                    {
                        !!filtersState.selectedType &&
                        <Selection key={'selectedType'}
                            filterName={'selectedType'}
                            filterValue={filtersState.selectedType}
                            filterText={filtersState.selectedType}
                        />
                    }
                    {filtersState.selectedActivities.map((id) => {
                        return (
                            <Selection key={id}
                                filterName={'selectedActivities'}
                                filterValue={id}
                                filterText={parkActivities[id]}
                            />
                        );
                    })}
                </div>

                {/* Filter icon opens modal */}
                <div>
                    <FilterIconAndModal>
                        <StateFilter />
                        <TypeFilter />
                        <ActivityFilter activityData={activityData} />
                    </FilterIconAndModal>
                </div>
            </div>
        </IconContext.Provider>
    )
}

export default FilterBar;