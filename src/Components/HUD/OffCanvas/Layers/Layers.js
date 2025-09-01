export class Layers {
  constructor(self){
    this.self = self
    this.selectedLayers = this.self.selectedLayers
    self.drawLayers = this.drawLayers
    self.events = this.events
    self.interface = this.interface
    this.activeLayer = self.activeLayer
  }

  interface(){
    return `
      <button class="btn btn-primary fa fa-layer-group" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLayers" aria-controls="offcanvasLayers"></button>

      <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasLayers" aria-labelledby="offcanvasLayersLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasLayersLabel">Szintek</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <button class="fa fa-plus btn btn-primary newLayer"></button>
          <div class="mt-3 layerCtn">
            ${this.drawLayers(this.self.drawings) }
          </div>
        </div>
      </div>
      `
  }

  drawLayers(drawings){
    let context = ""
    drawings.forEach((itm,key) => {
      const isChecked = this.selectedLayers.includes(key) === true ? "checked" : ""
      const isActive = this.activeLayer == key ? `bg-secondary text-light` : ""

      context += `<div class="row mt-1">
                    <div class="col-9">
                      <input value="${itm.name}" class="form-control ${isActive} layerName">
                    </div>
                    <div class="col-2">
                      <label>(${itm.lines.length})</label>
                    </div>
                    <div class="col-1">
                      <input type="checkbox" ${isChecked} style="width: 30px; height: 30px;" class="float-end layerStatus">
                    </div>
                  </div>`
    })
    return context
  }
  events(){
    const layerCtn = document.querySelector(".layerCtn")
    const newLayer = document.querySelector(".newLayer")
    newLayer.addEventListener("click",()=>{
      const emptyLayer = JSON.parse(JSON.stringify(this.emptyLayer))
      this.drawings.push(emptyLayer)
      layerCtn.innerHTML = this.drawLayers(this.drawings)
      this.events()
    },{ once: true })
    

    const layerName = document.querySelectorAll(".layerName")
    layerName.forEach((itm,key)=>{
      itm.addEventListener("keyup",()=>{
        this.drawings[key].name = itm.value
      })
      itm.addEventListener("click",()=>{
        layerName.forEach((itm,key)=>{
          itm.classList.remove("bg-secondary","text-light")
        })
        itm.classList.add("bg-secondary","text-light")
        this.activeLayer = key
      })
    })

    const layerStatus = document.querySelectorAll(".layerStatus")
    layerStatus.forEach((itm,key)=>{
      itm.addEventListener("change",()=>{
        if(this.selectedLayers.includes(key) === true && itm.checked === true){
          this.selectedLayers.push(key)
        }
        else if(this.selectedLayers.includes(key) === true && itm.checked === false){
            const index = this.selectedLayers.indexOf(key);
            if (index !== -1) {
              this.selectedLayers.splice(index, 1);
            }
        }
        else if(this.selectedLayers.includes(key) === false){
          this.selectedLayers.push(key)
        }
      })
    })
  }
}


