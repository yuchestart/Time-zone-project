
const EPSILON = 300;
let start = {};
let ctx,canvas,globalOffset,initialZoom,zoom = 0,prevZoom = 0,tempGlobalOffset;
let numberOfevents = 0;
function drawWorldMap(){
    if(currentScreen!="worldclock"){
        return
    }
    var canvasSize = recalibrate()
    globalOffset[0] = globalOffset[0]%400
    tempGlobalOffset[0] = tempGlobalOffset[0]%400
    initialZoom = canvasSize[0]/400
    var totalZoom = initialZoom+zoom
    var offset = [globalOffset[0]+tempGlobalOffset[0],globalOffset[1]+tempGlobalOffset[1]]
    offset[1] = clamp(offset[1],100,-100)
    renderShape(ctx,countries,1,totalZoom,offset,"#e8f8e9","black");
    renderShape(ctx,countries,1,totalZoom,[offset[0]-400,offset[1]],"#e8f8e9","black")
    renderShape(ctx,countries,1,totalZoom,[offset[0]+400,offset[1]],"#e8f8e9","black")
    for(var i=0; i<table.length; i++){
        if(table[i].latlong[0] !== null){
            var point = convertToXY(table[i].latlong[0],table[i].latlong[1],ctx,initialZoom+zoom,offset);
            ctx.font = "0.8em sans-serif"
            var text = `${table[i].timenow.returnSimplifiedString()}`
            var textlength = ctx.measureText(text).width/2
            ctx.beginPath()
            ctx.moveTo(point[0],point[1])
            ctx.lineTo(point[0]+7,point[1]-7)
            ctx.lineTo(point[0]+textlength+3,point[1]-6)
            ctx.lineTo(point[0]+textlength+3,point[1]-25)
            ctx.lineTo(point[0]-textlength-7,point[1]-25)
            ctx.lineTo(point[0]-textlength-7,point[1]-6)
            ctx.lineTo(point[0]-7,point[1]-7)
            ctx.closePath()
            ctx.fillStyle = "white"
            ctx.fill()
            ctx.fillStyle = "black"
            ctx.fillText(text,point[0]-textlength-3,point[1]-10)
        }
    }
    requestAnimationFrame(drawWorldMap)
}
function distance(event){
    return Math.sqrt(
        (event.touches[0].pageX - event.touches[1].pageX)**2+
        (event.touches[0].pageY - event.touches[1].pageY)**2
    );
}
function pdownhandler(event){
    
    if(event.touches.length === 2){
        event.preventDefault();
        start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        start.distance = distance(event);
    } else {
        start.x = event.touches[0].pageX
        start.y = event.touches[0].pageY
    }
    numberOfevents++;
}
function pmovehandler(event){
    if(event.touches.length === 2){
        event.preventDefault();
        let scale;
        if (event.scale) {
          scale = event.scale;
        } else {
          const deltaDistance = distance(event);
          scale = deltaDistance / start.distance;
        }
        const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x)/2;
        const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y);
        tempGlobalOffset = [deltaX,deltaY]
        zoom = scale-1+prevZoom;
        zoom = clamp(zoom,10,0);
    } else {
        const deltaX = (event.touches[0].pageX - start.x)/(zoom+1);
        const deltaY = (event.touches[0].pageY - start.y)/(zoom+1);
        tempGlobalOffset = [deltaX,deltaY]
    }
}
function puphandler(event){
    prevZoom = zoom;
    globalOffset = [globalOffset[0]+tempGlobalOffset[0],globalOffset[1]+tempGlobalOffset[1]];
    globalOffset[1] = clamp(globalOffset[1],100,-100)
    tempGlobalOffset = [0,0]
    if(event.touches.length === 1){
        start.x=event.touches[0].pageX
        start.y=event.touches[0].pageY
    }
    numberOfevents--;
}
function setupGestures(){
    canvas.ontouchstart = pdownhandler;
    canvas.ontouchmove = pmovehandler;
    canvas.ontouchend = puphandler;
}
function adjustZoom(x,e,zoomin = true){
    if(numberOfevents == 0){
        zoom += x;
        zoom = clamp(zoom,10,0);
    }
}
uiInitScripts.push(function(){
    $("worldmapbutton-zoomin").class[0].onclick = function(e){
        adjustZoom(1,e);
        
    }
    $("worldmapbutton-zoomout").class[0].onclick = function(e){
        adjustZoom(-1,e,0);
    }
    $("worldmapbutton-zoomhome").class[0].onclick = function(){
        zoom = 0;
        globalOffset = [0,0];
    }
    globalOffset = [0,0]
    tempGlobalOffset = [0,0]
    canvas = $("worldmap").id
    ctx=canvas.getContext("2d");
    onNavigate.worldclock = drawWorldMap;
    setupGestures()
})
