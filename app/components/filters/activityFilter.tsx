import { useContext, useEffect, useState } from "react";
import { ParkData } from "@/app/_data/parkDataInterface";
import { Activity } from "@/app/_data/activitiesDataInterface";
import { ActivitiesToggle, FilterTypes, FiltersContext } from "./filterStateProvider";
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
    const { selectedActivities, selectedActivitiesToggle } = filtersState;
    const handleSelectedActivity = (id: string) => {
        if (selectedActivities.includes(id)) {
            dispatch({ type: FilterTypes.ACTIVITY_REMOVED, payload: id })
        } else {
            dispatch({ type: FilterTypes.ACTIVITY_SELECTED, payload: id })
        }
    };
    const handleActivityToggle = () => {
        dispatch({ type: FilterTypes.ACTIVITY_TOGGLE_CLICK, payload: '' })
    }

    return (
        <>
            <div className={styles.title}>
                <span>Activities</span>
                <div>
                    <span>
                        <input type="radio" onClick={handleActivityToggle} id="and" name="activityToggleGroup"
                            value="and" checked={selectedActivitiesToggle == ActivitiesToggle.AND} />
                        <label id={styles.andLabel} htmlFor="and"> and</label>
                    </span>
                    <span>
                        <input type="radio" onClick={handleActivityToggle} id="or" name="activityToggleGroup"
                            value="or" checked={selectedActivitiesToggle == ActivitiesToggle.OR} />
                        <label id={styles.orLabel} htmlFor="or"> or</label>
                    </span>
                </div>
            </div>
            <hr className={styles.titleHr} />
            <div id="activitiesContainer" className={styles.activitiesContainer}>
                {
                    activityData && activityData.map(({ id, name }) => {
                        return (
                            // TODO change to button for accessibility support 
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
    const { selectedActivities, selectedActivitiesToggle } = useContext(FiltersContext).filtersState;

    return (selectedActivities.length == 0 ? this : this
        .filter((pd: ParkData) => {
            return selectedActivitiesToggle == ActivitiesToggle.AND ?
                selectedActivities.every(selectedActivity =>
                    pd.activities.some(pdActivity => pdActivity.id == selectedActivity)) :
                pd.activities.some(pdActivity => selectedActivities.includes(pdActivity.id))
        }));
}
