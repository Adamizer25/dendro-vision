import { Component } from "solid-js";
import { playClick } from "../../../sounds";
import './placeholder-char.scss';

const CardPlaceholderChar: Component<{ onClick(): void; }> = (props: any) => {
    return (
        <article
            data-label="--"
            onMouseUp={() => playClick(8)}
            class="card"
            onClick={() => setTimeout(props.onClick, 50)} >
            <picture data-star="0" />
            <i class="char-pin fa-solid fa-location-pin"></i>
            <i class="char-pin a-1 fa-solid fa-user"></i>
        </article>
    );
}

export default CardPlaceholderChar;