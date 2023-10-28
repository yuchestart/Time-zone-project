const scripturl = "./resource/scripts/"
const styleurl = "./resource/styles/"
const uiInitScripts = [];

const stylelist = [
    "splash.css",
    "settings.css",
    "menu.css",
    "popup.css",
    "worldmap.css",
    "table.css",
    "navbar.css",
    "style.css"
]
let loadedScripts = 0;
let loadedScriptsInterval = null;
function loadScripts(){
    for(var i=0; i<stylelist.length; i++){
        var styler = document.createElement("link");
        styler.rel = "stylesheet";
        styler.href = styleurl+stylelist[i];
        document.getElementsByTagName("head")[0].appendChild(styler)
    }
    loadedScriptsInterval = setTimeout(function(){
        main()
    },1000)
}
window.onload = loadScripts;