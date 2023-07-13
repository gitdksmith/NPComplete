import React, { useContext } from 'react'
import { FilterTypes, FiltersContext } from '../filterStateProvider';
import { MdOutlineCancel } from 'react-icons/md';
import styles from './selection.module.css'
import { IconContext } from 'react-icons';


interface P extends Props {
    filterKey: string,
    filterValue: string
}
export default function Selection({ filterKey, filterValue }: P) {
    const { dispatch } = useContext(FiltersContext);

    const onHandleClose = (filterName: string) => {
        dispatch({ type: FilterTypes.FILTER_REMOVED, payload: filterName })
    }

    const iconValues = {
        size: '1.25em',
        style: { verticalAlign: 'middle' }
    }

    return (
        <IconContext.Provider value={iconValues}>
            <span className={styles.selection} onClick={() => onHandleClose(filterKey)}>
                <span>{filterValue}</span>
                <span className={styles.xicon}><MdOutlineCancel /></span>
            </span>
        </IconContext.Provider>
    )
}
