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
class Time{
    /**
     * All this will be 1 based Will always use 24 hours
     * Lol I'm making my own Date.
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
            var timezoneoffset = Math.abs(dadate.getTimezoneOffset());
            this.timezoneminutes = timezoneoffset%60
            this.timezonehours = (timezoneoffset-timezoneminutes)/60
            this.timezonepositive = dadate.getTimezoneOffset()<0;
        }
    }
    offsetTimezone(h,m,implace=true){
        if(h instanceof Time){
            var houroffset = h.timezonehours;
            var minuteoffset = h.timezoneminutes;
            if(!h.timezonepositive){
                houroffset *= -1
                minuteoffset *= -1
            }
        } else {
            var houroffset = h;
            var minuteoffset = m;
        }
        var utchour = (this.hour - (this.timezonepositive?this.timezonehours:-this.timezonehours))%23;
        var utcminute = (this.minute - (this.timezonepositive?this.timezoneminutes:-this.timezoneminutes))%59;
        var utcday = this.date;
        var utcmonth = this.month;
        var utcyear = this.year;
        if(utcminute < 0 || utcminute > 59){
            utcminute = 59%utchour;
        }
        if(utchour < 0 || utchour > 23){
            utchour = 23%utchour
            utcdate += utchour<0?-1:1
        }
        
    }
    wrapTime(h,m,dd,mm,yy){
        var wraparound;
        if(m<0||m>59){
            wraparound = (m-(m%59))/m
            h += m<0?-wraparound:wraparound
            m = Math.abs(m%59)
        }
        if(h<0||h>23){
            wraparound = (h-(h%23))/h
            dd += h<0?-wraparound:wraparound
            h = Math.abs(h%23)
        }
        if(dd<=0||dd>isleapyear(yy)?leapmonthdays[mm]:monthdays[mm]){
            tempm = mm+0;
            mm += d<=0?-1:1;
            d = Math.abs(d%isleapyear(yy)?leapmonthdays[tempm]:monthdays[tempm])
        }
        if(mm<=0||mm>12){
            yy += mm<=0?-1:1;
            mm = mm%12;
        }
    }
}
function convertTimeZone(){

}