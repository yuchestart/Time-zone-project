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
}
function updateTable(){
    for(var i=0; i<table.length; i++){
        table[i].updateTime();
        table[i].setCustomTime(customTime.time);
        table[i].updateHTML();
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
    var hours = hoursvalue;
    if(config.uses12hourclock){
        hours += ampmvalue=="AM"?0:12;
    }
    hours = hours<10?"0"+hours.toString():hours.toString();
    var minutes = minutesvalue<10?"0"+minutesvalue.toString():minutesvalue.toString();
    var utc = -tableElement.timenow.timeZoneOffset;
    var utchours = (Math.abs(utc)-Math.abs(utc)%60)/60
    var utcminutes = Math.abs(utc)%60
    utchours = utchours<10?"0"+utchours.toString():utchours.toString();
    utcminutes = utcminutes<10?"0"+utcminutes.toString():utcminutes.toString();
    customTime.time = new Time(`${date}T${hours}:${minutes}:00.000${utc<0?"-":"+"}${utchours}:${utcminutes}`);
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
    } else {
        $("table-compare-tab-hour-select",compareInputs).class[0].setAttribute("max","23")
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
uiInitScripts.push(function(){
    setInterval(updateTable,100)
})
loadedScripts+=1;