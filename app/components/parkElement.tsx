'use client'

import { ParkData } from "../_data/parkDataInterface";
import Link from "next/link";
import Image from "next/image";
import styles from '../components/parkElement.module.css'
import useIntersectionOnScreen from "../hooks/useIntersectionObserver";
import { useContext } from "react";
import { FiltersContext } from "./filters/filterStateProvider";

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

    const { filtersState } = useContext(FiltersContext);
    const { selectedActivities } = filtersState;

    const matchingActivities = (): string => {
        const matchNames: string[] = [];
        for(const parkActivity of parkData.activities){
            if(selectedActivities.includes(parkActivity.id)){
                matchNames.push(parkActivity.name);
            }
        }
        return matchNames.join(', ');
    }

    return (
        // <div className={`${styles.parkElement} ${isVisible ? styles.parkElementVisible : ''}`}>
        <div className={`${styles.parkElement}`}>
            <div /*ref={containerRef}*/ id={styles.sensor}></div>
            <div className={styles.parkInfo}>
                <h2>{parkData.fullName}</h2>
                <p><Link target="_blank" href={parkData.url}>{parkData.url}</Link></p>
                <h3 className="stateTag">{parkData.states}</h3>
                {selectedActivities.length != 0 && 
                <p className="activitiesTag">Filtered activities: {matchingActivities()}</p>}
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