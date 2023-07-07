'use client'

import { useState } from "react";
import { ParkData } from "../(pages)/explore/parkDataInterface";
import Link from "next/link";
import Image from "next/image";
import styles from '../(pages)/page.module.css'

interface Props {
    parkData: ParkData
}
export default function ParkElement(props: Props) {
    const { parkData } = props;
    return (
        <div className={styles.parkElement}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2>{parkData.fullName}</h2>
                <p><Link target="_blank" href={parkData.url}>{parkData.url}</Link></p>
                <h3>{parkData.states}</h3>
            </div>
            <div className={styles.imageContainer}>
                <Image
                    src={(parkData.images[0]||{}).url}
                    alt={(parkData.images[0]||{}).altText}
                    fill={true}
                    sizes="(max-width: 768px) 80vw, 33vw"
                    style={{objectFit:"cover", overflow:"hidden"}}
                />
            </div>
        </div>
    )
}