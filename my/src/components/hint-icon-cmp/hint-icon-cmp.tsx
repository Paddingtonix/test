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
            <span className={"hint-icon"}>i</span>
        </TooltipCmp>
    )
}

export default HintIconCmp