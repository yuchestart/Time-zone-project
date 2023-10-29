class TableElement{
    static tableElementAttributes = {"location":0,"timenow":1,"timezone":2,"customtime":3}
    /**
     * 
     * @param {String} locationname Name of the location
     * @param {Number} timedifference In minutes, and for some reason order is reversed. -480 would mean UTC-8
     * @param {Boolean} localtime Is local time
     */
    constructor(locationname,timedifference,permanent,localtime=false,latlong){
        this.location = locationname;
        this.latlong = latlong?latlong:[null,null]
        this.utcdifference = localtime?-new Date().getTimezoneOffset():timedifference;
        this.isLocaltime = localtime;
        this.permanent = permanent;
        /**
         * @type {Time}
         */
        this.timenow = this.getTime(new Time())
        this.customtime = this.timenow;
        this.html = null;
        this.initializeHTML();
        this.id = table.length;
        table.push(this)
        storeTable()
    }
    /**
     * 
     * @param {Time} time 
     */
    getTime(time){
        return this.isLocaltime?new Time():time.convertTimeZone(time,(this.utcdifference-this.utcdifference%60)/60,this.utcdifference%60);
    }
    /**
     * 
     * @param {Time} time 
     */
    setCustomTime(time){
        this.customtime=time;
        this.customtime = this.customtime.convertTimeZone(this.customtime,(this.utcdifference-this.utcdifference%60)/60,this.utcdifference%60)
        this.updateHTML()
    }
    updateTime(){
        this.timenow = this.getTime(new Time())
    }
    rename(x){
        this.location = x;
    }
    initializeHTML(){
        this.html = $("table-element-template").class[0].cloneNode(true)
        this.updateHTML()
        this.html.className = this.permanent?"permanent table-element":"table-element"
        if(this.permanent){
            $("delete",$("td",this.html).tag[TableElement.tableElementAttributes.location]).class[0].hidden = true;
            $("rename",$("td",this.html).tag[TableElement.tableElementAttributes.location]).class[0].hidden = true;
        } else{
            $("delete",$("td",this.html).tag[TableElement.tableElementAttributes.location]).class[0].onclick = ()=>{
                var index = table.indexOf(this)
                table.splice(index,1)
                $("table-element").class[index].parentNode.removeChild($("table-element").class[index])
                storeTable()
            }
            $("rename",$("td",this.html).tag[TableElement.tableElementAttributes.location]).class[0].onclick = ()=>{
                openMenus(Enum.RENAME_TABLE_ELEMENT,{
                    idx:table.indexOf(this)
                });
                
            }
        }
        $("table-element-compare-text",$("td",this.html).tag[TableElement.tableElementAttributes.customtime]).class[0].onclick = ()=>{
            openCompare(this)
        }
        var compareInputs = $("table-element-compare-tab",$("td",this.html).tag[TableElement.tableElementAttributes.customtime]).class[0];
        $("table-compare-tab-ok-button",compareInputs).class[0].onclick = ()=>{
            closeCompare(this,true)
        }
        $("table-compare-tab-cancel-button",compareInputs).class[0].onclick = ()=>{
            closeCompare(this)
        }
        $("maintable").id.appendChild(this.html)
    }
    updateHTML(){
        $("span",$("td",this.html).tag[TableElement.tableElementAttributes.location]).tag[0].innerText = this.location;
        $("td",this.html).tag[TableElement.tableElementAttributes.timenow].innerText = this.timenow.returnSimplifiedString();
        var absdiff = Math.abs(this.utcdifference)
        var utcmin = absdiff%60;
        $("td",this.html).tag[TableElement.tableElementAttributes.timezone].innerText = `UTC${this.utcdifference>=0?"+":"-"}${(absdiff-absdiff%60)/60}:${utcmin<10?"0"+utcmin.toString():utcmin}`;
        var customtimecolumn = $("td",this.html).tag[TableElement.tableElementAttributes.customtime];
        $("table-element-compare-text",customtimecolumn).class[0].innerText = this.customtime.returnSimplifiedString(true,false);
    }
    returnProperties(){
        return {
            location:this.location,
            timedifference:this.utcdifference,
            permanent:this.permanent,
            localtime:this.isLocaltime,
            latlong:this.latlong
        }
    }
}
function updateTable(){
    for(var i=0; i<table.length; i++){
        table[i].updateTime();
        table[i].setCustomTime(customTime.time);
        table[i].updateHTML();
    }
}
function storeTable(){
    var tableElements = []
    for(var i=0; i<table.length; i++){
        tableElements.push(table[i].returnProperties())
    }
    localStorage.setItem("table",JSON.stringify(tableElements));
}
function loadTable(){
    var val = localStorage.getItem("table");
    if(val === null){
        new TableElement("Local Time",0,true,true)
        new TableElement("Coordinated Universal Time",0,true,false);
        storeTable();
    } else {
        val = JSON.parse(val);
        for(var i=0; i<val.length; i++){
            new TableElement(val[i].location,val[i].timedifference,val[i].permanent,val[i].localtime,val[i].latlong);
        }
    }
}
function addTableElement(){
    openMenus(Enum.ADD_TABLE_ELEMENT);
}
/**
 * 
 * @param {TableElement} tableElement 
 */
function updateCustomTime(tableElement){
    var compareInputs = $("table-element-compare-tab",$("td",tableElement.html).tag[TableElement.tableElementAttributes.customtime]).class[0];
    var hoursvalue = parseInt($("table-compare-tab-hour-select",compareInputs).class[0].value);
    var minutesvalue = parseInt($("table-compare-tab-minute-select",compareInputs).class[0].value);
    var date = $("table-compare-tab-date-select",compareInputs).class[0].value;
    var ampmvalue = $("table-compare-tab-half-select",compareInputs).class[0].value;
    console.log(ampmvalue)
    var hours = hoursvalue;
    if(config.uses12hourclock){
        if(hours == 12){
            hours = 0;
        }
        hours += ampmvalue=="AM"?0:12;
    }
    var utc = -tableElement.timenow.timeZoneOffset;
    //console.log(utc)
    var utchours = (Math.abs(utc)-Math.abs(utc)%60)/60
    var utcminutes = Math.abs(utc)%60
    //utchours = utchours<10?"0"+utchours.toString():utchours.toString();
    //utcminutes = utcminutes<10?"0"+utcminutes.toString():utcminutes.toString();
    var newtime = new Time();
    console.dir(newtime)
    newtime = newtime.convertTimeZone(newtime,utchours,utcminutes)
    newtime.setFullYear(parseInt(date.slice(0,4)));
    newtime.setMonth(parseInt(date.slice(5,7))-1)
    newtime.setDate(parseInt(date.slice(8,11)))
    newtime.setHours(hours);
    newtime.setMinutes(minutesvalue)
    newtime.setSeconds(0)
    console.dir(newtime)
    customTime.time = newtime;
}
function openCompare(tableElement){
    if(table.openedCompare){
        return
    }
    table.openedCompare = true;
    var compareText = $("table-element-compare-text",$("td", tableElement.html).tag[TableElement.tableElementAttributes.customtime]).class[0];
    var compareInputs = $("table-element-compare-tab",$("td",tableElement.html).tag[TableElement.tableElementAttributes.customtime]).class[0];
    compareText.hidden = true;
    compareInputs.hidden = false;
    if(config.uses12hourclock){
        $("table-compare-tab-hour-select",compareInputs).class[0].setAttribute("max","12")
        $("table-compare-tab-hour-select",compareInputs).class[0].setAttribute("min","1")
    } else {
        $("table-compare-tab-hour-select",compareInputs).class[0].setAttribute("max","23")
        $("table-compare-tab-hour-select",compareInputs).class[0].setAttribute("min","0")
    }
    $("table-compare-tab-hour-select",compareInputs).class[0].value = tableElement.customtime.returnHours();
    $("table-compare-tab-minute-select",compareInputs).class[0].value = tableElement.customtime.returnMinutes();
    $("table-compare-tab-half-select",compareInputs).class[0].value = tableElement.customtime.returnAMPM();
    $("table-compare-tab-half-select",compareInputs).class[0].hidden = !config.uses12hourclock;
    $("table-compare-tab-date-select",compareInputs).class[0].value = tableElement.customtime.returnDate();
}
function closeCompare(tableElement,updatecustomtime = false){
    table.openedCompare = false;
    var compareText = $("table-element-compare-text",$("td", tableElement.html).tag[TableElement.tableElementAttributes.customtime]).class[0];
    var compareInputs = $("table-element-compare-tab",$("td",tableElement.html).tag[TableElement.tableElementAttributes.customtime]).class[0];
    compareText.hidden = false;
    compareInputs.hidden = true;
    if(updatecustomtime){
        updateCustomTime(tableElement);
    }
}
/**
 * @type {TableElement}
 */
const table = [];
let drag = {
    isDragging:false,
    dragID:null,
    full:null,
}
uiInitScripts.push(function(){
    setInterval(updateTable,100);
    var theclock = $("sectionworldclock").id
    theclock.addEventListener("pointerdown",function(e){
        if(e.target === $("seperator").class[0] && !drag.isDragging){
            drag.isDragging = true;
            drag.dragID = e.pointerID
        }
    });
    theclock.addEventListener("pointermove",function(e){
        if(!drag.isDragging || drag.dragID !== e.pointerID){
            return false;
        }
        var pointerPosition = e.clientY;
        var boxMinWidth = 165;
        var panelA = $("map-tab").class[0];
        var panelB = $("table-tab").class[0];
        var handler = $("seperator").class[0];
        var pointerPositionCorrected = pointerPosition-6
        var minimized = clamp(pointerPositionCorrected,boxMinWidth,window.innerHeight-boxMinWidth-65);
        var minimized2 = clamp(pointerPosition,boxMinWidth,window.innerHeight-boxMinWidth-65);
        panelA.style.height = minimized+"px";
        panelB.style.height = `calc(100vh - ${minimized+73}px)`;
        panelB.style.top = minimized2+"px";
        handler.style.top = pointerPositionCorrected+"px";
    })
    theclock.addEventListener("pointerup",function(e){
        if(e.pointerID === drag.dragID){
            drag.isDragging = false;
            drag.dragID = null;
            var panelARect = $("map-tab").class[0].getBoundingClientRect();
            var panelBRect = $("table-tab").class[0].getBoundingClientRect();
            var handlerRect = $("seperator").class[0].getBoundingClientRect().y;
            var panelA = $("map-tab").class[0];
            var panelB = $("table-tab").class[0];
            var handle = $("seperator").class[0];
            if(handlerRect+3>panelBRect.y){
                panelB.style.top = `calc(100vh - 65px)`;
                panelB.style.height = "65px";
                panelA.style.height = `calc(100vh - 65px)`;
                handle.style.top = `calc(100vh - 77px)`;
            }else if(handlerRect+3<panelARect.height){
                panelB.style.top = `0px`;
                panelB.style.height = "calc(100vh - 65px)";
                panelA.style.height = `0px`;
                handle.style.top = `0px`;
            }
        }
    })
})
