
const EPSILON = 300;
let start = {};
let ctx,canvas,globalOffset,initialZoom,zoom = 0,prevZoom = 0,tempGlobalOffset;

function drawWorldMap(){
    if(currentScreen!="worldclock"){
        return
    }
    //globalOffset[0]+=15
    
    var canvasSize = recalibrate()
    //console.log(canvasSize)
    globalOffset[0] = globalOffset[0]%400
    globalOffset[1] = clamp(globalOffset[1],-100,100)
    tempGlobalOffset[0] = tempGlobalOffset[0]%400
    tempGlobalOffset[1] = clamp(tempGlobalOffset[1],-100,100)
    initialZoom = canvasSize[0]/400
    var offset = [globalOffset[0]+tempGlobalOffset[0],globalOffset[1]+tempGlobalOffset[1]]
    renderShape(ctx,countries,1,initialZoom+zoom,offset,"#e8f8e9","black");
    renderShape(ctx,countries,1,initialZoom+zoom,[offset[0]-400,offset[1]],"#e8f8e9","black")
    renderShape(ctx,countries,1,initialZoom+zoom,[offset[0]+400,offset[1]],"#e8f8e9","black")
    for(var i=0; i<table.length; i++){
        if(table[i].latlong[0] !== null){
            var point = convertToXY(table[i].latlong[0],table[i].latlong[1],ctx,initialZoom+zoom,offset);
            ctx.font = "15px sans-serif"
            var text = `${table[i].location} ${table[i].timenow.returnSimplifiedString(false)}`
            var textlength = ctx.measureText(text).width/2
            //console.log(point,textlength)
            ctx.beginPath()
            ctx.moveTo(point[0],point[1])
            ctx.lineTo(point[0]+7,point[1]-7)
            ctx.lineTo(point[0]+textlength+7,point[1]-6)
            ctx.lineTo(point[0]+textlength+7,point[1]-25)
            ctx.lineTo(point[0]-textlength-7,point[1]-25)
            ctx.lineTo(point[0]-textlength-7,point[1]-6)
            ctx.lineTo(point[0]-7,point[1]-7)
            ctx.closePath()
            ctx.fillStyle = "white"
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.fill()
            ctx.stroke()
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
        const deltaX = (event.touches[0].pageX - start.x)/2/(zoom+1);
        const deltaY = (event.touches[0].pageY - start.y)/2/(zoom+1);
        tempGlobalOffset = [deltaX,deltaY]
    }
    //console.log(tempGlobalOffset)
}
function puphandler(event){

    prevZoom = zoom;
    globalOffset = [globalOffset[0]+tempGlobalOffset[0],globalOffset[1]+tempGlobalOffset[1]];
    tempGlobalOffset = [0,0]

}
function setupGestures(){
    canvas.ontouchstart = pdownhandler;
    canvas.ontouchmove = pmovehandler;
    canvas.ontouchend = puphandler;
}
uiInitScripts.push(function(){
    globalOffset = [0,0]
    tempGlobalOffset = [0,0]
    canvas = $("worldmap").id
    ctx=canvas.getContext("2d");
    onNavigate.worldclock = drawWorldMap;
    setupGestures()
})
loadedScripts+=1;