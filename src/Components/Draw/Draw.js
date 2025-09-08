export const newPath =(x, y) =>{
        const strokesLayer = document.getElementById('strokes');
        const colorEl = document.getElementById('color');
        const sizeEl = document.getElementById('size');
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

const appendToPath = (p, x, y) =>{
    p.setAttribute('d', p.getAttribute('d') + ` L ${x} ${y}`);
}

const svgPoint = (evt) =>{
    const svg = document.getElementById('board');
    const pt = svg.createSVGPoint()
    pt.x = evt.clientX; pt.y = evt.clientY
    return pt.matrixTransform(svg.getScreenCTM().inverse())
}


export const Draw = (self) =>{
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
    const logBtn = document.getElementById('logData');
    const importBtn = document.getElementById('importBtn');

    let drawing = false;
    let panning = false;
    let currentPath = null;
    let points = [];
    const history = [];
    const drawings = [];

    let viewBox = {x: -600, y: -400, w: 1200, h: 800};
    svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    sizeEl.addEventListener('input', () => sizeVal.textContent = sizeEl.value + ' px');

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

    logBtn.addEventListener('click', ()=>console.log(drawings));
    undoBtn.addEventListener('click', undo);
    svg.addEventListener('pointerdown', pointerDown);
    svg.addEventListener('pointermove', pointerMove);
    svg.addEventListener('pointerup', pointerUp);
    svg.addEventListener('pointerleave', pointerUp);
}