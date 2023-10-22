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
        let meElement = $("table-element-template").class[0].cloneNode(true)
        this.updateHTML()
        meElement.className = this.permanent?"permanent table-element":"table-element"
        if(this.permanent){
            $("delete",$("td",meElement).tag[TableElement.tableElementAttributes.location]).class[0].hidden = true;
            $("rename",$("td",meElement).tag[TableElement.tableElementAttributes.location]).class[0].hidden = true;
        } else{
            $("delete",$("td",meElement).tag[TableElement.tableElementAttributes.location]).class[0].onclick = ()=>{
                var index = table.indexOf(this)
                table.splice(index,1)
                $("table-element").class[index].parentNode.removeChild($("table-element").class[index])
            }
            $("rename",$("td",meElement).tag[TableElement.tableElementAttributes.location]).class[0].onclick = ()=>{
                openMenus(Enum.RENAME_TABLE_ELEMENT,{
                    idx:table.indexOf(this)
                });
            }
        }
        this.html = meElement
        $("maintable").id.appendChild(meElement)
    }
    updateHTML(){
        $("span",$("td",this.html).tag[TableElement.tableElementAttributes.location]).tag[0].innerText = this.location;
        $("td",this.html).tag[TableElement.tableElementAttributes.timenow].innerText = this.timenow.returnSimplifiedString();
        var absdiff = Math.abs(this.utcdifference)
        var utcmin = absdiff%60;
        $("td",this.html).tag[TableElement.tableElementAttributes.timezone].innerText = `UTC${this.utcdifference>=0?"+":"-"}${(absdiff-absdiff%60)/60}:${utcmin<10?"0"+utcmin.toString():utcmin}`;
        $("td",this.html).tag[TableElement.tableElementAttributes.customtime].innerText = this.customtime.returnSimplifiedString(true,false);
    }
}
function updateTable(){
    for(var i=0; i<table.length; i++){
        table[i].updateTime();
        table[i].setCustomTime(customTime);
        table[i].updateHTML();
    }
}
function addTableElement(){
    openMenus(Enum.ADD_TABLE_ELEMENT);
}
function openCompare(){
    $("table-compare-tab-date-select").class[0].value = customTime.returnISODate();
    if(config.uses12hourclock){
        $("table-compare-tab-hour-select").class[0].max="12";
        var hours = customTime.getHours()%12;
        if(hours==0){
            hours = 12;
        }
        $("table-compare-tab-hour-select").class[0].value = hours;
        $("table-compare-tab-half-select").class[0].value = customTime.getHours()>=12?"PM":"AM";
        $("table-compare-tab-half-select").class[0].hidden = false;
        
    } else {
        $("table-compare-tab-hour-select").class[0].max="24";
        $("table-compare-tab-hour-select").class[0].value = customTime.getHours()
        $("table-compare-tab-half-select").class[0].hidden = true;
    }
    $("table-compare-tab-minute-select").class[0].value = customTime.getMinutes()
}
function updateCustomTime(){
    var hours = $("table-compare-tab-hour-select").class[0].value;
    var minutes = $("table-compare-tab-minute-select").class[0].value;
    var date = $("table-compare-tab-date-select").class[0].value;
    var ampm = $("table-compare-tab-half-select").class[0].value;
}
/**
 * @type {TableElement}
 */
const table = [];
uiInitScripts.push(function(){
    $("setcustomtime").id.onclick = function(){
        var settings = $("table-compare-tab").class;
        if(settings[0].hidden){
            openCompare();
        }
        for(var i=0; i<settings.length; i++){
            settings[i].hidden = !settings[i].hidden
        }
        
    }
    var inputs = $("table-compare-tab-input").class;
    for(var i=0; i<inputs.length; i++){
        inputs[i].onchange = updateCustomTime;
    }
})
loadedScripts+=1;