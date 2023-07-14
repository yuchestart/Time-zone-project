
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
     * Lol 
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
        newdate.setHours(newdate.getUTCHours())
        newdate.setMinutes(newdate.getUTCMinutes())
        newdate.setHours(newdate.getUTCHours()+h);
        newdate.setMinutes(newdate.getUTCMinutes()+m);
        newdate.timeZoneOffset = -(h*60+m);
        return newdate;
    }
    setToUTC(date,implace){
        var newdate = implace?this:new Time(date);
        newdate.setHours(newdate.getUTCHours())
        newdate.setMinutes(newdate.getUTCMinutes())
        newdate.setHours(newdate.getUTCHours());
        newdate.setMinutes(newdate.getUTCMinutes());
        newdate.timeZoneOffset = 0;
        return newdate;
    }
}
