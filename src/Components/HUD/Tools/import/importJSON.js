export const drawPath = (line) => {
    const points = line.coords
    const color = line.color
    const thickness = line.thickness
    if (!points || points.length === 0) return;

    const strokesLayer = document.getElementById('strokes');

    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', color);
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('stroke-width', thickness);

    const d = points.map((pt, index) => 
        index === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`
    ).join(' ');

    p.setAttribute('d', d);
    strokesLayer.appendChild(p);

    return p;
}








export const importJSON = (self) =>{
    const input = document.createElement('input');
    input.type='file';
    input.accept='.json';
    input.onchange = e=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = evt=>{
            try{
                const data = JSON.parse(evt.target.result)
                const importData = JSON.parse( JSON.stringify(data) )

                data.forEach( (layer,layerIndex)=>{
                    layer.lines.forEach((line,lineIndex)=>{
                        let tmpLine = null
                        line.coords.forEach((coord,coordIndex)=>{
                            importData[layerIndex].lines[lineIndex].coords[coordIndex].x = coord.x * 20
                            importData[layerIndex].lines[lineIndex].coords[coordIndex].y = coord.y * -20
                            tmpLine = importData[layerIndex].lines[lineIndex]
                        })
                      drawPath(tmpLine)
                    })
                })
                self.drawings = importData
                self.history = []
  
            }catch(err){
            }
        }
        reader.readAsText(file);
    };
    input.click();
}