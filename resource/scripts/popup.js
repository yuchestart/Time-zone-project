function openPopup(contents,title){
    if(title){
        $("popup-title").class[0].hidden = false;
        $("popup-title").class[0].innerText = title;
    } else {
        $("popup-title").class[0].hidden = true;
    }
    $("popup-content").class[0].innerText = contents;
    $("popup-container").id.hidden = false;
}
uiInitScripts.push(function(){
    $("close-popup").class[0].onclick = function(){
        $("popup-container").id.hidden = true;
    }
});
loadedScripts+=1;