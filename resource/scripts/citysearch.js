function searchCities(query,filters){
    var results = [];
    var shortener = /\s|\d|,|-|/gi;
    var city = query.replace(shortener,"").toLowerCase();
    var cityregex = new RegExp(city,"gi")
    var features = cities.features
    var filter = {}
    var lookup = {
        country:"CNTRY_NAME",
        province:"ADMIN_NAME"
    }
    for(const key in filters){
        filter[key] = filters[key].replace(shortener,"").toLowerCase()
    }
    for(var i=0; i<features.length; i++){
        if(cityregex.test(features[i].properties.CITY_NAME)){
            var valid = true;
            for(const key in filter){
                if(features[i].properties[lookup[key]].replace(shortener,"").toLowerCase() !== filter[key]){
                    
                    valid = false
                }
            }
            if(valid){
                results.push(features[i])
            }
        }
    }
    return results;
}
loadedScripts+=1