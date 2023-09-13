uiInitScripts.push(function(){
    $("menu-add-table-element-type-selector").class[0].onchange = function(){
        var tabs = $("menu-add-table-element-tab").class;
        var targetmenu = this.value.replace(" ","").toLowerCase()
        for(var i=0; i<tabs.length; i++){
            tabs[i].hidden = true;
        }
        $(`menu-add-table-element-${targetmenu}-tab`).class[0].hidden = false;
    }
    $("menu-add-table-element-utc-selector").class[0].onchange = function(){
        if(this.value == "+"){
            $("menu-add-table-element-hours").class[0].setAttribute("max","14")
        }
        if(this.value == "-"){
            $("menu-add-table-element-hours").class[0].setAttribute("max","12")
        }
    }
})
loadedScripts+=1