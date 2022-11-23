import { Component } from "solid-js";
import Card from "../card";

type params = {
    clickSound?(): void
    onClick?(): void
};

const CardPlaceholderCalc: Component<params> = (props: params) => {
    return (
        <Card
            label="--"
            onMouseUp={props.clickSound}
            onClick={props.onClick}>
            <i style="font-size: 2.5em;" class="char-pin mid fa-solid fa-calculator" />
        </Card>
    );
}


export default CardPlaceholderCalc;