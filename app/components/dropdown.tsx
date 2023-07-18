'use client'
import { ReactNode, useContext, useState } from "react";
import styles from './dropdown.module.css'
import { FiltersContext } from "./filters/filterStateProvider";


interface P extends Props {
    onChange: (e: any) => void,
    id: string,
    stateModifier: string
}
interface OptionProps extends Props {
    value: string,
    selected?: boolean,
    text: string
}

export function Dropdown(props: P) {
    const { filtersState } = useContext(FiltersContext);

    return (
        <>
            <select id={props.id} className={styles.dropdownSelect}
                value={filtersState[props.stateModifier]} onChange={props.onChange}
                style={filtersState[props.stateModifier] != '' ? { backgroundColor: 'rgba(83, 130, 83, 0.756)' } : {}}
                >
                {props.children}
            </select>
        </>
    )
}

export function Option(props: OptionProps) {
    return (
        <option value={props.value}>
            {props.text}
        </option>
    )
}
