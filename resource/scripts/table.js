class TableElement{
    static tableElementAttributes = {"location":0,"timenow":1,"timezone":2,"customtime":3}
    /**
     * 
     * @param {String} locationname Name of the location
     * @param {Number} timedifference In minutes, and for some reason order is reversed. 480 would mean UTC-8
     * @param {Boolean} localtime Is local time
     */
    constructor(locationname,timedifference,permanent,localtime){
        this.location = locationname;
        this.utcdifference = timedifference;
        this.permanent = permanent;
        /**
         * @type {Time}
         */
        this.timenow = this.getTime(new Time())
        this.customtime = this.timenow;
        this.html = null;
        this.initializeHTML()
    }
    /**
     * 
     * @param {Time} time 
     */
    getTime(time){
        return time.convertTimeZone(time,(this.utcdifference-this.utcdifference%60)/60,this.utcdifference%60);
    }
    /**
     * 
     * @param {Time} time 
     */
    setCustomTime(time){
        this.customtime=time;
        this.updateHTML()
    }
    initializeHTML(){
        let meElement = $("table-element-template").class[0].cloneNode(true)
        $("span",$("td",meElement).tag[TableElement.tableElementAttributes.location]).tag[0].innerText = this.location;
        $("td",meElement).tag[TableElement.tableElementAttributes.timenow].innerText = this.timenow.returnSimplifiedString();
        $("td",meElement).tag[TableElement.tableElementAttributes.timezone].innerText = this.utcdifference;
        $("td",meElement).tag[TableElement.tableElementAttributes.customtime].innerText = this.customtime.returnSimplifiedString();
        meElement.className = this.permanent?"permanent":""
        if(this.permanent){
            $("button",$("td",meElement).tag[TableElement.tableElementAttributes.location]).tag[0].hidden = true;
        } else{
            $("button",$("td",meElement).tag[TableElement.tableElementAttributes.location]).tag[0].onclick = function(){
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
            }
        }
        $("maintable").id.appendChild(meElement)
    }
    updateHTML(){
        $("span",$("td",this.html).tag[TableElement.tableElementAttributes.location]).tag[0].innerText = this.location;
        $("td",this.html).tag[TableElement.tableElementAttributes.timenow].innerText = this.timenow.returnSimplifiedString();
        $("td",this.html).tag[TableElement.tableElementAttributes.timezone].innerText = this.utcdifference;
        $("td",this.html).tag[TableElement.tableElementAttributes.customtime].innerText = this.customtime.returnSimplifiedString();
    }
}
const table = []