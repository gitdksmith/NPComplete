'use client'
import { ReactNode, useState } from "react";
import styles from '../(pages)/page.module.css'


interface Props {
    children?: ReactNode,
    onChange: (e:any) => void
}
interface OptionProps {
    value: string,
    selected?: boolean,
    text: string
}

export function Dropdown(props: Props) {
    return (
        <>
            <select className={styles.dropdownSelect} onChange={props.onChange}>
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
