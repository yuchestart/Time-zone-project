function openPopup(contents,title){
    if(title){
        $("popup-title").class[0].hidden = false;
        $("popup-title").class[0].innerText = title;
    } else {
        $("popup-title").class[0].hidden = true;
    }
    $("popup-content").class[0].innerText = contents;
}