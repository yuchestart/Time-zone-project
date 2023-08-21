async function retrieveData(name){
    const response = fetch(name).then(data=>data.json())
    return response
}
var countries,cities,timezones,ctx;
//retrieveData("world_cities.json").then((data)=>{cities = data})
//retrieveData("world_countries.json").then((data)=>{countries = data})
//retrieveData("world_timezone.json").then((data)=>{timezone = data})
ctx = document.getElementById("rendercanvas").getContext("2d")
function convertToXY(long,lat,ctx,zoom,offset){
    
    var percentagex = Math.abs((long)*zoom)/180
    var percentagey = Math.abs((lat)*zoom)/90
    var width = ctx.canvas.width/2
    var height = ctx.canvas.height/2
    if(long < 0){
        x = width-(width*percentagex)
    } else {
        x = width+(width*percentagex)
    }
    x-=offset[0]*zoom
    if(lat < 0){
        y = height+(height*percentagey)
    } else {
        y = height-(height*percentagey)
    }
    y+=offset[1]*zoom
    return [x,y];
}

function renderShape(ctx,shape,overlay=0,zoom=1,moved=[0,0],fill="rgba(0,0,0,0)",stroke='black',bg="rgba(0,0,0,0)",size=1){
    if(!overlay){
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        ctx.fillStyle = bg;
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
    }
    var features = shape.features;
    for(var f=0; f<features.length; f++){
        if(features[f].geometry.type == "MultiPolygon"){
            for(var i=0; i<features[f].geometry.coordinates.length; i++){
                var polycoords = features[f].geometry.coordinates[i][0]
                ctx.beginPath()
                ctx.moveTo(...convertToXY(polycoords[0][0],polycoords[0][1],ctx,zoom,moved))
                for(var j=1; j<polycoords.length; j++){
                    ctx.lineTo(...convertToXY(polycoords[j][0],polycoords[j][1],ctx,zoom,moved))
                }
                ctx.fillStyle = fill
                ctx.strokeStyle = stroke
                ctx.lineWidth = size
                ctx.closePath()
                ctx.stroke()
                ctx.fill()
            }
        } else if(features[f].geometry.type == "Polygon"){
            for(var i=0; i<features[f].geometry.coordinates.length; i++){
                var polycoords = features[f].geometry.coordinates[i];
                ctx.beginPath()
                ctx.moveTo(...convertToXY(polycoords[0][0],polycoords[0][1],ctx,zoom,moved))
                for(var j=1; j<polycoords.length; j++){
                    ctx.lineTo(...convertToXY(polycoords[j][0],polycoords[j][1],ctx,zoom,moved))
                }
                ctx.fillStyle = fill
                ctx.strokeStyle = stroke
                ctx.lineWidth = size
                ctx.closePath()
                ctx.stroke()
                ctx.fill()
            }
        } else if(features[f].geometry.type == "Point"){
            var polycoords = features[f].geometry.coordinates
            polycoords = convertToXY(polycoords[0],polycoords[1],ctx,zoom,moved)
            ctx.beginPath()            
            ctx.arc(polycoords[0],polycoords[1],size,0,Math.PI*2)
            ctx.closePath()
            ctx.fillStyle = fill
            ctx.strokeStyle = stroke
            ctx.lineWidth = size
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
        }
    }
}

function run(){
    renderShape(ctx,countries,0,3,[-200,200],"green","black","blue")
    renderShape(ctx,timezones,1,3,[-200,200],"rgba(0,0,0,0)","white")
    renderShape(ctx,cities,1,3,[-200,200],"red","white","none",3)
}