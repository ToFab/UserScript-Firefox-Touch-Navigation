import { TouchPoint } from "../../../models/TouchPoint";
import { LoggingService } from "../../LoggingManager/LoggingService";
import { BaseService } from "../BaseService";


export class TouchDetectionHelper {    
    
    loggingService: LoggingService;   

    constructor(){
        this.loggingService = new LoggingService(TouchDetectionHelper.name);        
    }   

    isCurrentTouchOneFinger(current: TouchPoint, log:boolean) {

        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        this.loggingService.Log(`isCurrentTouchOneFinger: ${retval}`, this.isCurrentTouchOneFinger.name, log);
        return retval;
    }

    wasPreviousTouchOneFinger(previous: TouchPoint, log:boolean) {

        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        this.loggingService.Log(`wasPreviousTouchOneFinger: ${retval}`, this.isCurrentTouchOneFinger.name, log);

        return retval;
    }

    isHorisontalSwipe(current: TouchPoint, first: TouchPoint, log:boolean) {

        this.loggingService.Log("Entering isHorisontalIsh", this.isHorisontalSwipe.name, log);
        var degree = this.GetDegree(current, first, log);
        this.loggingService.Log(`Degree A: ${degree}`, this.isHorisontalSwipe.name, log);

        if ((degree >= -36 && degree <= 15) || (degree >= -150 && degree <= 165)) {
            this.loggingService.Log("Degree is within valid range", this.isHorisontalSwipe.name, log);

            return true;
        } else {
            console.log("Degree is outside of valid range.", this.isHorisontalSwipe.name, this.isHorisontalSwipe.name, true);
        }

        return false;
    }

    GetDegree(current: TouchPoint, first: TouchPoint, log:boolean): number { 

        var tmpX = current.clientX - first.clientX;
        var tmpY = current.clientY - first.clientY;
        var rad = Math.atan2(tmpY, tmpX); // In radians
        var degree = Math.round(rad * (180 / Math.PI));

        this.loggingService.Log(`Degreexxx: ${degree}`,this.GetDegree.name, log);


        return degree;
    }
}