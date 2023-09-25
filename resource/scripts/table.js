class TableElement{
    static tableElementAttributes = {"location":0,"timenow":1,"timezone":2,"customtime":3}
    /**
     * 
     * @param {String} locationname Name of the location
     * @param {Number} timedifference In minutes, and for some reason order is reversed. 480 would mean UTC-8
     * @param {Boolean} localtime Is local time
     */
    constructor(locationname,timedifference,permanent,localtime=false){
        this.location = locationname;
        this.utcdifference = localtime?new Date().getTimezoneOffset():-timedifference;
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
    initializeHTML(){
        let meElement = $("table-element-template").class[0].cloneNode(true)
        $("span",$("td",meElement).tag[TableElement.tableElementAttributes.location]).tag[0].innerText = this.location;
        $("td",meElement).tag[TableElement.tableElementAttributes.timenow].innerText = this.timenow.returnSimplifiedString();
        var absdiff = Math.abs(this.utcdifference)
        var utcmin = absdiff%60;
        $("td",meElement).tag[TableElement.tableElementAttributes.timezone].innerText = `UTC${this.utcdifference<0?"+":"-"}${(absdiff-absdiff%60)/60}:${utcmin<10?"0"+utcmin.toString():utcmin}`;
        $("td",meElement).tag[TableElement.tableElementAttributes.customtime].innerText = this.customtime.returnSimplifiedString();
        meElement.className = this.permanent?"permanent":""
        if(this.permanent){
            $("button",$("td",meElement).tag[TableElement.tableElementAttributes.location]).tag[0].hidden = true;
        } else{
            $("button",$("td",meElement).tag[TableElement.tableElementAttributes.location]).tag[0].onclick = function(){
                table.splice(table.indexOf(this),1)
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
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
        $("td",this.html).tag[TableElement.tableElementAttributes.timezone].innerText = `UTC${this.utcdifference<0?"+":"-"}${(absdiff-absdiff%60)/60}:${utcmin<10?"0"+utcmin.toString():utcmin}`;
        $("td",this.html).tag[TableElement.tableElementAttributes.customtime].innerText = this.customtime.returnSimplifiedString();
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
/**
 * @type {TableElement}
 */
const table = []
loadedScripts+=1;