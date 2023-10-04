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
        //alert("oh HELL naw man")
        var searchResults = searchCities($("menu-add-table-element-city-tab-search").class[0].value,{
            country:MENU_RETURN_DATA.countryfilter,
            province:MENU_RETURN_DATA.provincefilter
        })
        var resultsElement = $("menu-add-table-element-city-tab-search-results").class[0];
        resultsElement.innerHTML = "";
        for(var i=0; i<searchResults.length; i++){
            var searchItem = document.createElement("li");
            searchItem.setAttribute("class","search-result");
            var thisresult = searchResults[i];
            searchItem.onclick = function(){
                MENU_RETURN_DATA.city = this.innerText.split(", ");
                MENU_RETURN_DATA.timezone = thisresult.properties.ZONE_
                $("menu-add-table-element-city-tab-view-city").class[0].innerText = this.innerText;
            }
            var properties = searchResults[i].properties;
            searchItem.innerText = `${properties.CITY_NAME}${properties.ADMIN_NAME==properties.CITY_NAME?"":", "+properties.ADMIN_NAME}, ${properties.CNTRY_NAME}`;
            resultsElement.appendChild(searchItem)
        }
    }
    var countryselect = $("menu-add-table-element-city-tab-select-country").class[0];
    var provinceselect = $("menu-add-table-element-city-tab-select-province").class[0];
    countryselect.onchange = function(){
        if(countryselect.value == "Filter Country"){
            provinceselect.hidden = true
            MENU_RETURN_DATA.countryfilter = false
            return
        }
        provinceselect.hidden = false
        MENU_RETURN_DATA.countryfilter = countryselect.value;
        var adminnames = [];
        provinceselect.innerHTML = `<option class="template-option">Filter Administrative Region</option>`
        var searched = searchCities("",{
            country:MENU_RETURN_DATA.countryfilter
        });
        for(var i=0; i<searched.length; i++){
            if(adminnames.indexOf(searched[i].properties.ADMIN_NAME)===-1){
                adminnames.push(searched[i].properties.ADMIN_NAME)
            }
        }
        adminnames.sort()
        for(var i=0; i<adminnames.length; i++){
            var option = document.createElement("option")
            option.innerText = adminnames[i];
            provinceselect.appendChild(option);
        }
    }
    provinceselect.onchange = function(){
        if(provinceselect.value == "Filter Administrative Region"){
            MENU_RETURN_DATA.provincefilter = false
            return
        }
        MENU_RETURN_DATA.provincefilter = provinceselect.value
    }
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