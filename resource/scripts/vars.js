const Enum = {
    ADD_TABLE_ELEMENT:0,
    RENAME_TABLE_ELEMENT:1,
    SET_CUSTOM_TIME:2,
}
const uiInitScripts = [];
const onNavigate = {};
let currentScreen = "table";
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
loadedScripts+=1