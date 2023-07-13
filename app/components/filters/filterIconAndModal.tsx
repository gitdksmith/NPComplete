import React, { ReactNode, useRef, useState } from 'react'
import { MdFilterList } from 'react-icons/md';
import styles from './filterIconAndModal.module.css'

export default function FilterIconAndModal(props: Props) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const modalRef = useRef<any>(null);
    const filterIconRef = useRef<any>(null);

    window.addEventListener('click', function (e: { target: any }) {
        if (modalRef.current && modalRef.current.contains(e.target) ||
            filterIconRef.current && filterIconRef.current.contains(e.target)) {
            // Clicked in box
        } else {
            if (showModal) {
                setShowModal(false);
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (showModal) {
                setShowModal(false);
            }
        }
    })

    return (
        <div>
            {/* Icon */}
            <span id="filterIcon" tabIndex={0} ref={filterIconRef} 
            onKeyDown={(e: {keyCode: number}) => { if (e.keyCode == 13) setShowModal(!showModal); }}
            onClick={() => { setShowModal(!showModal); }}>
                <MdFilterList />
            </span>

            {/* Modal */}
            <div className={styles.modalContainer} style={{ visibility: showModal ? 'visible' : 'hidden' }} >
                <div ref={modalRef} className={styles.modal} style={{ visibility: showModal ? 'visible' : 'hidden' }} >
                    {props.children}
                </div>
            </div>
        </div>
    )
}

