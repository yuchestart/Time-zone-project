let ctx,canvas,globalOffset;
function drawWorldMap(){
    if(currentScreen!="worldclock"){
        return
    }
    //globalOffset[0]+=15
    var canvasSize = recalibrate();
    console.log(canvasSize)
    globalOffset[0] = globalOffset[0]%canvasSize[0]
    globalOffset[1] = globalOffset[1]%canvasSize[1]
    renderShape(ctx,countries,1,1,[globalOffset[0],globalOffset[1]],"#e8f8e9","black");
    renderShape(ctx,countries,1,1,[-canvasSize[0]+globalOffset[0],globalOffset[1]],"#e8f8e9","black")
    renderShape(ctx,countries,1,1,[canvasSize[0]+globalOffset[0],globalOffset[1]],"#e8f8e9")
    for(var i=0; i<table.length; i++){
        
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