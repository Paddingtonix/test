import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import "./modal-cmp.scss";
import {createPortal} from "react-dom";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    withCloseButton?: boolean,
    closable?: boolean,
}

const ANIMATION_DELAY = 300;

const ModalCmp = (props: ModalProps) => {
    const {
        children,
        isOpen,
        onClose,
        closable = true,
        withCloseButton = true
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);


    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onOverlayClick = useCallback((e: React.MouseEvent) => {
        if (!closable)
            e.stopPropagation();
        else closeHandler()
    }, [closable]);

    useEffect(() => {
        if (isOpen && closable) {
            window.addEventListener('keydown', onKeyDown);
            const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarCompensation}px`;
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen, onKeyDown, closable]);

    if (!isMounted) {
        return null;
    }

    return createPortal(
        <div className={`modal-basic ${isOpen && "modal-basic_opened"} ${isClosing && "modal-basic_closing"}`}>
            <div className={"modal-basic__overlay"} onClick={onOverlayClick}>
                <div
                    className={"modal-basic__overlay__content"}
                    onClick={onContentClick}
                >
                    {children}
                    {
                        withCloseButton &&
                        <div className={"modal-basic__overlay__content__close-button"}
                             onClick={closeHandler}
                        />
                    }
                </div>
            </div>
        </div>
    , document.body);
};

export default ModalCmp;