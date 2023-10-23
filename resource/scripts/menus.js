let CURRENT_MENU_TYPE = null;
let MENU_RETURN_DATA = {};
function openMenus(type,info){
    var uioptions = $("menu-ui",$("menus").id).class;
    for(var i=0; i<uioptions.length; i++){
        uioptions[i].hidden = true;
    }
    
    MENU_RETURN_DATA = {
        info:info
    }
    switch(type){
        case Enum.ADD_TABLE_ELEMENT:
            $("menu-add-table-element-type-selector").class[0].value = "City";
            $("menu-add-table-element-type-selector").class[0].onchange()
            $("menu-add-table-element-city-tab-select-country").class[0].value = "Filter Country"
            $("menu-add-table-element-city-tab-select-country").class[0].onchange()
            $("menu-add-table-element-city-tab-search-results").class[0].innerHTML = "";
            $("menu-add-table-element-city-tab-view-city").class[0].innerText = "Select a city";
            $("menu-addtableelement",$("menus").id).class[0].hidden = false;
            MENU_RETURN_DATA.tableElementType = "city"
            break;
        case Enum.RENAME_TABLE_ELEMENT:
            $("menu-renametableelement",$("menus").id).class[0].hidden = false;
            MENU_RETURN_DATA.returnname = ""
            
            break;
        default:
            console.warn("Invalid menu type");
            break;
    }
    CURRENT_MENU_TYPE=type;
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
                            openPopup("Please select a city.");
                            return;
                        }
                        var citytext = "";
                        for(var i=0; i<MENU_RETURN_DATA.city.length; i++){
                            citytext+=MENU_RETURN_DATA.city[i];
                            if(i<MENU_RETURN_DATA.city.length-1){
                                citytext+=", "
                            }
                        }
                        new TableElement(`${citytext}`,MENU_RETURN_DATA.timezone*60,false,false,MENU_RETURN_DATA.latlong)
                        break;
                    case "timezone":
                        if($("menu-add-table-element-time").class[0].checkValidity()){
                        var minusplus = $("menu-add-table-element-utc-selector").class[0].value;
                        var hour = $("menu-add-table-element-hours").class[0].value;
                        var minutes = $("menu-add-table-element-minutes").class[0].value;
                        hour = hour.length?hour:"0";
                        minutes = minutes.length?minutes:"0";
                        new TableElement(`UTC${minusplus}${hour-10<0?"0"+hour.toString():hour}:${(minutes-minutes%10)==0?"0"+minutes.toString():minutes}`,
                        (minusplus=="-"?-1:1)*(parseInt(hour)*60+parseInt(minutes)))
                        } else {
                            openPopup("Please select a valid time zone.");
                            return;
                        }
                        break;
                    case "map":
                        break;
                }
            } else if (CURRENT_MENU_TYPE == Enum.RENAME_TABLE_ELEMENT){
                var val = $("menu-rename-table-element-input").class[0].value
                if(val){
                    table[MENU_RETURN_DATA.info.idx].rename(val);
                } else {
                    openPopup("Choose a name or press cancel if you don't want to rename.");
                    return;
                }
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