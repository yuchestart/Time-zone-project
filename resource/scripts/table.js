class TableElement{
    static tableElementAttributes = {"location":0,"timenow":1,"timezone":2,"customtime":3}
    /**
     * 
     * @param {String} locationname Name of the location
     * @param {Number} timedifference In minutes, and for some reason order is reversed. 480 would mean UTC-8
     */
    constructor(locationname,timedifference){
        this.location = locationname;
        this.utcdifference = timedifference;
        this.permanent = permanent;
        this.html = null;
    }
    /**
     * 
     * @param {Time} time 
     */
    getTime(time){
        return time.convertTimeZone(this.utcdifference);
    }
    initializeHTML(){
        let meElement = $("table-element",$("templates").id).class[0].cloneNode(true)
        $("td",meElement).tag[TableElement.tableElementAttributes.location] = this.location;
        $("td",meElement).tag[TableElement.tableElementAttributes.timenow] = this.location;
        $("td",meElement).tag[TableElement.tableElementAttributes.location] = this.location;
        $("td",meElement).tag[TableElement.tableElementAttributes.location] = this.location;
        $("maitable").class[0].appendChild(meElement)
    }
}
var table = []