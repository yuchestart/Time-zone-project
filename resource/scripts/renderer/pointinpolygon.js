function detectPinP(poly, n, p){
    function onLine(l1, p)
    {
        if (p[0] <= Math.max(l1[0][0], l1[1][0])
            && p[0] >= Math.min(l1[0][0], l1[1][0])
            && (p[1] <= Math.max(l1[0][1], l1[1][1])
                && p[1] >= Math.min(l1[0][1], l1[1][1])))
            return true;
    
        return false;
    }
    function direction(a, b, c)
    {
        let val = (b[1] - a[1]) * (c[0] - b[0])
                - (b[0] - a[0]) * (c[1] - b[1]);
        if (val == 0)
            return 0;
        else if (val < 0)
            return 2;
        return 1;
    }
    function isIntersect(l1, l2)
    {
        //console.log(l1,l2)
    	let dir1 = direction(l1[0], l1[1], l2[0]);
    	let dir2 = direction(l1[0], l1[1], l2[1]);
    	let dir3 = direction(l2[0], l2[1], l1[0]);
    	let dir4 = direction(l2[0], l2[1], l1[1]);
    	if (dir1 != dir2 && dir3 != dir4)
    		return true;
    	if (dir1 == 0 && onLine(l1, l2[0]))
    		return true;
    	if (dir2 == 0 && onLine(l1, l2[1]))
    		return true;
    	if (dir3 == 0 && onLine(l2, l1[0]))
    		return true;
    	if (dir4 == 0 && onLine(l2, l1[1]))
    		return true;
    
    	return false;
    }
	let tmp=[100000000.0, p[1]];
	let exline = [ p, tmp ];
	let count = 0;
	let i = 0;
	do {
		var side = [poly[i], poly[(i + 1) % n] ];
		if (isIntersect(side, exline)) {
			if (direction(side[0], p, side[1]) == 0)
				return onLine(side, p);
			count++;
		}
		i = (i + 1) % n;
	} while (i != 0);
	return count && 1;
}

function getTimezoneOfCoordinates(lat,long){
    var features = timezones.features;
    for(var i=0; i<features.length; i++){
        var polygon = [];
        var coordinates = features[i].geometry.coordinates
        console.log(i)
        console.log(features[i].properties)
        if(features[i].geometry.type == "MultiPolygon"){
            for(var j=0; j<coordinates.length; j++){
                polygon.push(...coordinates[j][0])

            }
        } else {
                polygon.push(...coordinates[0])
        }
        
        console.log(polygon)
        if(detectPinP(polygon,polygon.length,[long,lat])){
            return features[i].properties.ZONE_
        }
    }
}
loadedScripts+=1;