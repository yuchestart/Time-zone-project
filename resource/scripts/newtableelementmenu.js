uiInitScripts.push(function(){
    $("menu-add-table-element-type-selector").class[0].onchange = function(){
        var tabs = $("menu-add-table-element-tab").class;
        var targetmenu = this.value.replace(" ","").toLowerCase()
        for(var i=0; i<tabs.length; i++){
            tabs[i].hidden = true;
        }
        $(`menu-add-table-element-${targetmenu}-tab`).class[0].hidden = false;
        MENU_RETURN_DATA.tableElementType = targetmenu
    }
    $("menu-add-table-element-utc-selector").class[0].onchange = function(){
        if(this.value == "+"){
            $("menu-add-table-element-hours").class[0].setAttribute("max","14")
        }
        if(this.value == "-"){
            $("menu-add-table-element-hours").class[0].setAttribute("max","12")
        }
    }
    $("menu-add-table-element-city-tab-search").class[0].onchange = function(){
        var searchResults = searchCities($("menu-add-table-element-city-tab-search").class[0].value)
        var resultsElement = $("menu-add-table-element-city-tab-search-results").class[0];
        resultsElement.innerHTML = "";
        for(var i=0; i<searchResults.length; i++){
            var searchItem = document.createElement("li");
            searchItem.setAttribute("class","search-result")
            var properties = searchResults[i].properties;
            searchItem.innerText = `${properties.CITY_NAME}${properties.ADMIN_NAME==properties.CITY_NAME?"":", "+properties.ADMIN_NAME}, ${properties.CNTRY_NAME}`;
            resultsElement.appendChild(searchItem)
        }
    }
    var countryselect = $("menu-add-table-element-city-tab-select-country").class[0];
    var countrynamelist = []
    for(var i=0; i<countries.features.length; i++){
        countrynamelist.push(countries.features[i].properties.CNTRY_NAME);
    }
    countrynamelist.sort()
    for(var i=0; i<countrynamelist.length; i++){
        var option = document.createElement("option")
        option.innerText = countrynamelist[i];
        countryselect.appendChild(option);
    }
})
loadedScripts+=1