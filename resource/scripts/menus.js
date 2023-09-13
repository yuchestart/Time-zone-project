let CURRENT_MENU_TYPE = null;
let MENU_RETURN_DATA = {};
function openMenus(type){
    var uioptions = $("menu-ui",$("menus").id).class;
    for(var i=0; i<uioptions.length; i++){
        uioptions.hidden = true;
    }
    MENU_RETURN_DATA = {}
    switch(type){
        case Enum.ADD_TABLE_ELEMENT:
            $("menu-addtableelement",$("menus").id).class[0].hidden = false;
            CURRENT_MENU_TYPE = Enum.ADD_TABLE_ELEMENT;
            break;
        default:
            console.warn("Invalid menu type")
    }
    $("menus").id.hidden = false
}
function menubuttonresponse(){
    switch(this.className){
        case "menu-button-ok":
            if(CURRENT_MENU_TYPE==Enum.ADD_TABLE_ELEMENT){
                new TableElement(MENU_RETURN_DATA)
            }
            break;
    }
}
function closeMenus(){
    $("menus").id.hidden = true;
}
uiInitScripts.push(function(){

})
loadedScripts+=1;