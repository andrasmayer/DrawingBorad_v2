        console.log("Az eredeti self-be mentett adatot osztani kell 20 szal és az y tengelyt szorozni -1-el. Importnál ezt is figyelembe kell venni")

export const Draw = (self) =>{
 //   console.log(self.drawings)
   // console.log(self.selectedLayers)
    
   // console.log("draw")

  let isCtrlDown = false
  window.addEventListener('keydown', (evt)=>{
      isCtrlDown = true
      togglePan.classList.add("activeButton")
  })
  window.addEventListener('keyup', ()=>{
      isCtrlDown = false
      togglePan.classList.remove("activeButton")
  })

  togglePan.addEventListener('click', (evt)=>{
      isCtrlDown = isCtrlDown === false
      togglePan.classList.toggle("activeButton")
  })

    const svg = document.getElementById('board');

    const strokesLayer = document.getElementById('strokes');
    const colorEl = document.getElementById('color');
    const sizeEl = document.getElementById('size');
    const sizeVal = document.getElementById('sizeVal');
    const undoBtn = document.getElementById('undo');
    const clearBtn = document.getElementById('clear');
    const logBtn = document.getElementById('logData');
    //const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    //const exportLevel = document.getElementById('exportLevel');

    let drawing = false;
    let panning = false;
    let currentPath = null;
    let points = [];
    const history = [];
    const drawings = [];

    let viewBox = {x: -600, y: -400, w: 1200, h: 800};
    svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

    sizeEl.addEventListener('input', () => sizeVal.textContent = sizeEl.value + ' px');




    function svgPoint(evt){
        const pt = svg.createSVGPoint()
        pt.x = evt.clientX; pt.y = evt.clientY
        return pt.matrixTransform(svg.getScreenCTM().inverse())
    }

    function newPath(x, y){
        const p = document.createElementNS('http://www.w3.org/2000/svg','path')
        p.setAttribute('fill','none')
        p.setAttribute('stroke', colorEl.value)
        p.setAttribute('stroke-linecap','round')
        p.setAttribute('stroke-linejoin','round')
        p.setAttribute('stroke-width', sizeEl.value)
        p.setAttribute('d', `M ${x} ${y}`)
        strokesLayer.appendChild(p)
        return p
    }

    function appendToPath(p, x, y){
        p.setAttribute('d', p.getAttribute('d') + ` L ${x} ${y}`);
    }

    function pointerDown(evt){
        if(isCtrlDown === true){
            return
        }
        else{
            evt.preventDefault();
            drawing = true;
            const {x, y} = svgPoint(evt);
            currentPath = newPath(x, y);
            points = [{x, y}];
        }
    }

    function pointerMove(evt){
        if(!drawing || isCtrlDown === true) return
            const {x, y} = svgPoint(evt)
            appendToPath(currentPath, x, y)
            points.push({x,y})
        }

    function pointerUp(){
        //let line = {}
        if(panning){ panning=false; return; }
        if(!drawing|| isCtrlDown === true) return
        drawing = false
        history.push(currentPath)
        drawings.push([...points])


        currentPath = null

        const line = {
            color : colorEl.value,
            thickness : sizeEl.value,
            coords : [...points]
        }

        self.drawings[self.activeLayer].lines.push(line)
    }

    function undo(){
        const last = history.pop()
        if(last) strokesLayer.removeChild(last)
        drawings.pop()
    }

    function clearAll(){
        strokesLayer.innerHTML = ''
        history.length = 0
        drawings.length = 0
    }


    function importJSON(){
        const input = document.createElement('input');
        input.type='file';
        input.accept='.json';
        input.onchange = e=>{
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = evt=>{
            try{
                const data = JSON.parse(evt.target.result);
                clearAll();
                data.forEach(path=>{
                if(path.length===0) return;
                const p = newPath(path[0].x,path[0].y);
                const pts = [{x:path[0].x,y:path[0].y}];
                for(let i=1;i<path.length;i++){
                    appendToPath(p,path[i].x,path[i].y);
                    pts.push({x:path[i].x,y:path[i].y});
                }
                history.push(p);
                drawings.push(pts);
                });
            }catch(err){
                alert('Hibás JSON');
            }
            };
            reader.readAsText(file);
        };
        input.click();
    }

//    exportBtn.addEventListener('click', ()=>exportJSON(exportLevel.value));
    importBtn.addEventListener('click', importJSON);
    logBtn.addEventListener('click', ()=>console.log(drawings));
    undoBtn.addEventListener('click', undo);
    clearBtn.addEventListener('click', clearAll);






    svg.addEventListener('pointerdown', pointerDown);
    svg.addEventListener('pointermove', pointerMove);
    svg.addEventListener('pointerup', pointerUp);
    svg.addEventListener('pointerleave', pointerUp);



}