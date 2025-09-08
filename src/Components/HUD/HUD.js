const {Line} = await import(`./OffCanvas/Line.js${app_version}`)
const {Layers} = await import(`./OffCanvas/Layers/Layers.js${app_version}`)
const {exportJSON} = await import(`./Tools/export/exportJSON.js${app_version}`)

export const HUD = (self) =>{
    const url = new URL(import.meta.url);
    const pathname = url.pathname;        // /js/myModule.js
    const parts = pathname.split('/');
    const fileName = parts.pop();         // myModule.js
    const dirPath = parts.join('/');      // /js

    const Layers_ = new Layers(self)


    self.layerEvents = Layers_.events
    



    return`
    <div>
        ${Line}

        
        ${Layers_.interface()}



        <div class="tool">
            <button id="undo" class="fa fa-undo"></button>
            <button id="clear" class="fa fa-trash"></button>
        </div>
        <div class="tool">
            <label>Export felbontás</label>
            <select id="exportLevel">
            <option value="full" selected>Full</option>
            <option value="mid">Mid</option>
            <option value="low">Low</option>
            <option value="ultra">Ultra Low</option>
            </select>
        </div>
        <div class="tool">
            <button id="exportBtn">Export</button>
            <button id="importBtn">Import</button>
            <button id="logData">Log JSON</button>
            <button id="togglePan">Pan</button>
            </div>
        </header>
        <main id="stage">
            <div class="board-wrap">
                <svg id="board" xmlns="http://www.w3.org/2000/svg">
                <g id="grid"></g>
                <g id="axes"></g>
                <g id="strokes"></g>
                </svg>
            </div>
        </main>
    </div>
        <link href="${dirPath}/HUD.css${app_version}" rel="stylesheet">
        `
}




export const HUD_events = (self) =>{

    const exportBtn = document.getElementById('exportBtn')
    exportBtn.addEventListener('click', ()=>exportJSON(self))



        



}