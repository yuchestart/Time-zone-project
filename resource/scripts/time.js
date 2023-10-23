
const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31]
const leapmonthdays = [31,29,31,30,31,30,31,31,30,31,30,31]
function isleapyear(year){
    if(year%4==0){
        if(year%100==0){
            if(year%400==0){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    return false;
}

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
    convertTimeZone(date,h,m,implace){
        var newdate = implace?this:new Time(date);
        newdate.setHours(newdate.getUTCHours()+h)
        newdate.setMinutes(newdate.getUTCMinutes()+m)
        newdate.timeZoneOffset = -(h*60+m);
        return newdate;
    }
    setToUTC(date,implace){
        var newdate = implace?this:new Time(date);
        newdate.setHours(newdate.getUTCHours())
        newdate.setMinutes(newdate.getUTCMinutes())
        newdate.timeZoneOffset = 0;
        return newdate;
    }
    returnSimplifiedString(returnDate = true,returnSeconds = true){
        var hours = this.returnHours();
        var timestr = `${hours}:${
            this.getMinutes()<10?"0"+this.getMinutes().toString():this.getMinutes()
        }${returnSeconds?":":""}${returnSeconds?
            this.getSeconds()<10?"0"+this.getSeconds().toString():this.getSeconds():""
        }${config.uses12hourclock?this.returnAMPM():""}`
        var datestr = `${config.usesmonthdayyear?this.getMonth()+1:this.getDate()+1}/${!config.usesmonthdayyear?this.getMonth()+1:this.getDate()+1}/${this.getFullYear()}`
        return `${timestr}${returnDate?" "+datestr:""}`
    }
    returnDate(){
        return `${
            this.getFullYear()
        }-${
            this.getMonth()+1<10?"0"+(this.getMonth()+1).toString():this.getMonth()+1
        }-${
            this.getDate()+1<10?"0"+(this.getDate()+1).toString():this.getDate()+1
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
        return this.getHours()>12?"PM":"AM"
    }
}
loadedScripts+=1;