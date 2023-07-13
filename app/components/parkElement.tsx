'use client'

import { ParkData } from "../(pages)/explore/parkDataInterface";
import Link from "next/link";
import Image from "next/image";
import styles from '../components/parkElement.module.css'
import useIntersectionOnScreen from "../hooks/useIntersectionObserver";

interface P extends Props {
    parkData: ParkData,
}

const ParkElement = function ParkElement(props: P) {
    const { parkData } = props;

    // const [containerRef, isVisible ] = useIntersectionOnScreen({
    //     root: null,
    //     rootMargin: '-25% 0% -25% 0%',
    //     threshold: 1
    // });
    
    return (
        // <div className={`${styles.parkElement} ${isVisible ? styles.parkElementVisible : ''}`}>
        <div className={`${styles.parkElement}`}>
            <div /*ref={containerRef}*/ id={styles.sensor}></div>
            <div className={styles.parkInfo}>
                <h2>{parkData.fullName}</h2>
                <p><Link target="_blank" href={parkData.url}>{parkData.url}</Link></p>
                <h3 className="stateTag">{parkData.states}</h3>
            </div>
            <div className={styles.imageContainer}>
                <div className={styles.imageCenter}>
                    <Image
                        src={(parkData.images[0] || {}).url}
                        alt={(parkData.images[0] || {}).altText}
                        fill={true}
                        sizes="(max-width: 480) 80vw, 66vw"
                        className={styles.imageObject}
                    />
                </div>
            </div>
        </div>
    )
};

export default ParkElement;