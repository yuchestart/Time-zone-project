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

function clamp(x,a,b){
    var max = Math.max(a,b);
    var min = Math.min(a,b);
    if(x>max){
        return max
    }
    if(x<min){
        return min
    }
    return x
}