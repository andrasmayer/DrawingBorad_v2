export const exportJSON = (self) =>{
    const exportLevel = document.getElementById('exportLevel');
    const factorMap = {full:1, mid:5, low:3, ultra:2}
    const factor = factorMap[exportLevel.value] || 1
    const exportData = JSON.parse( JSON.stringify(self.drawings) )

    self.drawings.forEach( (layer,layerIndex)=>{
        layer.lines.forEach((line,lineIndex)=>{
            const filtered = line.coords.filter((p,i)=>i%factor!==0 || factor===1)
            filtered.forEach((coord,index)=>{
                filtered[index].x = Number(filtered[index].x/20).toFixed(2)
                filtered[index].y = Number(filtered[index].y/-20).toFixed(2)
            })
            exportData[layerIndex].lines[lineIndex].coords = filtered
        })
    })
        

    const blob = new Blob([JSON.stringify(exportData,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'drawing.json'
    a.click()
    URL.revokeObjectURL(url)
}