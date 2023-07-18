import React, { useContext } from 'react'
import { FilterTypes, FiltersContext } from './filterStateProvider';
import { MdOutlineCancel } from 'react-icons/md';
import styles from './selection.module.css'
import { IconContext } from 'react-icons';


interface P extends Props {
    filterName: string,
    filterValue: string,
    filterText: string
}
export default function Selection({ filterName, filterValue, filterText }: P) {
    const { dispatch } = useContext(FiltersContext);

    const onHandleClose = (filterName: string, filterValue: string) => {
        if (filterName == 'selectedActivities') {
            dispatch({ type: FilterTypes.ACTIVITY_REMOVED, payload: filterValue })
        }
        else {
            dispatch({ type: FilterTypes.FILTER_REMOVED, payload: filterName })
        }
    }

    const iconValues = {
        size: '1em',
        style: { verticalAlign: 'middle', color: 'rgba(228, 228, 228, 0.9)' }
    }

    return (
        <IconContext.Provider value={iconValues}>
            {/* TODO chage to buttons for accessibility support */}
            <button className={styles.selection} onClick={() => onHandleClose(filterName, filterValue)}>
                <span data-testid="filter-selected-name" >{filterText}</span>
                <span className={styles.xicon}><MdOutlineCancel /></span>
            </button>
        </IconContext.Provider>
    )
}
