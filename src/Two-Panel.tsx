// import { Component, createSignal, For, JSX, Show } from 'solid-js';
// import Model from './components/Model';
// import CharacterContainer from './components/CharacterContainer';
// import CharacterCard from './components/CharacterCard';
// import CardPlaceholderCalc from './components/card-placeholder-calc';
// import ArtifactSection from './components/artifact-section';
// import PEffect from './components/p-effect';
// import WeaponSection from './components/weapon-section';
// import { AllCharacters, FindArtifacts, FindWeapons, readFile } from './local-storage';
// import {
//     _isMuted,
//     playClick1,
//     playClick2,
//     playClick6,
//     playClick8,
//     _toggleMute
// } from './sounds';
// import "./App.scss";
// import "./keyframes.scss";
// import "./particles.scss";
// import { iCharacter } from './calculations/interfaces';
// import { render } from 'solid-js/web';
// import { statType } from './calculations/types';

// const CardPlaceholderChar: Component<{ onClick(): void; }> = (props: any) => {
//     return (
//         <article
//             data-label="--"
//             onMouseUp={playClick8}
//             class="card"
//             onClick={() => setTimeout(props.onClick, 50)} >
//             <picture data-star="0" />
//             <i class="char-pin fa-solid fa-location-pin"></i>
//             <i class="char-pin a-1 fa-solid fa-user"></i>
//         </article>
//     );
// }

// const matrix: { [key in statType]: number[] } = {
//     critRate_: [],
//     critDMG_: [],
//     atk: [],
//     hp: [],
//     def: [],
//     atk_: [4.08, 4.66, 5.25, 5.83],
//     hp_: [],
//     def_: [],
//     eleMas: [],
//     enerRech_: [],
//     heal_: [],
//     anemo_dmg_: [],
//     cryo_dmg_: [],
//     dendro_dmg_: [],
//     electro_dmg_: [],
//     geo_dmg_: [],
//     hydro_dmg_: [],
//     pyro_dmg_: [],
//     physical_dmg_: [],
//     norm_: [],
//     charge_: [],
//     eleBurst_: [],
//     eleSkl_: []
// }

// let sum = 0
// let point = 15.7;
// let substatAt = 0;
// let substatMaxInd = 0;
// let substatCurInd = 0;
// let arr: number[] = []
// while (sum != point) {
//     arr[substatCurInd] = matrix.atk_[substatAt];
//     sum = arr.reduce((partialSum, a) => partialSum + a, 0);
//     let txtArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         let ind = matrix.atk_.findIndex(s => s == arr[i]);
//         switch (ind) {
//             case 0: txtArr[i] = "min"; break;
//             case 1: txtArr[i] = "low"; break;
//             case 2: txtArr[i] = "high"; break;
//             case 3: txtArr[i] = "max"; break;
//         }
//     }
//     console.log(txtArr, sum)
//     // increment value
//     if (substatAt < 3) {
//         substatAt++
//         continue;
//     }
//     // go to next line
//     substatAt = 0;
//     if (substatCurInd < substatMaxInd) {
//         substatCurInd++
//         substatAt++
//         continue;
//     }
//     // create new max and start over
//     substatCurInd = 0;
//     substatMaxInd++
//     arr = new Array(substatMaxInd + 1).fill(matrix.atk_[substatAt]);
//     if (substatMaxInd > 3 || substatAt > 3) break;
// }

// const NumberButton: Component<{ val: number }> = (props: { val: number }) => {
//     const id = `number-${Math.random()}`;
//     const change = (addition: number) => {
//         let el = document.getElementById(id);
//         if (el) el.value = +el.value + addition;
//     }

//     return (
//         <div class="number-button">
//             <i class="fa-solid fa-chevron-left" onClick={() => change(-5)} />
//             <div class="input-wrapper">
//                 <input id={id} type="number" value={props.val} />
//             </div>
//             <i class="fa-solid fa-chevron-right" onClick={() => change(5)} />
//         </div>
//     );
// }

// const ReactionSelection: Component = (props: any) => {
//     type o = {
//         name: string;
//         trigger: string;
//         html: () => JSX.Element;
//     }
//     const options: o[] = [
//         {
//             name: "None",
//             trigger: "none",
//             html: () => <label>None</label>
//         },
//         {
//             name: "Vaporize x2",
//             trigger: "hydro",
//             html: () =>
//                 <>
//                     <img src="./assets/static/elements/Element_pyro.png" />
//                     <i class="fa-solid fa-right-long" />
//                     <img src="./assets/static/elements/Element_hydro.png" />
//                 </>
//         },
//         {
//             name: "Vaporize x1.5",
//             trigger: "pyro",
//             html: () =>
//                 <>
//                     <img src="./assets/static/elements/Element_hydro.png" />
//                     <i class="fa-solid fa-right-long" />
//                     <img src="./assets/static/elements/Element_pyro.png" />
//                 </>
//         },
//         {
//             name: "Bloom",
//             trigger: "hydro",
//             html: () =>
//                 <>
//                     <img src="./assets/static/elements/Element_dendro.png" />
//                     <i class="fa-solid fa-right-long" />
//                     <img src="./assets/static/elements/Element_hydro.png" />
//                 </>
//         },
//         {
//             name: "Burgeon",
//             trigger: "pyro",
//             html: () =>
//                 <>
//                     <div class="pair">
//                         <img src="./assets/static/elements/Element_dendro.png" />
//                         <i class="fa-solid fa-code-commit"></i>
//                         <img src="./assets/static/elements/Element_hydro.png" />
//                     </div>
//                     <i class="fa-solid fa-right-long" />
//                     <img src="./assets/static/elements/Element_pyro.png" />
//                 </>
//         },
//         {
//             name: "Hyperbloom",
//             trigger: "electro",
//             html: () =>
//                 <>
//                     <div class="pair">
//                         <img src="./assets/static/elements/Element_dendro.png" />
//                         <i class="fa-solid fa-code-commit"></i>
//                         <img src="./assets/static/elements/Element_hydro.png" />
//                     </div>
//                     <i class="fa-solid fa-right-long" />
//                     <img src="./assets/static/elements/Element_electro.png" />
//                 </>
//         },
//     ]
//     const [value, setValue] = createSignal(options[0]);
//     const [openOptions, setOpenOptions] = createSignal(false);
//     const availableOptions = () => {
//         let o = options.filter(o => o.trigger == props.trigger);
//         return o;
//     }
//     const onSelect = (opt: o) => {
//         setValue(opt);
//         setOpenOptions(false);
//     }

//     return (
//         <div class="select">
//             <div class="selected" onClick={() => setOpenOptions(!openOptions())}>
//                 <Show when={value}>
//                     <div class='option'>
//                         {value().html()}
//                     </div>
//                 </Show>
//             </div>
//             <Show when={openOptions()}>
//                 <div class="select-options">
//                     <div class="option" onClick={() => onSelect(options[0])}>
//                         <label>None</label>
//                     </div>
//                     <For each={availableOptions()}>
//                         {(opt, i) => <div class='option' onClick={() => onSelect(opt)}>{opt.html}</div>}
//                     </For>
//                 </div>
//             </Show>
//         </div>
//     );
// }

// const TwoPanel = () => {
//     var root = document.querySelector(':root') as any;
//     var body = document.getElementById("body");
//     const [theme, setTheme] = createSignal("dark");
//     const [selectedCharacters, setSelectedCharacters] = createSignal([] as iCharacter[]);
//     const [selectedCharacter, setSelectedCharacter] = createSignal(null as iCharacter | null);
//     const [selectedArtifacts, setSelectedArtifacts] = createSignal([] as any[]);
//     const [selectedWeapon, setSelectedWeapon] = createSignal(null as any);
//     const [showSupport, setShowSupport] = createSignal(false);
//     const [showUpload, setShowUpload] = createSignal(false);
//     const [dragHover, setDragHover] = createSignal("none" as ("none" | "hover" | "accept" | "reject"));
//     const [showCharacters, setShowCharacters] = createSignal(false);
//     const [filterType, setFilterType] = createSignal("");
//     const [selectionCount] = createSignal(4);
//     const [isMuted, setIsMuted] = createSignal(_isMuted());
//     const [loaded, setLoaded] = createSignal(false);
//     const [fullScreenClass, setFullscreenClass] = createSignal("maximize" as "maximize" | "minimize");
//     const [minER, setMinER] = createSignal(100);
//     const [showOptimizing, setShowOptimizing] = createSignal(false);

//     window.addEventListener("dragover", (e) => { e.preventDefault(); }, false);
//     window.addEventListener("drop", (e) => { e.preventDefault(); }, false);
//     window.addEventListener("load", () => {
//         setLoaded(true);
//         setTimeout(() => {
//             window.scrollTo(0, 1);
//             let i = 0;
//             while (i < 20) {
//                 i++;
//                 var c = document.createElement("div");
//                 c.classList.add("circle");
//                 var cc = document.createElement("div");
//                 cc.classList.add("circle-container");
//                 cc.appendChild(c);

//                 document.getElementById("page")?.appendChild(cc);
//             }
//             root?.style.setProperty('--working-char-color', `var(--dendro-color)`);
//         }, 50);
//     });

//     const toggleFullScreen = () => {
//         setFullscreenClass(fullScreenClass() == "maximize" ? "minimize" : "maximize");
//         var doc = window.document;
//         var docEl = doc.documentElement;

//         var requestFullScreen = docEl.requestFullscreen;
//         var cancelFullScreen = doc.exitFullscreen;

//         if (!doc.fullscreenElement) {
//             requestFullScreen.call(docEl);
//         } else {
//             cancelFullScreen.call(doc);
//         }
//     }

//     const toggleMute = () => {
//         setIsMuted(!isMuted());
//         _toggleMute();
//     };

//     const onSelect = (selected: iCharacter, order: number, selection: iCharacter[]) => {
//         let removed: boolean = selectedCharacters().includes(selected);
//         setSelectedCharacters(selection);
//         // set selected character to the first option
//         if (removed) {
//             let only = selectedCharacters()[0];
//             setChar(only)
//             return;
//         }
//         else {
//             setChar(selected);
//         }
//         // close when last slot is selected
//         let lastSlot = selectedCharacters().length == selectionCount();
//         let wasSelected = !removed;
//         let allSelected = selection.length == filteredCharacters().length;
//         if ((lastSlot && wasSelected) || allSelected) {
//             toggleCharacters();
//             return;
//         }
//     }
//     const dragOverHandler = (ev: any) => {
//         if (dragHover() != "hover") setDragHover("hover");
//         ev.preventDefault();
//     }
//     const dragHoverOut = () => { setDragHover("none"); }
//     const fileSelect = () => {
//         var dropClick = document.getElementById("dropClick") as any;
//         dropClick.click();
//         dropClick.onchange = () => {
//             const file = dropClick.files[0];
//             readFile(file, () => {
//                 setDragHover("accept");
//                 setTimeout(() => {
//                     setDragHover("none");
//                     setShowUpload(false);
//                 }, 1100);
//             }, () => {
//                 setDragHover("reject");
//                 setTimeout(() => { setDragHover("none"); }, 1000);
//             })
//         }
//     }
//     const onFilesDropped = (ev: any) => {
//         ev.preventDefault();
//         try {
//             const item = ev.dataTransfer.items ? ev.dataTransfer.items[0] : ev.dataTransfer.files[0];
//             if (item.kind !== 'file') { throw "file required" }
//             if (item.type !== "application/json") { throw ".json required" }

//             const file = item.getAsFile();
//             readFile(file, () => {
//                 setDragHover("accept");
//                 setTimeout(() => {
//                     setDragHover("none");
//                     setShowUpload(false);
//                 }, 1100);
//             }, () => {
//                 setDragHover("reject");
//                 setTimeout(() => { setDragHover("none"); }, 1000);
//             })
//         }
//         catch (err) {
//             setDragHover("reject");
//             setTimeout(() => { setDragHover("none"); }, 1000);
//         }
//     }
//     // const sortByName = (): character[] => {
//     //   let arr = new Array(...Characters);
//     //   arr.concat(Characters);
//     //   arr = arr.sort((a, b) => {
//     //     if (a.name > b.name) return 1;
//     //     else if (b.name > a.name) return -1;
//     //     else return 0;
//     //   });
//     //   return arr;
//     // }
//     const filteredCharacters = () => {
//         switch (filterType()) {
//             //case "name": return sortByName();
//             default: return AllCharacters();
//         }
//     }
//     const toggleTheme = () => {
//         if (theme() == "dark") {
//             setTheme("light");
//             root.style.setProperty('--primary-core', 'var(--dark-core-alt)');
//             root.style.setProperty('--accent-core', 'var(--light-core)');
//             root.style.setProperty('--dendro-color', 'var(--dendro-color-light)');
//         }
//         else {
//             setTheme("dark");
//             root.style.setProperty('--primary-core', 'var(--light-core)');
//             root.style.setProperty('--accent-core', 'var(--dark-core)');
//             root.style.setProperty('--dendro-color', 'var(--dendro-color-dark)');
//         }
//         localStorage.setItem("theme", theme())
//     }
//     if (localStorage.getItem("theme") && localStorage.getItem("theme") == "light") toggleTheme();
//     const toggleUpload = () => { setShowUpload(!showUpload()); }
//     const toggleSupport = () => { setShowSupport(!showSupport()); }
//     const toggleCharacters = () => {
//         setShowCharacters(!showCharacters());
//         // do nothing if menu opened
//         if (showCharacters()) {
//             body?.classList.add("tog-top-color");
//             root?.style.setProperty('--working-team-bg-opacity', `0.25`);
//             setTimeout(() => body?.classList.remove("tog-top-color"), 10);
//             return;
//         };
//         root?.style.setProperty('--working-team-bg-opacity', `1`);

//         // is none left? show nada
//         let noneLeft = selectedCharacters().length == 0;
//         if (noneLeft) {
//             setChar(null);
//             return;
//         }

//         let ch = selectedCharacter();
//         // is the current character not in the new selection?
//         let charWasRemoved = ch && selectedCharacters().findIndex(s => s.name === ch?.name) == -1;

//         if (charWasRemoved) {
//             let newChar = selectedCharacters()[0];
//             setChar(newChar);
//             return;
//         }
//         if (ch) {
//             setChar(ch);
//         }
//     }
//     const setBackground = (char: iCharacter | null) => {
//         body?.classList.add("tog-bg");
//         root?.style.setProperty('--working-team-bg', `url("${char?.imgs.splash}")`);
//         root?.style.setProperty('--working-char-color', `var(--${char?.el || 'dendro-color'})`);
//         setTimeout(() => body?.classList.remove("tog-bg"), 10);
//     }
//     const workingCharClick = (char: iCharacter) => {
//         if (showCharacters()) toggleCharacters();
//         if (selectedCharacter()?.name != char.name) {
//             var workingTeam = document.getElementById("working-team");
//             workingTeam?.classList.remove("changed");
//             setTimeout(() => {
//                 workingTeam?.classList.add("changed");
//                 setChar(char);
//                 workingTeam?.scrollIntoView();
//             });
//         }
//     }
//     const setChar = (char: iCharacter | null) => {
//         setSelectedCharacter(char);
//         if (char) {
//             setSelectedArtifacts(FindArtifacts(char.name));
//             setSelectedWeapon(FindWeapons(char.name));
//         }
//         setBackground(char);
//     }
//     const hideAllMenus = () => {
//         if (showCharacters()) {
//             toggleCharacters();
//             playClick6();
//         }
//         if (showSupport()) {
//             toggleSupport();
//             playClick1();
//         }
//         if (showUpload()) {
//             toggleUpload();
//             playClick1();
//         }
//     }

//     if (!AllCharacters()) toggleUpload();

//     return (
//         <>
//             <div class="main-list">
//                 <h1 class="pip active"><i class='select fa-solid fa-caret-right' />Weapons</h1>
//                 <h1 class="pip">Artifacts</h1>
//                 <h1 class="pip">Constellation</h1>
//                 <h1 class="pip">Talents</h1>
//             </div>
//             <section id="char-list" class={"left shown-" + showCharacters()}>
//                 <div>
//                     <CharacterContainer onSelect={onSelect} selectionCount={selectionCount()} characters={filteredCharacters()} />
//                 </div>
//             </section>
//             <div style="position: fixed; bottom: 2em; left: 2em;">
//                 <button
//                     style="border-radius: 3em; aspect-ratio: 1 / 1; font-size: 1.25em;"
//                     onClick={toggleCharacters} onMouseUp={playClick6}>
//                     <i class={"fa fa-" + (showCharacters() ? "share" : "grip")} />
//                 </button>
//             </div>
//         </>
//     );
// }
// export default TwoPanel;