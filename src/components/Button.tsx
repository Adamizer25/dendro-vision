import { createSignal } from "solid-js";
import { playClick } from "../sounds";
interface Props {
    txt: any;
    value: any;
    handler: (arg0: any, arg1: any) => void;
}
const Button = (props: Props) => {
    const [txt] = createSignal(props.txt);
    const [value] = createSignal(props.value);
    const handle = (event: any) => {
        playClick(1);
        props.handler(value(), event);
    }

    return <button onClick={handle}>{txt()}</button>;
}
export default Button;
