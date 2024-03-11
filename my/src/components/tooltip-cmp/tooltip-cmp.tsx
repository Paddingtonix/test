import "../../index.scss";
import "./style.scss"
import React, {useState} from "react";

interface TooltipProps {
    title?: string,
    direction?: TooltipDirection
    children?: React.ReactNode
}

export type TooltipDirection = "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | "bottomLeft" | "bottomRight";

const TooltipCmp = (props: TooltipProps) => {

    const {
        title,
        direction = "topRight",
        children
    } = props;

    const [showToolTip, setShowToolTip] = useState(false);

    const onMouseEnterHandler = () => {
        setShowToolTip(true);
    };

    const onMouseLeaveHandler = () => {
        setShowToolTip(false);
    };

    return (
        <div
            className={`tooltip tooltip_direction_${direction} ${showToolTip ? "tooltip_show" : ""}`}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            { children }
            { showToolTip &&
                <div className={`tooltip__text tooltip__text_direction_${direction}`}>
                    {title}
                </div>
            }
        </div>
    )
}

export default TooltipCmp;