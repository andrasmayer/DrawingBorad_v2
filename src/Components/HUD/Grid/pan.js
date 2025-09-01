export const pan = (viewBox, updateViewBox) =>{

    const svg = document.getElementById('board')
    let panStart = {x:0,y:0, viewBox: viewBox};
    let isCtrlDown = false
    const togglePan = document.querySelector("#togglePan")
    const OS = detectMobileOS() 

    if(OS == "Other"){
        svg.addEventListener('pointerdown', (evt)=>{
                 panStart.x = evt.clientX
                panStart.y = evt.clientY
                panStart.viewBox = {...viewBox}
        })
    }

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
    })



    svg.addEventListener('pointermove', (evt)=>{
        if(isCtrlDown === false){
            if(OS == "Desktop"){
                panStart.x = evt.clientX
                panStart.y = evt.clientY
                panStart.viewBox = {...viewBox}
            }
        }
        else{
            const dx = (panStart.x - evt.clientX) * viewBox.w / svg.clientWidth
            const dy = (panStart.y - evt.clientY) * viewBox.h / svg.clientHeight
            viewBox.x = panStart.viewBox.x + dx
            viewBox.y = panStart.viewBox.y + dy
            updateViewBox(viewBox)
        }
    })






}






function detectMobileOS() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(ua) || /iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        return "Other";
    }
    return "Desktop";
}
