class TableElement{
    constructor(timedifference,name,islocaltime=false,permanent=false){
        this.name = name;
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
    initialize(){

    }
}
var table = []