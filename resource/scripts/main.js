const config = {
    uses12hourclock:0,
    usesmonthdayyear:0,
}
let customTime = {
    time:new Time(),
    changed:true
}
function updateConfig(){
    window.localStorage
}
function navigate(x){
    currentScreen = x;
    const sections = $("section",$("ui").id).class
    for(var i=0; i<sections.length; i++){
        sections[i].hidden = true
        if(sections[i].id.replace("section","") == x){
            sections[i].hidden = false
        }
    }
    if(onNavigate[x]){
        onNavigate[x]();
    }
}

function main(){
    //Run UIInit scripts
    for(var i=0; i<uiInitScripts.length; i++){
        uiInitScripts[i]();
    }
    $("splash").id.hidden = true; // Will replace with animation later
    new TableElement("Local Time",0,true,true)
    new TableElement("Coordinated Universal Time",0,true,false)
    $("addtotable").id.onclick = addTableElement;
    const navbarelements = $("navbaritem",$("navbar").id).class
    for(var i=0; i<navbarelements.length; i++){
        navbarelements[i].onclick = function(){navigate(this.id.replace("nav",""))};
    }
    navigate("table")
}
loadedScripts+=1;