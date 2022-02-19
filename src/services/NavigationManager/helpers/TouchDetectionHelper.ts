import { TouchPoint } from "../../../models/TouchPoint";
import { LoggingService } from "../../LoggingManager/LoggingService";
import { BaseService } from "../BaseService";


export class TouchDetectionHelper {

    className =  TouchDetectionHelper.name;
    loggingEnabled = false;
    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService();
    };

    EnableLogging(enable: boolean) {
        if (enable) {
            console.log("Logging enabled for TouchDetectionHelper");
        }
        this.loggingEnabled = enable;
    }

    isCurrentTouchOneFinger(current: TouchPoint) {

        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        this.loggingService.Log(`isCurrentTouchOneFinger: ${retval}`, this.loggingService.GetIdentifier(this.className, this.isCurrentTouchOneFinger.name), this.loggingEnabled);
        return retval;
    }

    wasPreviousTouchOneFinger(previous: TouchPoint) {

        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        this.loggingService.Log(`wasPreviousTouchOneFinger: ${retval}`, this.loggingService.GetIdentifier(this.className, this.isCurrentTouchOneFinger.name), this.loggingEnabled);

        return retval;
    }

    isHorisontalSwipe(current: TouchPoint, first: TouchPoint) {

        var name = "TouchDetectionHelper.isHorisontalSwipe"

        this.loggingService.Log("Entering isHorisontalIsh", this.loggingService.GetIdentifier(this.className, this.isHorisontalSwipe.name), this.loggingEnabled);
        var degree = this.GetDegree(current, first);
        this.loggingService.Log(`Degree A: ${degree}`, name, this.loggingEnabled);

        if ((degree >= -36 && degree <= 15) || (degree >= -150 && degree <= 165)) {
            this.loggingService.Log("Degree is within valid range", this.loggingService.GetIdentifier(this.className, this.isHorisontalSwipe.name), this.loggingEnabled);

            return true;
        } else {
            console.log("Degree is outside of valid range.", this.loggingService.GetIdentifier(this.className, this.isHorisontalSwipe.name));
        }

        return false;
    }

    GetDegree(current: TouchPoint, first: TouchPoint): number { 

        var tmpX = current.clientX - first.clientX;
        var tmpY = current.clientY - first.clientY;
        var rad = Math.atan2(tmpY, tmpX); // In radians
        var degree = Math.round(rad * (180 / Math.PI));

        this.loggingService.Log(`Degreexxx: ${degree}`,this.loggingService.GetIdentifier(this.className, this.GetDegree.name), this.loggingEnabled);


        return degree;
    }
}