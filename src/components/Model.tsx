import { playClick } from "../sounds";

const Model = (props: any) => {
    const close = () => {
        playClick(1);
        props.close(false);
    }
    return (
        <div class="model">
            <i class="close fa-solid fa-xmark" onClick={close}></i>
            <div>
                {props.children}
            </div>
        </div>
    );
}
export default Model;