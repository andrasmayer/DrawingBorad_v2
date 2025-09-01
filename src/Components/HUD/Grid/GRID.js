const {drawGrid, updateViewBox, wheel} = await import(`./drawGrid.js${app_version}`)
const {pan} = await import(`./pan.js${app_version}`)
export const GRID = (self) =>{
    const viewBox =  self.viewBox
    const svg = document.getElementById('board')
    svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    drawGrid(viewBox);
    svg.addEventListener('wheel', (e)=>{
        wheel(e, viewBox)
    })
    pan(viewBox,updateViewBox)
}