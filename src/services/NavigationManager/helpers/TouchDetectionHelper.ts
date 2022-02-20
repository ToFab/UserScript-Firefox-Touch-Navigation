import { TouchPoint } from "../../../models/TouchPoint";
import { LoggingService } from "../../LoggingManager/LoggingService";
import { BaseService } from "../BaseService";

export class TouchDetectionHelper {

    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(TouchDetectionHelper.name);
    }

    ValidateTouch(current: TouchPoint, log: boolean) {

        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        if (retval) {
            this.loggingService.LogSuccess(`${retval}`, this.ValidateTouch.name, log);
        } else {
            this.loggingService.LogInfo(`${retval}`, this.ValidateTouch.name, log);
        }

        return retval;
    }

    ValidateTouchSeries(previous: TouchPoint, log: boolean) {

        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        if (retval) {
            this.loggingService.LogSuccess(`${retval}`, this.ValidateTouchSeries.name, log);
        } else {
            this.loggingService.LogInfo(`${retval}`, this.ValidateTouchSeries.name, log);
        }


        return retval;
    }

    ValidateSwipeAngle(first: TouchPoint, last: TouchPoint, log: boolean) {

        // We want to disregard all swipe that are almost virtical or very steep in angle.
        var angle = BaseService.getInstance().CalculationHelper.GetAngle(first, last, log);
        
        if (angle < 75) {            
            this.loggingService.LogSuccess(`The swipe angle is OK`, this.ValidateSwipeAngle.name, log);            
            return true;
        };
        
        this.loggingService.LogWarn(`The swipe is too steep. Continue`, this.ValidateSwipeAngle.name, log);            
        return false;
    };

    ValidateSwipeLength(first: TouchPoint, last: TouchPoint,  minimumSwipeLength: number, log: boolean) {

        var virtualTouchPoint = BaseService.getInstance().CalculationHelper.GetVirtualCoordinates(first, last, log); 
        
        if (virtualTouchPoint.X >  minimumSwipeLength) {            
            this.loggingService.LogSuccess(`The swipe is horisontal. Continue`, this.ValidateSwipeLength.name, log);            
            return true;
        };
        
        this.loggingService.LogWarn(`The swipe is too steep. Continue`, this.ValidateSwipeLength.name, log);            
        return false;
    };
};
