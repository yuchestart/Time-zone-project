
class Time extends Date{
    /**
     * Time object with options to convert timezones :)
     * @param  {...String|Number|Date} theArgs 
     */
    constructor(...theArgs){
        super(...theArgs)
        this.timeZoneOffset = this.getTimezoneOffset()
    }
    /**
     * Convert time zone
     * @param {Time} date 
     * @param {Number} h 
     * @param {Number} m 
     */
    convertTimeZone(date,h,m,implace,log){
        /*
        var newdate = implace?this:new Time(date);
        newdate.timeZoneOffset = date.timeZoneOffset;
        newdate = newdate.setToUTC(newdate,0,log)
        if(log)
            console.log(newdate,newdate.timeZoneOffset,h,m,newdate.getHours())
        newdate.setHours(newdate.getHours()+h)
        newdate.setMinutes(newdate.getMinutes()+m)
        newdate.timeZoneOffset = Math.sign(h)*(Math.abs(h)*60+m);
        return newdate;*/
        
    }
    setToUTC(date,implace,log){
        /*
        var newdate = implace?this:new Time(date);
        newdate.timeZoneOffset = date.timeZoneOffset;
        if(log){
            console.log(newdate.timeZoneOffset)
            console.log(newdate)
        }
        var offset = -newdate.timeZoneOffset;
        var hours = (offset-offset%60)/60
        var minutes = offset%60
        newdate.setHours(newdate.getHours()-hours)
        newdate.setMinutes(newdate.getMinutes()-minutes)
        newdate.timeZoneOffset = 0;
        
        return newdate;*/
        let epochtime = date.getTime();
        let newdate = implace?this:new Time();
        newdate.timeZoneOffset = date.timeZoneOffset;

    }
    returnSimplifiedString(returnDate = true,returnSeconds = true){
        var hours = this.returnHours();
        var timestr = `${hours}:${
            this.getMinutes()<10?"0"+this.getMinutes().toString():this.getMinutes()
        }${returnSeconds?":":""}${returnSeconds?
            this.getSeconds()<10?"0"+this.getSeconds().toString():this.getSeconds():""
        }${config.uses12hourclock?" "+this.returnAMPM():""}`
        var datestr = `${config.usesmonthdayyear?this.getMonth()+1:this.getDate()}/${!config.usesmonthdayyear?this.getMonth()+1:this.getDate()}/${this.getFullYear()}`
        return `${timestr}${returnDate?" "+datestr:""}`
    }
    returnDate(){
        return `${
            this.getFullYear()
        }-${
            this.getMonth()+1<10?"0"+(this.getMonth()+1).toString():this.getMonth()+1
        }-${
            this.getDate()<10?"0"+(this.getDate()).toString():this.getDate()
        }`
    }
    returnHours(){
        var hours = config.uses12hourclock?this.getHours()%12:this.getHours();
        if(hours==0&&config.uses12hourclock){
            hours = 12;
        }
        return hours;
    }
    returnMinutes(){
        return this.getMinutes();
    }
    returnAMPM(){
        return this.getHours()>=12?"PM":"AM"
    }
}
