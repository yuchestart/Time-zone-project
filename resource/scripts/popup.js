let popupCallback = null;
function openPopup(contents,title,okaycancel=false,callback){
    if(title){
        $("popup-title").class[0].hidden = false;
        $("popup-title").class[0].innerText = title;
    } else {
        $("popup-title").class[0].hidden = true;
    }
    $("popup-content").class[0].innerText = contents;
    $("popup-container").id.hidden = false;
    $("popup-cancel").class.hidden = !okaycancel;
    popupCallback = callback;
}
uiInitScripts.push(function(){
    $("close-popup").class[0].onclick = function(e){
        $("popup-container").id.hidden = true;
        if("popup-ok" in e.target.classList && popupCallback){
            popupCallback();
        }
    }
});
