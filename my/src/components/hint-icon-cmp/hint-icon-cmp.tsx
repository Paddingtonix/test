import TooltipCmp, {TooltipDirection} from "../tooltip-cmp/tooltip-cmp";
import "./style.scss"

interface HintIconProps {
    title?: string,
    direction?: TooltipDirection
}

const HintIconCmp = (props: HintIconProps) => {

    const {
        title, direction
    } = props;

    return (
        <TooltipCmp title={title} direction={direction}>
            <span className={"hint-icon"}>
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.8284 7 13.5 6.32843 13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5C10.5 6.32843 11.1716 7 12 7ZM11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V10C13 9.44772 12.5523 9 12 9H11Z" fill="#000000"/>
                </svg>
            </span>
        </TooltipCmp>
    )
}

export default HintIconCmp