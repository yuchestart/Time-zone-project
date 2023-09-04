const config = {
    uses12hourclock:0,
    usesmonthdayyear:0
}
let customTime = new Time()
function updateConfig(){
    window.localStorage
}
function $(x,parent){
    return parent?{
        class:parent.getElementsByClassName(x),
        tag:parent.getElementsByTagName(x)
    }:{
        class:document.getElementsByClassName(x),
        tag:document.getElementsByTagName(x),
        id:document.getElementById(x)
    }
}

function main(){
    var mytableelement = new TableElement("Local Time",0,true,true)
    $("setcustomtime").id.onclick = function(){
        
    }
    $("addtotable").id.onclick = function(){
        
    }
    setInterval(updateTable,100)
}
//With the loading script, main has to be run immediately after being loaded, because the window.onload event already occured
setTimeout(main,100)