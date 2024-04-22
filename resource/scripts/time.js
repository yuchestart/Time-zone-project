
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
/*
class Time2 extends Date{
    /**
     * Time object with options to convert timezones :)
     * @param  {...String|Number|Date} theArgs 
     *
    constructor(...theArgs){
        super(...theArgs)
        this.timeZoneOffset = this.getTimezoneOffset()
    }
    /**
     * Convert time zone
     * @param {Time} date 
     * @param {Number} h 
     * @param {Number} m 
     *
    convertTimeZone(date,h,m,implace,log){
        let epoch = date.getTime();
        epoch += h*3_600_000;
        epoch += m*60_000;
        epoch -= date.timeZoneOffset * 60_000
        let newdate = implace?this:Time.UTC();
        newdate.timeZoneOffset = Math.sign(h)*(Math.abs(h)*60+m);
        return newdate;
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
*/
class Time extends Date{

    constructor(...theargs){
        super(...theargs);
        this.timeZoneOffset = this.getTimezoneOffset();

    }
    /**
     * 
     * @param {Time} date 
     * @param {number} h 
     * @param {number} m 
     */
    static convertTimeZone(date,h,m){
        let time = date.getTime();
        time += h * 60 * 60 * 1000;
        time += m * 60 * 1000;
        return new Time(time);
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
    returnDate(){
        return `${
            this.getFullYear()
        }-${
            this.getMonth()+1<10?"0"+(this.getMonth()+1).toString():this.getMonth()+1
        }-${
            this.getDate()<10?"0"+(this.getDate()).toString():this.getDate()
        }`
    }
}