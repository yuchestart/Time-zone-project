let CURRENT_MENU_TYPE = null;
let MENU_RETURN_DATA = {};
function openMenus(type){
    var uioptions = $("menu-ui",$("menus").id).class;
    for(var i=0; i<uioptions.length; i++){
        uioptions[i].hidden = true;
    }
    console.log(uioptions)
    MENU_RETURN_DATA = {}
    switch(type){
        case Enum.ADD_TABLE_ELEMENT:
            $("menu-addtableelement",$("menus").id).class[0].hidden = false;
            MENU_RETURN_DATA.tableElementType = "city"
            CURRENT_MENU_TYPE = Enum.ADD_TABLE_ELEMENT;
            break;
        case Enum.RENAME_TABLE_ELEMENT:
            $("menu-renametableelement",$("menus").id).class[0].hidden = false;
            MENU_RETURN_DATA.returnname = ""
            CURRENT_MENU_TYPE = Enum.RENAME_TABLE_ELEMENT;
            break
        case Enum.
        default:
            console.warn("Invalid menu type")
    }
    $("menus").id.hidden = false
}
function menubuttonresponse(e){
    var classnames = e.target.className.split(" ");
    switch(classnames[1]){
        case "menu-button-ok":
            if(CURRENT_MENU_TYPE==Enum.ADD_TABLE_ELEMENT){
                switch(MENU_RETURN_DATA.tableElementType){
                    case "city":
                        if(!MENU_RETURN_DATA.city){

                        }
                        var citytext = "";
                        for(var i=0; i<MENU_RETURN_DATA.city.length; i++){
                            citytext+=MENU_RETURN_DATA.city[i];
                            if(i<MENU_RETURN_DATA.city.length-1){
                                citytext+=", "
                            }
                        }
                        new TableElement(`${citytext}`,MENU_RETURN_DATA.timezone*60)
                        break;
                    case "timezone":
                        if($("menu-add-table-element-utc-selector").class[0].checkValidity())
                        var minusplus = $("menu-add-table-element-utc-selector").class[0].value;
                        var hour = $("menu-add-table-element-hours").class[0].value;
                        var minutes = $("menu-add-table-element-minutes").class[0].value;
                        new TableElement(`UTC${minusplus}${hour-10<0?"0"+hour.toString():hour}${(minutes-minutes%10)==0?"0"+minutes.toString():minutes}`,
                        -(hour*60+minutes))
                        break;
                    case "map":
                        break;
                }
            } else if (CURRENT_MENU_TYPE == Enum.RENAME_TABLE_ELEMENT){

            }
            break;
    }
    closeMenus();
}
function closeMenus(){
    MENU_RETURN_DATA = {}
    var inputs = $("input",$("menus").id).tag;
    for(var i=0; i<inputs.length; i++){
        inputs[i].value = ""
    }
    $("menus").id.hidden = true;
}
uiInitScripts.push(function(){
    var menubuttons = $("menu-button").class;
    for(var i=0; i<menubuttons.length; i++){
        menubuttons[i].onclick = menubuttonresponse;
    }
})
loadedScripts+=1;