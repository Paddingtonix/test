import "./style.scss"
import React, {createContext, useContext, useEffect, useState} from "react";
import {createPortal} from "react-dom";

interface NotificationProps {
    type?: NotificationType,
    children?: React.ReactNode,
    autoClose?: boolean
    onDelete(): void,
}

export type NotificationType = "info" | "success" | "warning" | "error";

const TIME_TO_DELETE = 300;
const TIME_TO_CLOSE = 3000;

export const Notification = (props: NotificationProps) => {

    const {
        type = "info",
        onDelete,
        autoClose = true,
        children
    } = props;

    const [isClosing, setIsClosing] = React.useState(false);

    useEffect(() => {
        if (isClosing) {
            const timeoutId = setTimeout(onDelete, TIME_TO_DELETE);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isClosing, onDelete]);

    useEffect(() => {
        if (autoClose) {
            const timeoutId = setTimeout(() => setIsClosing(true), TIME_TO_CLOSE);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [autoClose]);

    return createPortal(
        <div className={`notification-container ${isClosing && "notification-container_shrink"}`}>
            <div className={`notification notification_${type} ${isClosing ? "notification_slide-out" : "notification_slide-in"}`}>
                {children}
                <button className={"notification__close-button"} onClick={() => setIsClosing(true)}>
                    Х
                </button>
            </div>
        </div>
        , createContainer()
    );
}

const createContainer = () => {
    const portalId = "notifyContainer";
    let element = document.getElementById(portalId);

    if (element) {
        return element;
    }

    element = document.createElement("div");
    element.setAttribute("id", portalId);
    element.className = "notificationContainer";
    document.body.appendChild(element);
    return element;
}



interface NotificationCreate {
    type?: NotificationType,
    children?: React.ReactNode,
    autoClose?: boolean
}

interface Notification {
    type?: NotificationType,
    children?: React.ReactNode,
    autoClose?: boolean,
    id: number
}

interface NotificationProviderProps {
    children: React.ReactNode
}

export const NotificationProvider = ({children}: NotificationProviderProps) => {
    const [notifications, setNotifications] = React.useState<Notification[]>([]);
    const [index, setIndex] = useState(0);

    const createNotification = ({ type, autoClose, children }: NotificationCreate) => {
        setNotifications([
                ...notifications,
                {
                    children,
                    type,
                    autoClose,
                    id: notifications.length,
                },
            ])
    };

    const deleteNotification = (id: number) => {
        const filteredNotifications = notifications.filter(
            (_, index) => id !== index,
            []
        );
        setNotifications(filteredNotifications);
    };

    const toastSuccess = (text?: string) => {
        createNotification({type: "success", children: text})
    }
    const toastError = (text?: string) => {
        createNotification({type: "error", children: text})
    }
    const toastWarning = (text?: string) => {
        createNotification({type: "warning", children: text})
    }
    const toastInfo = (text?: string) => {
        createNotification({type: "info", children: text})
    }

    const value = {
        toastSuccess,
        toastError,
        toastWarning,
        toastInfo
    }

    return (
        <NotificationContext.Provider value={value}>
            {
                notifications.map(({ id, ...props }, index) => (
                    <Notification
                        key={id}
                        onDelete={() => deleteNotification(index)}
                        {...props}
                    />
                ))
            }
            { children }
        </NotificationContext.Provider>
    )
}

export interface NotificationContextValue {
    toastSuccess(text?: string): void,
    toastError(text?: string): void,
    toastWarning(text?: string): void,
    toastInfo(text?: string): void,
}

const defaultValue: NotificationContextValue = {
    toastSuccess() { },
    toastError() { },
    toastWarning() { },
    toastInfo() { }
}

export const NotificationContext = createContext<NotificationContextValue>(defaultValue);

export const useNotification = () => {
    return useContext(NotificationContext);
}