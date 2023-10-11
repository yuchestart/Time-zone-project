var tick = 0;
let ctx,canvas,globalOffset,initialZoom;
function drawWorldMap(){
    tick++
    if(currentScreen!="worldclock"){
        return
    }
    //globalOffset[0]+=15
    
    var canvasSize = recalibrate()
    //console.log(canvasSize)
    globalOffset[0] = globalOffset[0]%400
    globalOffset[1] = globalOffset[1]%400
    initialZoom = canvasSize[0]/400
    renderShape(ctx,countries,1,initialZoom,[globalOffset[0],globalOffset[1]],"#e8f8e9","black");
    renderShape(ctx,countries,1,initialZoom,[-400+globalOffset[0],globalOffset[1]],"#e8f8e9","black")
    renderShape(ctx,countries,1,initialZoom,[400+globalOffset[0],globalOffset[1]],"#e8f8e9","black")
    for(var i=0; i<table.length; i++){
        if(table[i].latlong[0] !== null){
            var point = convertToXY(table[i].latlong[0],table[i].latlong[1],ctx,initialZoom,[globalOffset[0],globalOffset[1]]);
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
uiInitScripts.push(function(){
    globalOffset = [0,0]
    canvas = $("worldmap").id
    ctx=canvas.getContext("2d");
    onNavigate.worldclock = drawWorldMap;
})
loadedScripts+=1;