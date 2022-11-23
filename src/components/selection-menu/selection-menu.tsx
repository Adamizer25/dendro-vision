import { Accessor, Component, createSignal, JSXElement, Setter } from "solid-js";
import './selection-menu.scss';


type params = {
    key: string
    active: string
    setActive: (val: string) => void
    children: JSXElement
}

const SelectionMenu: Component<params> = (props: params) => {
    const [pos, setPos] = createSignal({ top: 0, left: 0, x: 0, y: 0 });
    let ele = document.getElementById(`container-${props.key}`);
    const [attached, setAttached] = createSignal(false);

    const mouseDownHandler = e => {
        setPos({
            // The current scroll
            left: e.scrollLeft || 0,
            top: e.scrollTop || 0,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        });
        console.log(e, pos())
        setAttached(true);
    };
    const mouseMoveHandler = e => {
        if (!attached()) return;
        if (!ele) ele = document.getElementById(`container-${props.key}`);
        // How far the mouse has been moved
        const dx = e.clientX - pos().x;
        const dy = e.clientY - pos().y;

        // Scroll the element
        ele.scrollTop = pos().top - dy;
        ele.scrollLeft = pos().left - dx;
        console.log(ele.scrollTop, ele?.scrollLeft, pos().top - dy, pos().left - dx)
    };
    const mouseUpHandler = () => {

        // ele.style.cursor = 'grab';
        // ele.style.removeProperty('user-select');
        setAttached(false);
    };

    const open = () => {
        return props.active == props.key ? "open" : ""
    };
    const onClick = () => {
        props.setActive(props.key)
    };

    const refs = {
        id: `container-${props.key}`,
        class: "content",
        onClick: e => e.stopPropagation(),
        onmousedown: mouseDownHandler,
        onmousemove: mouseMoveHandler,
        onmouseup: mouseUpHandler
    }
    return (<div class={"selection-menu slide-away " + open()} onClick={onClick}>
        <div {...refs}>{props.children}</div>
    </div>)
}

export default SelectionMenu;