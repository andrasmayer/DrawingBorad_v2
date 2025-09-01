export const Line = `
<button class="btn btn-primary fa fa-grip-lines" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLines" aria-controls="offcanvasLines"></button>

<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasLines" aria-labelledby="offcanvasLinesLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasLinesLabel">Vonalak</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="tool">
        <label>Szín</label>
        <input id="color" type="color" value="#ffffff" />
    </div>
    <div class="tool">
        <label>Vastagság</label>
        <input id="size" type="range" min="1" max="48" value="2" />
        <span id="sizeVal">2 px</span>
    </div>
  </div>
</div>
`