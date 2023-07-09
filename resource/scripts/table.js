class TableElement{
    static tableElementAttributes = {"location":0,"timenow":1,"timezone":2,"customtime":3}
    constructor(timedifference,name,islocaltime=false,permanent=false){
        this.location = name;
        if(islocaltime){
            mydate = new Date();
            this.utcdifference = (mydate.getHours()+timedifference) - mydate.getUTCHours();
            this.utcminutedifference
        } else {
            this.utcdifference = timedifference;
        }
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
    }
}
var table = []