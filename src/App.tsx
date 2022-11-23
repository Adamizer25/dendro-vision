import { Component, createSignal, For, JSX, Show } from 'solid-js';
import Model from './components/Model';
import CharacterContainer from './components/character-container/character-container';
import CharacterCard from './components/card/character-card/character-card';
import CardPlaceholderCalc from './components/card/placeholder-calc/placeholder-calc';
import ArtifactSection from './components/artifact-section/artifact-section';
import PEffect from './components/p-effect/p-effect';
import WeaponSection from './components/weapon-section';
import { AllCharacters, AllWeapons, assignArtifact, FindArtifacts, FindCharacters, FindWeapons } from './local-storage';
import { playClick } from './sounds';
import "./App.scss";
import "./keyframes.scss";
import "./particles.scss";
import { iArtifactJson, iCharacter, iWeapon } from './calculations/interfaces';
import ReactionSelection from './components/reaction-selection/reaction-selection';
import ArtifactSelection from './components/artifact-selection/artifact-selection';
import MainMenu from './components/main-menu/main-menu';
import { label } from './calculations/display';

import { userPrefs, updateTheme, theme, toggleMute, updateCurrentTeam, updateCurrentChar, updateCurrentTab } from './usePrefs';
import { statType } from './calculations/types';
import FileUpload from './components/file-upload/file-upload';
import SelectionMenu from './components/selection-menu/selection-menu';
import CardPlaceholderChar from './components/card/placeholder-char/placeholder-char';
import WeaponCard from './components/card/weapon/weapon';
import statMatrix from './calculations/statMatrix';
import { stat } from './calculations/classes/stat';
import { attacker, Calculate, target } from './calculations/classes/buff';
import characters from './db/characters';

const NumberButton: Component<{ val: number }> = (props: { val: number }) => {
  const id = `number-${Math.random()}`;
  const change = (addition: number) => {
    let el = document.getElementById(id) as any;
    if (el) el.value = +el.value + addition;
  }

  return (
    <div class="number-button">
      <i class="fa-solid fa-chevron-left" onClick={() => change(-5)} />
      <div class="input-wrapper">
        <input id={id} type="number" value={props.val} />
      </div>
      <i class="fa-solid fa-chevron-right" onClick={() => change(5)} />
    </div>
  );
}

const App = () => {
  var root = document.querySelector(':root') as any;
  var body = document.getElementById("body") as any;
  window.addEventListener("load", () => {
    setLoaded(true);
    setTimeout(() => {
      window.scrollTo(0, 1);
      let i = 0;
      let cap = window.innerWidth > 1200 ? 35 : 20;
      while (i < cap) {
        i++;
        var c = document.createElement("div");
        c.classList.add("circle");
        var cc = document.createElement("div");
        cc.classList.add("circle-container");
        cc.appendChild(c);

        document.getElementById("page")?.appendChild(cc);
      }
      root?.style.setProperty('--working-char-color', `var(--dendro-color)`);
    }, 50);
  });

  const [selectedCharacters, setSelectedCharacters] = createSignal([] as iCharacter[]);
  const [selectedCharacter, setSelectedCharacter] = createSignal(null as iCharacter | null);
  const [selectedArtifacts, setSelectedArtifacts] = createSignal([] as iArtifactJson[]);
  const [selectedWeapon, setSelectedWeapon] = createSignal(undefined as iWeapon | undefined);
  const [showSupport, setShowSupport] = createSignal(false);
  const [showUpload, setShowUpload] = createSignal(false);
  const [showCharacters, setShowCharacters] = createSignal(false);
  const [filterType, setFilterType] = createSignal("");
  const [selectionCount] = createSignal(4);
  const [loaded, setLoaded] = createSignal(false);
  const [fullScreenClass, setFullscreenClass] = createSignal("maximize" as "maximize" | "minimize");
  const [minER, setMinER] = createSignal(100);
  const [showOptimizing, setShowOptimizing] = createSignal(false);
  const [tab, setTab] = createSignal(userPrefs().currentTab || "weapons");
  const [prestine, setPrestine] = createSignal(true);
  const [leftPanel, _setLeftPanel] = createSignal("categories");
  const [panelHistory, _setPanelHistory] = createSignal([] as string[]);

  const nextPanel = (newPanel: string) => {
    _setPanelHistory(p => {
      p.push(leftPanel());
      return p;
    });
    _setLeftPanel(newPanel);
  }
  const previousPanel = () => {
    let pPanel;
    _setPanelHistory(p => {
      pPanel = p.pop();
      return p;
    })
    if (pPanel != undefined) {
      _setLeftPanel(pPanel);
    }
    if (leftPanel() != "characters-list" && showCharacters()) {
      toggleCharacters();
    }
  }


  const toggleFullScreen = () => {
    setFullscreenClass(fullScreenClass() == "maximize" ? "minimize" : "maximize");
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen;
    var cancelFullScreen = doc.exitFullscreen;

    if (!doc.fullscreenElement) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }

  const onSelect = (selected: iCharacter, order: number, selection: iCharacter[]) => {
    updateCurrentTeam(selection.map(s => s.name));
    let removed: boolean = selectedCharacters().includes(selected);
    setSelectedCharacters(selection);
    // set selected character to the first option
    if (removed) {
      let only = selectedCharacters()[0];
      setChar(only)
      return;
    }
    else {
      setChar(selected);
    }
    // close when last slot is selected
    let lastSlot = selectedCharacters().length == selectionCount();
    let wasSelected = !removed;
    let allSelected = selection.length == filteredCharacters().length;
    if ((lastSlot && wasSelected) || allSelected) {
      toggleCharacters();
      return;
    }
  }
  // const sortByName = (): character[] => {
  //   let arr = new Array(...Characters);
  //   arr.concat(Characters);
  //   arr = arr.sort((a, b) => {
  //     if (a.name > b.name) return 1;
  //     else if (b.name > a.name) return -1;
  //     else return 0;
  //   });
  //   return arr;
  // }
  function filteredCharacters() {
    switch (filterType) {
      //case "name": return sortByName();
      default: return AllCharacters();
    }
  }
  function toggleTheme(newTheme?: theme) {
    newTheme ||= userPrefs().theme == "light" ? "dark" : "light";
    updateTheme(newTheme);
    if (userPrefs().theme == "light") {
      root.style.setProperty('--primary-core', 'var(--dark-core-alt)');
      root.style.setProperty('--accent-core', 'var(--light-core)');
      root.style.setProperty('--accent-core-alt', 'var(--light-core)');
      root.style.setProperty('--dendro-color', 'var(--dendro-color-light)');
    }
    else if (userPrefs().theme == "dark") {
      root.style.setProperty('--primary-core', 'var(--light-core)');
      root.style.setProperty('--accent-core', 'var(--dark-core)');
      root.style.setProperty('--accent-core-alt', 'var(--dark-core-alt)');
      root.style.setProperty('--dendro-color', 'var(--dendro-color-dark)');
    }
  }
  function toggleUpload() {
    setShowUpload(!showUpload());
  }
  function toggleSupport() {
    setShowSupport(!showSupport());
  }
  function toggleCharacters() {
    setShowCharacters(!showCharacters());
    // do nothing if menu opened
    if (showCharacters()) {
      nextPanel("characters-list")
      body?.classList.add("tog-top-color");
      root?.style.setProperty('--working-team-bg-opacity', `0.25`);
      setTimeout(() => body?.classList.remove("tog-top-color"), 10);
      return;
    };
    previousPanel()
    setPrestine(false);
    root?.style.setProperty('--working-team-bg-opacity', `1`);

    // is none left? show nada
    let noneLeft = selectedCharacters().length == 0;
    if (noneLeft) {
      setChar(null);
      setPrestine(true);
      return;
    }

    let ch = selectedCharacter();
    // is the current character not in the new selection?
    let charWasRemoved = ch && selectedCharacters().findIndex(s => s.name === ch?.name) == -1;

    if (charWasRemoved) {
      let newChar = selectedCharacters()[0];
      setChar(newChar);
      return;
    }
    if (ch) {
      setChar(ch);
    }
  }
  function setBackground(char: iCharacter | null) {
    body?.classList.add("tog-bg");
    root?.style.setProperty('--working-team-bg', `url("${char?.imgs.splash}")`);
    root?.style.setProperty('--working-char-color', `var(--${char?.el || 'dendro-color'})`);
    setTimeout(() => body?.classList.remove("tog-bg"), 10);
  }
  function workingCharClick(char: iCharacter) {
    if (showCharacters()) toggleCharacters();
    if (selectedCharacter()?.name != char.name) {
      var workingTeam = document.getElementById("working-team");
      setTimeout(() => {
        setChar(char);
        workingTeam?.scrollIntoView();
      });
    }
  }
  function setChar(char: iCharacter | null) {
    setSelectedCharacter(char);
    if (char) {
      updateCurrentChar(char.name);
      setSelectedArtifacts(FindArtifacts(char.name));
      setSelectedWeapon(FindWeapons(char.name));
    }
    setBackground(char);
  }
  function hideAllMenus() {
    if (showCharacters()) {
      toggleCharacters();
      playClick(6);
    }
    if (showSupport()) {
      toggleSupport();
      playClick(1);
    }
    if (showUpload()) {
      toggleUpload();
      playClick(1);
    }
  }
  function assignArtifactToCharacter(artifact: { slotKey: string, id?: number }) {
    console.log(artifact, selectedCharacter()?.name)
    let charName = selectedCharacter()?.name;
    if (charName) {
      assignArtifact(charName, artifact);
    }
  }

  function CalculateValue() {
    let notSelectedCharacter = [];
    for (var character of selectedCharacters()) {
      if (character.name == selectedCharacter()?.name) continue;
      let slot = {
        character,
        weapon: FindWeapons(character.name),
        artifacts: FindArtifacts(character.name),
      }
      notSelectedCharacter.push(slot);
    }
    let baseAtk: stat = new stat("atk", selectedCharacter()?.atk || 0);
    let weapAtk: stat = new stat("atk", selectedWeapon()?.baseAtk || 0);
    let weapSub: stat = new stat(selectedWeapon()?.substatType as any, selectedWeapon()?.substat as any);
    let ascStat: stat = new stat(selectedCharacter()?.ascStat as any, selectedCharacter()?.ascVal as any);
    for (let ef of selectedWeapon()?.effects || []) {
      //if (ef.condition({} as any, 0)) 
    }
    let artiStats = selectedArtifacts().map(a => new stat(a.mainStatKey, statMatrix.Main[a.mainStatKey][a.level]));
    let artiSubStats = []
    for (let sel of selectedArtifacts()) {
      for (let sub of sel.substats) {
        artiSubStats.push(new stat(sub.key, sub.value));
      }
    }
    let allStats = [weapSub, ascStat, ...artiStats, ...artiSubStats];
    let atk = allStats.filter(s => s.type == "atk").reduce((partialSum, a) => partialSum + a.value, 0);
    let atk_ = allStats.filter(s => s.type == "atk_").reduce((partialSum, a) => partialSum + a.value, 0);
    let hp = allStats.filter(s => s.type == "hp").reduce((partialSum, a) => partialSum + a.value, 0);
    let hp_ = allStats.filter(s => s.type == "hp_").reduce((partialSum, a) => partialSum + a.value, 0);

    let a: attacker = {
      lv: selectedCharacter()?.json.level || 90,
      motion_val: 0.994,
      stat: Calculate.totalStat(baseAtk.value + weapAtk.value, atk_, atk),
      special_multiplier: 1,
      dmg_bonus: 0,
      flat_dmg_bonus: 0,
      res_reduction: 0,
      def_ignore: 0,
      def_reduction: 0
    }
    let t: target = {
      lv: 75,
      res_base: 0.1,
      res_bonus: 0,
      type: 1,
      dmg_reduction: 0
    }
    console.log({ a, t })
    console.log("dmg 75", Math.floor(Calculate.dealingDamage(a, t)))
    t.lv = 82;
    console.log("dmg 82", Math.floor(Calculate.dealingDamage(a, t)))
  }


  let curTeam = userPrefs().currentTeam;
  let curChar = userPrefs().currentCharacter;
  let fOrder: { [key: string]: number } = {};
  let listChars = [];
  let chars = [];
  if (curTeam && curTeam.length > 0) {
    let order = 0;
    for (let char of curTeam) {
      order++;
      let f = FindCharacters(char)
      if (!f) continue;
      chars.push(f);
      listChars.push({ char: f, order });
      fOrder[f.name as string] = order;

      if (curChar == char) {
        setTimeout(() => setChar(f as iCharacter), 1000);
      }
    }
    setSelectedCharacters(chars);
    setPrestine(false);
  }
  const [firstChars] = createSignal(listChars);
  const [firstOrder] = createSignal(fOrder);
  const [firstName] = createSignal(curChar || "");
  // set to other theme if not default
  if (userPrefs().theme == "light") toggleTheme(userPrefs().theme);
  // open upload screen if no data
  if (!AllCharacters()) toggleUpload();

  return (
    <>
      <div id="splash" class={loaded() ? "hidden" : ""}>
        <div>
          <img src="./assets/static/elements/Element_dendro.svg"></img>
          <h1>Dendro Vision</h1>
        </div>
      </div>
      <div id="page" class="background">
        <div id="container" onClick={hideAllMenus} class={showCharacters() ? "hide" : ""}>
          <Show when={!selectedCharacter() && !showCharacters()}>
            <h1 class="select-a-char">Select a Team</h1>
          </Show>
          <Show when={selectedCharacter() != null}>
            <div id="working-team" class={"slide-away" + (leftPanel() == "categories" ? " open" : "")}>
              <MainMenu onClick={[setTab, updateCurrentTab]} startingValue={tab()} />
            </div>
            <div id="calc">
              <Show when={tab() == "attributes"}>
                <section class="talents" style="display: flex; flex-direction: column;padding: 1em 0;">
                  <h1>{selectedCharacter()?.name}</h1>
                  <label>{label[selectedCharacter()?.ascStat as statType]}</label>
                  <label>{selectedCharacter()?.ascVal}</label>
                  <label>{selectedCharacter()?.json.ascension}</label>
                  <label>{selectedCharacter()?.json.level}/90</label>
                  <br></br>
                  <label>{selectedCharacter()?.hp}</label>
                  <label>{selectedCharacter()?.atk}</label>
                  <label>{selectedCharacter()?.def}</label>
                  <label>Elemental Mastery</label>
                  <button>lock artifacts to character</button>
                  <button>lock weapon to character</button>
                </section>
              </Show>
              <Show when={tab() == "weapons"}>
                <For each={selectedCharacters()}>
                  {(char) =>
                    <Show when={char.name == selectedCharacter()?.name}>
                      <WeaponSection weapon={FindWeapons(char.name)} onClick={() => { nextPanel("weapons-list"); }} />
                    </Show>}
                </For>
              </Show>
              <Show when={tab() == "artifacts"}>
                <ArtifactSection charName={selectedCharacter()?.name || ""} onArtifactClick={() => nextPanel("artifacts-list")} />
              </Show>
              <Show when={tab() == "constellation"}>
                <section class="talents">
                  <For each={[1, 2, 3, 4, 5, 6]}>
                    {(num) => <>
                      <div class="part">
                        <div class='talent'>
                          <img class={userPrefs().theme} src={selectedCharacter()?.imgs[`c${num}` as 'c1']} />
                          <p>Constellation Lv. {num}</p>
                        </div>
                      </div>
                      <div class="part effects">
                        <p class="effects">
                          <For each={selectedCharacter()?.constellation[num]}>
                            {(item) => <PEffect count={item.count}>{item.text}</PEffect>}
                          </For>
                        </p>
                      </div>
                    </>}
                  </For>
                </section>
              </Show>
              <Show when={tab() == "talents"}>
                <section class="talents">
                  <div class="part">
                    <div class='talent'>
                      <img class={userPrefs().theme} src={selectedCharacter()?.imgs.t1} />
                      <p>Lv. {selectedCharacter()?.json.talent.auto}</p>
                    </div>
                  </div>
                  <div class="part effects">
                    <p class="effects">
                      <For each={selectedCharacter()?.talents.auto}>
                        {(item) => <PEffect count={item.count}>{item.text}</PEffect>}
                      </For>
                    </p>
                  </div>
                  <div class="part">
                    <div class='talent'>
                      <img class={userPrefs().theme} src={selectedCharacter()?.imgs.t2} />
                      <p>Lv. {selectedCharacter()?.json.talent.skill}</p>
                    </div>
                  </div>
                  <div class="part effects">
                    <p class="effects">
                      <For each={selectedCharacter()?.talents.skill}>
                        {(item) => <PEffect count={item.count}>{item.text}</PEffect>}
                      </For>
                    </p>
                  </div>
                  <div class="part">
                    <div class='talent'>
                      <img class={userPrefs().theme} src={selectedCharacter()?.imgs.t3} />
                      <p>Lv. {selectedCharacter()?.json.talent.burst}</p>
                    </div>
                  </div>
                  <div class="part effects">
                    <p class="effects">
                      <For each={selectedCharacter()?.talents.burst}>
                        {(item) => <PEffect count={item.count}>{item.text}</PEffect>}
                      </For>
                    </p>
                  </div>
                </section>
              </Show>
              <Show when={tab() == "conditions"}>
                <section>
                  <div class="req">
                    <label>Minimum Energy Recharge</label>
                    <div class="number-button">
                      <i class="fa-solid fa-chevron-left" onClick={() => setMinER(minER() - 5)} />
                      <div class="input-wrapper">
                        <input type="number" value={minER()} />
                      </div>
                      <i class="fa-solid fa-chevron-right" onClick={() => setMinER(minER() + 5)} />
                    </div>
                  </div>
                  <div class="req">
                    <label>Minimum CRIT Rate</label>
                    <NumberButton val={100} />
                  </div>
                  <div class="req">
                    <label>Reaction</label>
                    <ReactionSelection trigger={selectedCharacter()?.el} />
                  </div>
                  <div class="req">
                    <label>Scaling</label>
                    <label>ATK</label>
                  </div>
                  {/* <ul>
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <div class="numbers">
                      <label>1,237,011</label>
                      <label class="dif">+10,890</label>
                    </div>
                  </ul>
                  <ul>
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <CardPlaceholderCalc clickSound={() => playClick(2)} onClick={() => { }} />
                    <div class="numbers">
                      <label>1,226,121</label>
                      <label class="dif">+6,890</label>
                    </div>
                  </ul> */}
                  <button style="margin-bottom: 1em;width: 100%;" onClick={CalculateValue}>Begin Optimizing for {selectedCharacter()?.name}</button>
                </section>
              </Show>
            </div>
          </Show>
        </div>
        <div id="bottom-chars" class={(showCharacters() ? "hide" : '') + (prestine() ? " prestine" : ' dirty')}>
          <ul class='character-container'>
            <For each={selectedCharacters()}>{(char, i) =>
              <Show when={selectedCharacters()[i()] != undefined}>
                <CharacterCard char={char} onClick={() => workingCharClick(char)} />
              </Show>
            }</For>
            <For each={new Array(selectionCount() - selectedCharacters().length)}>
              {() => <CardPlaceholderChar onClick={toggleCharacters} />}
            </For>
          </ul>
          <i class="team fa-solid fa-people-group"></i>
        </div>
      </div>
      {/* AFTER PAGE (ABSOLUTE) */}
      <SelectionMenu active={leftPanel()} setActive={previousPanel} key={"characters-list"}>
        <CharacterContainer onSelect={onSelect} selectionCount={4} characters={AllCharacters()} startValues={[firstChars(), firstOrder(), firstName()]} />
      </SelectionMenu>
      <SelectionMenu active={leftPanel()} setActive={previousPanel} key={"artifacts-list"}>
        <ArtifactSelection onClick={assignArtifactToCharacter} />
      </SelectionMenu>
      <SelectionMenu active={leftPanel()} setActive={previousPanel} key={"weapons-list"}>
        <div class="artifact-selection-menu">
          <CardPlaceholderCalc onClick={() => { }} clickSound={() => playClick(2)} />
          <For each={AllWeapons(selectedWeapon()?.weaponType)}>
            {(iWeapon: iWeapon) => <WeaponCard weapon={iWeapon} clickSound={() => playClick(2)} onClick={() => { }} showOwner={true} />}
          </For>
        </div>
      </SelectionMenu>
      <div class={"toolbar fixed" + (showCharacters() ? " always" : "")}>
        <button class="minimal" onClick={toggleFullScreen}>
          <i class={`fa-solid fa-${fullScreenClass()}`} />
        </button>
        <button class="minimal" onMouseUp={() => playClick(1)} onClick={toggleSupport}>
          <i class="fa-solid fa-gear" />
        </button>
        <button class="minimal" onClick={toggleCharacters} onMouseUp={() => playClick(6)}>
          <i class={"fa fa-" + (showCharacters() ? "share" : "grip")} />
        </button>
      </div>
      <Show when={showSupport()}>
        <Model close={() => setShowSupport(false)}>
          <h2>Find this useful?</h2>
          <ul>
            <button class="minimal left cap highlight" onMouseUp={() => playClick(1)} onClick={() => toggleTheme()}>
              <i class={`fa-${userPrefs().theme == "dark" ? "solid" : "regular"} fa-moon`} />
              <label>{userPrefs().theme}</label>
            </button>
            <button class="minimal left cap highlight" onMouseUp={() => playClick(1)} onClick={() => { toggleUpload(); setShowSupport(false); }}>
              <i class="fa-solid fa-file-import" />
              <label>load artifacts</label>
            </button>
            <button class="minimal left cap highlight" onMouseUp={() => playClick(1)} onClick={toggleMute}>
              <i class={`fa-solid fa-volume-${userPrefs().audioMute ? "off" : "high"}`} />
              <label>{userPrefs().audioMute ? "off" : "on"}</label>
            </button>
            <button class="minimal left highlight" onMouseUp={() => playClick(1)}>
              <i class="fa fa-envelope" />
              <label>adamstokes@duck.com</label>
            </button>
            <button class="minimal left cap highlight" onMouseUp={() => playClick(1)}>
              <i class="fa fa-mug-hot" />
              <label>thing</label>
            </button>
          </ul>
        </Model>
      </Show>
      <Show when={showUpload()}>
        <Model close={() => setShowUpload(false)}>
          <h2>Load Artifacts</h2>
          <p class="warning">WARNING: This will overwrite your current artifact list</p>
          <FileUpload onComplete={() => setShowUpload(false)} />
          <ul>
            <button class="minimal highlight" onClick={() => window.open("https://artiscan.ninjabay.org", "_blank")}>Artiscan (browser based)</button>
            <button class="minimal highlight" onClick={() => window.open("https://github.com/Andrewthe13th/Inventory_Kamera", "_blank")}>Inventory Kamera</button>
            <button class="minimal highlight" onClick={() => window.open("https://github.com/D1firehail/AdeptiScanner-GI", "_blank")}>AdeptiScanner</button>
          </ul>
          <input id="dropClick" type="file" style="display: none;" accept="application/json" />
        </Model>
      </Show>
    </>
  );
}
export default App;