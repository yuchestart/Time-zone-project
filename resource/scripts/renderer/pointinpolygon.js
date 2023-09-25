function detectPinP(p,polygon){
    function detectIntersection(p1,p2,p3,p4){
        function onSegment(p,q,r){
            return (q[0] <= Math.max(p[0],r[0])&&q[0]>=Math.min(p[0],r[0])&&
               q[1] <= Math.max(p[1],r[1])&&q[1]>=Math.min(p[1],r[1]))
        }
        function orientation(p,q,r){
            let val = ((q[1]-p[1])*(r[0]-q[0]))-((q[0]-p[0])*(r[1]-q[1]))
            if(val==0) return 0;
            return (val > 0)? 1: 2;
        }
        let o = [
            orientation(p1,p3,p2),
            orientation(p1,p3,p4),
            orientation(p2,p4,p1),
            orientation(p2,p4,p3)
        ];
        if(o[0]!=o[1] && o[2]!=o[3]){
            return true;
        }
        if (o[0]==0 && onSegment(p1,p2,p3)) return true;
        if (o[0]==0 && onSegment(p1,p4,p3)) return true;
        if (o[0]==0 && onSegment(p2,p1,p4)) return true;
        if (o[0]==0 && onSegment(p2,p3,p4)) return true;
        return false;
    }
    var max = 0;
    for(var i=0; i<polygon.length; i++){
        if(polygon[i][0] > max){
            max = polygon[i][0]
        }
    }
    var line = [p,[max+5,p[1]]];
    var intersections = 0;
    for(var i=0; i<polygon.length; i++){
        if(i<polygon.length-1){
            intersections+=detectIntersection(line[0],line[1],polygon[i],polygon[i+1])
        } else {
            intersections+=detectIntersection(line[0],line[1],polygon[i],polygon[0])
        }
    }
    return intersections%2
}
loadedScripts+=1;