import { Component, createSignal } from "solid-js";
import { readFile } from "../../local-storage";

type params = {
    onComplete(): void;
}

const FileUpload: Component<params> = (props: params) => {
    window.addEventListener("dragover", (e) => { e.preventDefault(); }, false);
    window.addEventListener("drop", (e) => { e.preventDefault(); }, false);
    const [dragHover, setDragHover] = createSignal("none" as ("none" | "hover" | "accept" | "reject"));
    const dragOverHandler = (ev: any) => {
        if (dragHover() != "hover") setDragHover("hover");
        ev.preventDefault();
    }
    const dragHoverOut = () => { setDragHover("none"); }
    const fileSelect = () => {
        var dropClick = document.getElementById("dropClick") as any;
        dropClick.click();
        dropClick.onchange = () => {
            const file = dropClick.files[0];
            readFile(file, () => {
                setDragHover("accept");
                setTimeout(() => {
                    setDragHover("none");
                    props.onComplete();
                }, 1100);
            }, () => {
                setDragHover("reject");
                setTimeout(() => { setDragHover("none"); }, 1000);
            })
        }
    }
    const onFilesDropped = (ev: any) => {
        ev.preventDefault();
        try {
            const item = ev.dataTransfer.items ? ev.dataTransfer.items[0] : ev.dataTransfer.files[0];
            if (item.kind !== 'file') { throw "file required" }
            if (item.type !== "application/json") { throw ".json required" }

            const file = item.getAsFile();
            readFile(file, () => {
                setDragHover("accept");
                setTimeout(() => {
                    setDragHover("none");
                    props.onComplete();
                }, 1100);
            }, () => {
                setDragHover("reject");
                setTimeout(() => { setDragHover("none"); }, 1000);
            })
        }
        catch (err) {
            setDragHover("reject");
            setTimeout(() => { setDragHover("none"); }, 1000);
        }
    }

    return <div
        id="dropContainer"
        class={`${dragHover()}`}
        ondragexit={dragHoverOut}
        ondragover={(event) => dragOverHandler(event)}
        ondrop={(event) => onFilesDropped(event)}
        onClick={() => fileSelect()}>
        <i class="fa-solid fa-file-import"></i>
        <i class="fa-solid fa-check"></i>
    </div>;
}

export default FileUpload;