const config = {
    uses12hourclock:0,
    usesmonthdayyear:0
}

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

function main(){
    var mytableelement = new TableElement("Beijing",-480)
}
//With the loading script, main has to be run immediately after being loaded, because the window.onload event already occured
main();