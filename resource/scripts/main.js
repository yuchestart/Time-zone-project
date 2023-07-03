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

}
//With the loading script, main has to be run immediately after being loaded, because the window.onload event already occured
main();