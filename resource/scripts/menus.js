function openMenus(type){
    var uioptions = $("menu-ui",$("menus").id).class;
    for(var i=0; i<uioptions.length; i++){
        uioptions.hidden = true;
    }
    switch(type){
        case Enum.ADD_TABLE_ELEMENT:
            $("menu-addtableelement",$("menus").id).class[0].hidden = false;
            break;
        default:
            console.warn("Invalid menu type")
    }
    $("menus").id.hidden = false
}
function closeMenus(){
    $("menus").id.hidden = true
}
loadedScripts+=1;