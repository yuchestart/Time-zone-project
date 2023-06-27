function $(x,parent){
    return parent?{
        class:parent.getElementsByClassName(x),
        tag:parent.getElementsByTagName(x)
    }:{
        class:document.getElementsByClassName(x),
        tag:document.getElementsByTagName(x),
        id:document.getElementById(x)
    }
}
function main(){
    
}
window.onload = main;
class Time{
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
        var newminute = this.minute - houroffset;
        
    }
}
function convertTimeZone(){

}