import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, className = '', onCloseHandler }) {
    const dialogRef = useRef();

    useEffect(() => {
        const ref = dialogRef.current;

        if (open) {
            ref.showModal();
        }

        return () => ref.close();
    }, [open])

    return (
        createPortal(
            <dialog ref={dialogRef} className={`modal ${className}`} onClose={onCloseHandler}>
                {children}
            </dialog>,
            document.getElementById('modal')
        )
    )
}