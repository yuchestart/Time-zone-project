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
function openMenu(type){
    
    const uis = $("div",$("menuflyout",$("menus").id).class[0]).class;
    for(var i=0; i<uis.length; i++){
        uis[i].hidden = true;
        if(uis.className.replace("menu-","") == type){
            uis[i].hidden = false;
        }
    }
}
function closeMenu(){
    $("menus").id.hidden = true;
}
function main(){
    $("splash").id.hidden = true; // Will replace with animation later
    new TableElement("Local Time",0,true,true)
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