const scripturl = "./resource/scripts/"
const styleurl = "./resource/styles/"
const scriptlist = ["renderer/renderer","renderer/world_timezone","renderer/world_countries","renderer/world_cities","table","time","main"]
const stylelist = ["popup.css","worldmap.css","table.css","navbar.css","style.css"]
function loadScripts(){
    for(var i=0; i<stylelist.length; i++){
        var styler = document.createElement("link");
        styler.rel = "stylesheet"
        styler.href = styleurl+stylelist[i];
        document.getElementsByTagName("head")[0].appendChild(styler)
    }
    for(var i=0; i<scriptlist.length; i++){
        var scripter = document.createElement("script");
        scripter.src = scripturl + scriptlist[i] + ".js";
        scripter.defer = true
        document.getElementsByTagName("head")[0].appendChild(scripter)
    }
}
window.onload = loadScripts;