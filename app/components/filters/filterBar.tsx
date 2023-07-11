import { ReactNode } from "react"
import styles from './filterBar.module.css'

interface Props {
    children?: ReactNode
}
const FilterBar = (props: Props) => {
    return (
        <>
            <div className={styles.filterBar}>
                {props.children}
            </div>
        </>
    )
}

export default FilterBar;