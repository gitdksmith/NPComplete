import { useContext, useEffect, useState } from "react";
import { ParkData } from "@/app/_data/parkDataInterface";
import { Activity } from "@/app/_data/activitiesDataInterface";
import { FilterTypes, FiltersContext } from "./filterStateProvider";
import styles from "./activityFilter.module.css"

declare global {
    interface Array<T> {
        activityFilterFunction(): ParkData[];
    }
}

interface P extends Props {
    activityData: Activity[]
}

export const ActivityFilter = (props: P) => {
    const { activityData } = props;

    const { filtersState, dispatch } = useContext(FiltersContext);
    const { selectedActivities } = filtersState;
    const handleSelectedActivity = (id: string) => {
        if (selectedActivities.includes(id)) {
            dispatch({ type: FilterTypes.ACTIVITY_REMOVED, payload: id })
        } else {
            dispatch({ type: FilterTypes.ACTIVITY_SELECTED, payload: id })
        }
    };

    return (
        <>
            <div className={styles.title}>
                <span>Activities</span>
                <hr className={styles.titleHr} />
            </div>
            <div id="activitiesContainer" className={styles.activitiesContainer}>
                {
                    activityData && activityData.map(({ id, name }) => {
                        return (
                            <span className={styles.activityButton} key={id}
                                style={selectedActivities.includes(id) ? { backgroundColor: 'rgba(83, 130, 83, 0.756)' } : {}}
                                onClick={() => handleSelectedActivity(id)} >
                                {name}
                            </span>
                        )
                    })
                }
            </div>
        </>
    )
}

Array.prototype.activityFilterFunction = function (): ParkData[] {
    const { selectedActivities } = useContext(FiltersContext).filtersState;

    return (selectedActivities.length == 0 ? this : this
        .filter((pd: ParkData) => {
            for (const pdActivity of pd.activities) {
                if (selectedActivities.includes(pdActivity.id)) {
                    // first park data activity found to be in selectedActivites
                    return true;
                }
            }
            return false;
        }));
}
