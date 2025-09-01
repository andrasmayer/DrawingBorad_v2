

function svgPoint(evt){
    const svg = document.getElementById('board');
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse())
    }


export const drawGrid = (viewBox) =>{
    const gridLayer = document.getElementById('grid')
    const axesLayer = document.getElementById('axes')


    gridLayer.innerHTML = '';
    axesLayer.innerHTML = '';
    const spacing = 20;
    const startX = Math.floor(viewBox.x/spacing)*spacing;
    const endX = Math.ceil((viewBox.x+viewBox.w)/spacing)*spacing;
    const startY = Math.floor(viewBox.y/spacing)*spacing;
    const endY = Math.ceil((viewBox.y+viewBox.h)/spacing)*spacing;

    for(let x=startX; x<=endX; x+=spacing){
        const line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1', x); line.setAttribute('y1', startY);
        line.setAttribute('x2', x); line.setAttribute('y2', endY);
        line.setAttribute('stroke', '#6ee7b7');
        line.setAttribute('stroke-width', 0.5);
        gridLayer.appendChild(line);
    }
    for(let y=startY; y<=endY; y+=spacing){
        const line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1', startX); line.setAttribute('y1', y);
        line.setAttribute('x2', endX); line.setAttribute('y2', y);
        line.setAttribute('stroke', '#6ee7b7');
        line.setAttribute('stroke-width', 0.5);
        gridLayer.appendChild(line);
    }

    // X tengely
    const axisX = document.createElementNS('http://www.w3.org/2000/svg','line');
    axisX.setAttribute('x1', startX); axisX.setAttribute('y1', 0);
    axisX.setAttribute('x2', endX); axisX.setAttribute('y2', 0);
    axisX.setAttribute('stroke', '#6ee7b7');
    axisX.setAttribute('stroke-width', 2);
    axesLayer.appendChild(axisX);

    // Y tengely
    const axisY = document.createElementNS('http://www.w3.org/2000/svg','line');
    axisY.setAttribute('x1', 0); axisY.setAttribute('y1', startY);
    axisY.setAttribute('x2', 0); axisY.setAttribute('y2', endY);
    axisY.setAttribute('stroke', '#6ee7b7');
    axisY.setAttribute('stroke-width', 2);
    axesLayer.appendChild(axisY);

    // X koordináták számozása
    for(let x=startX; x<=endX; x+=spacing){
        const t = document.createElementNS('http://www.w3.org/2000/svg','text');
        t.setAttribute('x', x+2);
        t.setAttribute('y', -2);
        t.textContent = Math.round(x/spacing);
        axesLayer.appendChild(t);
    }

    // Y koordináták számozása
    for(let y=startY; y<=endY; y+=spacing){
        const t = document.createElementNS('http://www.w3.org/2000/svg','text');
        t.setAttribute('x', 2);
        t.setAttribute('y', y-2);
        t.textContent = -Math.round(y/spacing);
        axesLayer.appendChild(t);
    }


}


export const  updateViewBox = (viewBox) =>{
    const svg = document.getElementById('board');
    svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    drawGrid(viewBox);
}

export const  wheel = (evt, viewBox) =>{

    evt.preventDefault();
    const scale = evt.deltaY < 0 ? 0.9 : 1.1;
    const {x:mx, y:my} = svgPoint(evt);
    viewBox.x = mx - (mx - viewBox.x) * scale;
    viewBox.y = my - (my - viewBox.y) * scale;
    viewBox.w *= scale;
    viewBox.h *= scale;
    updateViewBox(viewBox);
}



