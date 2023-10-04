const config = {
    uses12hourclock:0,
    usesmonthdayyear:0
}

let customTime = new Time()
function updateConfig(){
    window.localStorage
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
    //Run UIInit scripts
    for(var i=0; i<uiInitScripts.length; i++){
        uiInitScripts[i]();
    }
    $("splash").id.hidden = true; // Will replace with animation later
    new TableElement("Local Time",0,true,true)
    new TableElement("Coordinated Universal Time",0,true,false)
    $("setcustomtime").id.onclick = function(){
        
    }
    $("addtotable").id.onclick = addTableElement;
    const navbarelements = $("navbaritem",$("navbar").id).class
    for(var i=0; i<navbarelements.length; i++){
        navbarelements[i].onclick = function(){navigate(this.id.replace("nav",""))};
    }
    navigate("table")
    setInterval(updateTable,100)
}
loadedScripts+=1;