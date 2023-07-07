'use client'

import { useState } from "react";
import { ParkData } from "../explore/parkDataInterface";
import Link from "next/link";
import Image from "next/image";
import styles from '../page.module.css'

interface Props {
    parkData: ParkData
}
export default function ParkElement(props: Props) {
    const { parkData } = props;
    return (
        <div className={styles.parkElement}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3><Link target="_blank" href={parkData.url}>{parkData.fullName}</Link></h3>
                <p>{parkData.states}</p>
            </div>
            <div>
                <Image
                    src={(parkData.images[0]||{}).url}
                    alt={(parkData.images[0]||{}).altText}
                    //   className={styles.vercelLogo}
                    width={400}
                    height={400}
                    style={{objectFit:"cover"}}
                />
            </div>
        </div>
    )
}