
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
}

/**
 * Convert time zone
 * @param {Time} date 
 * @param {Number} h 
 * @param {Number} m 
 */
function convertTimeZone(date,h,m){
    var offsetminutes = date.getUTCMinutes()-m;
    var offsethours = date.getUTCHours()-h;
    var newdate = new Time(date);
    newdate.setMinutes(offsetminutes<0?60+offsetminutes:offsetminutes);
    newdate.setHours(offsethours<0?24+offsethours:offsethours);
    newdate.timeZoneOffset = -(h*60+m)
    return newdate;
}