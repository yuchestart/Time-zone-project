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
    new Time()
}
window.onload = main;
class Time{
    /**
     * String:
     * DD-MM-YYYY-HH-MM-SS-HH-MM
     * Numbers:
     * HH,MM,SS,dd,mm,yy,hh,mm
     * @param  {...String|Number} theargs 
     */
    constructor(...theargs){
        if(theargs.length == 1){
            var time = theargs[0].split("-");
            this.date = parseInt(time[0]);
            this.month = parseInt(time[1]);
            this.year = parseInt(time[2]);
            this.hour = parseInt(time[3]);
            this.minute = parseInt(time[4]);
            this.second = parseInt(time[5]);
            this.timezoneoffset = {
                hours:parseInt(time[6]),
                minute:parseInt(time[7])
            };
        } else if(theargs.length == 7){
            this.hour = theargs[0]
            this.minute = theargs[1]
            this.second = theargs[2]
            this.date = theargs[3]
            this.month = theargs[4]
            this.year = theargs[5]
            this.timezoneoffset = {
                hours:theargs[6],
                minute:theargs[7]
            }
        }
    }
    settime(...theargs){
        if(theargs.length == 1){
            var time = theargs[0].split("-");
            this.date = parseInt(time[0]);
            this.month = parseInt(time[1]);
            this.year = parseInt(time[2]);
            this.hour = parseInt(time[3]);
            this.minute = parseInt(time[4]);
            this.second = parseInt(time[5]);
            this.timezoneoffset = {
                hours:parseInt(time[6]),
                minute:parseInt(time[7])
            };
        } else if(theargs.length == 7){
            this.hour = theargs[0]
            this.minute = theargs[1]
            this.second = theargs[2]
            this.date = theargs[3]
            this.month = theargs[4]
            this.year = theargs[5]
            this.timezoneoffset = {
                hours:theargs[6],
                minute:theargs[7]
            }
        } else if(theargs.length == 0){
            var thedate = new Date()
            this.hour = thedate.getHours()
            this.minute = thedate.getMinutes()
            this.second = thedate.getSeconds()
            this.date = thedate.getDate()
            this.month = thedate.getMonth()
            this.year = thedate.getYear()
            this.timezoneoffset = {
                hours:thedate.get
            }
        }
    }
}