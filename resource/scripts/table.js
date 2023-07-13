class TableElement{
    static tableElementAttributes = {"location":0,"timenow":1,"timezone":2,"customtime":3}
    /**
     * 
     * @param {String} locationname Name of the location
     * @param {Number} timedifference In minutes, and for some reason order is reversed. 480 would mean UTC-8
     */
    constructor(locationname,timedifference,permanent){
        this.location = locationname;
        this.utcdifference = timedifference;
        this.permanent = permanent;
        this.timenow = this.getTime(new Time())
        this.customtime = this.timenow;
        this.html = null;
    }
    /**
     * 
     * @param {Time} time 
     */
    getTime(time){
        return time.convertTimeZone(this.utcdifference);
    }
    setCustomTime(){

    }
    initializeHTML(){
        let meElement = $("table-element-template").class[0].cloneNode(true)
        $("span",$("td",meElement).tag[TableElement.tableElementAttributes.location]).tag[0].innerText = this.location;
        $("td",meElement).tag[TableElement.tableElementAttributes.timenow].innerText = this.timenow;
        $("td",meElement).tag[TableElement.tableElementAttributes.timezone].innerText = this.utcdifference;
        $("td",meElement).tag[TableElement.tableElementAttributes.customtime].innerText = this.customtime;
        meElement.className = ""
        $("maintable").id.appendChild(meElement)
    }
}
var table = []