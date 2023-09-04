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
function navigate(x){
    const sections = $("section",$("ui").id).class
    for(var i=0; i<sections.length; i++){
        sections[i].hidden = true
        if(sections[i].id.replace("section","") == x){
            sections[i].hidden = false
        }
    }
}
function main(){
    $("splash").id.hidden = true; // Will replace with animation later
    new TableElement("Local Time",0,true,true)
    $("setcustomtime").id.onclick = function(){
        
    }
    $("addtotable").id.onclick = function(){
        
    }
    const navbarelements = $("navbaritem",$("navbar").id).class
    for(var i=0; i<navbarelements.length; i++){
        navbarelements[i].onclick = function(){navigate(this.id.replace("nav",""))};
    }
    setInterval(updateTable,100)
}
//With the loading script, main has to be run immediately after being loaded, because the window.onload event already occured
setTimeout(main,100)