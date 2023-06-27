const monthdays = [31,28,31,30,31,30,31,31,30,31,30,31]
function isleapyear(year){
    
}
class Time{
    /**
     * All this will be 1 based Will always use 24 hours
     * @param {Number} h 
     * @param {Number} m 
     * @param {Number} s 
     * @param {Number} dd 
     * @param {Number} mm 
     * @param {Number} yy 
     * @param {Number} zh 
     * @param {Number} zm 
     */
    constructor(h,m,s,dd,mm,yy,zh,zm){
        if(typeof h != "undefined"){
            this.hour = h;
            this.minute = m;
            this.second = s;
            this.date = dd;
            this.month = mm;
            this.year = yy;
            this.timezonehours = zh;
            this.timezoneminutes = zm;
        } else {
            var dadate = new Date()
            this.hour = dadate.getHours();
            this.minute = dadate.getMinutes();
            this.second = dadate.getSeconds();
            this.month = dadate.getMonth()+1;
            this.date = dadate.getDate();
            this.year = dadate.getFullYear();
            var timezoneoffset = dadate.getTimezoneOffset();
            this.timezoneminutes = timezoneoffset%60
            this.timezonehours = (timezoneoffset-timezoneminutes)/60
        }
    }
    offsetTimezone(h,m,implace=true){
        if(h instanceof Time){
            var houroffset = h.timezonehours;
            var minuteoffset = h.timezoneminutes;
        } else {
            var houroffset = h;
            var minuteoffset = m;
        }
        var newhour = this.hour - houroffset;
        var newminute = this.minute - minuteoffset;
        var newdate = this.date;
        var newmonth = this.month;
        var newyear = this.year;
        if(newminute < 0){
            newminute = 59
            newhour--;
        } else if(newminute > 59){
            newminute = 0
            newhour++;
        }
        if(newhour < 0){
            newhour = 23
            newdate
        }
    }
}
function convertTimeZone(){

}