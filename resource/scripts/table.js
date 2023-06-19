class TableElement{
    constructor(timedifference,name,islocaltime=false,permanent=false){
        this.name = name;
        if(islocaltime){
            mydate = new Date();
            this.utcdifference = (mydate.getHours()+timedifference) - mydate.getUTCHours();
        } else {
            this.utcdifference = timedifference;
        }
        this.permanent = permanent;
    }
    /**
     * 
     * @param {Date} time 
     */
    getTime(time){
        var newhours = time.getHours()+this.utcdifference();
        var mydate = new Date()
        if(newhours > 23){
            newhours-=23
        }
        mydate.setHours(newhours);
        mydate.setMinutes(time.getMinutes());
        mydate.setSeconds(time.getSeconds());
        return newhours
    }
}
var table = [

]