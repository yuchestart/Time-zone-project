function storeConfig(){
    localStorage.setItem("config",JSON.stringify(config))
}
function loadConfig(){
    
    var val = localStorage.getItem("config")
    if(val !== null){
        val = JSON.parse(val);
        for(let key in val){
            config[key] = val[key]
        }
        $("select-clock-format").class[0].value = config.uses12hourclock?"12 hours":"24 hours";
        $("select-date-format").class[0].value = config.usesmonthdayyear?"mm/dd/yyyy":"dd/mm/yyyy";
    }
}
uiInitScripts.push(function(){
    $("select-clock-format").class[0].onchange = function(){
        config.uses12hourclock = this.value == "12 hours";
        storeConfig();
    }
    $("select-date-format").class[0].onchange = function(){
        config.usesmonthdayyear = this.value == "mm/dd/yyyy";
        storeConfig();
    }
})
loadedScripts+=1