# Datatable for nested arrays or array of objects

## Installation
For **vanilla** javascript 
##### &lt;script src="./path/to/dist/tableSorter.min.js"&gt;&lt;/script&gt;

For **ES6 module** structure use <br>
#### &lt;script type="module"&gt;
 const {tableSorter} = await import("./dist/js/tableSorter.js") <br>
**or**<br>
const {tableSorter} = await import("./dist/js/tableSorter.esm.min.js")<br>
#### &lt;/script&gt;


## Usage
    const data = [
        {id:"1", name:"Ed", age:"72.21", position:"Ceo"},
        {id:"2", name:"Tod", age:32, position:"Manager"},
        {id:"3", name:"Helen", age:27, position:"Slave"},
        {id:"4", name:"George", age:20, position:"Slave"},
        {id:"5", name:"Phil", age:44, position:"Slave"},
        {id:"6", name:"Pam", age:40, position:"Slave"},
        {id:"7", name:"Otto", age:41, position:"Slave"},
        {id:"8", name:"Julia", age:43, position:"Slave"},
        {id:"9", name:"Harmony", age:40, position:"Slave"},
        {id:"10", name:"Ted", age:37, position:"Slave"},
        {id:"11", name:"Matt", age:65, position:"Slave"},
        ]
const header = ["ID","Name","Age","Position"]        

const table = new tableSorter({<br>
        &nbsp;&nbsp;&nbsp;target : "#tableTarget", &nbsp;// id if target element<br>
        &nbsp;&nbsp;&nbsp;tableId : "table2", &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// id for your table<br>
       &nbsp;&nbsp;&nbsp;header : header, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// array for header<br>
        &nbsp;&nbsp;&nbsp;dataSet : data, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//array of dataset<br>
      &nbsp;&nbsp;&nbsp;filters : true, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// true/false/no use<br>
        &nbsp;&nbsp;&nbsp;striped: true &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//true/falseno use it<br>
    })
    
                

## Filer options
You can use math operators ( >, >=, <, <= ) in colums are numbers.<br>
Clicking on theads will sort the table alphabetically (asc/desc).<br>
You can add your custom CSS (see the examples) or use a different file.<br>

### +1
I will keep this project updated in the future.<br>
Feel free to share your thoughts or as for another functionaliity.<br><br> 
Throw a feedback to andrasmayer.github@gmail.com<br>

