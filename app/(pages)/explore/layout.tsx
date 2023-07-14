import { Metadata } from 'next'
import { ReactNode } from 'react'
import styles from './layout.module.css'

export const metadata: Metadata = {
    title: 'NPComlete Explore',
}

export default function explore({ children }: Props) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}