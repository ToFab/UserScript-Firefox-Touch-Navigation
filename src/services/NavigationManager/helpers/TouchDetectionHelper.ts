import { TouchPoint } from "../../../models/TouchPoint";
import { LoggingService } from "../../LoggingManager/LoggingService";


export class TouchDetectionHelper {

    loggingEnabled = false;
    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(this.loggingEnabled, "TouchDetectionHelper");
    };

    EnableLogging(enable: boolean){
        if (enable){
            console.log("Logging enabled for TouchDetectionHelper");
        }
        this.loggingEnabled = enable;
    }

    isCurrentTouchOneFinger(current: TouchPoint) {
        var loggingService = new LoggingService(this.loggingEnabled,"TouchDetectionHelper.isCurrentTouchOneFinger");

        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        
        loggingService.Log(`isCurrentTouchOneFinger: ${retval}`);
        
        return retval;
    }

    wasPreviousTouchOneFinger(previous: TouchPoint) {

        var loggingService = new LoggingService(this.loggingEnabled,"TouchDetectionHelper.wasPreviousTouchOneFinger");
        
        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        loggingService.Log(`wasPreviousTouchOneFinger: ${retval}`);
        
        return retval;
    }
}