const {HUD,HUD_events} = await import(`./Components/HUD/HUD.js${app_version}`)
const {GRID} = await import(`./Components/HUD/GRID/GRID.js${app_version}`)
const {Draw} = await import(`./Components/Draw/Draw.js${app_version}`)


class CAD{
    constructor(){
        this.root = document.querySelector("#root")
        this.viewBox = {x: -600, y: -400, w: 1200, h: 800}
        this.emptyLayer =   {
                name : "Layer",
                lines : []
                }
       // this.levelOfDetail = 0
        this.selectedLayers = [0]
        this.activeLayer = 0
        this.drawings = [
                {
                name : "Layer",
                lines : []
                }
            ]
        this.history = []
        //this.Draw = Draw
    }
    init(){
        root.innerHTML = HUD(this)
        
        HUD_events(this)
        GRID(this)



        this.layerEvents()

        Draw(this)

    }

}







export const App = () =>{

    const project = new CAD()
    project.init()
    //project.events()



}