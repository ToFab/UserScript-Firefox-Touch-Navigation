import { TouchPoint } from "../../../models/TouchPoint";
import { LoggingService } from "../../LoggingManager/LoggingService";
import { BaseService, thredshold } from "../BaseService";

export class TouchDetectionHelper {

    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(TouchDetectionHelper.name);
    }

    IsOneFingerTouch(current: TouchPoint, log: boolean) {

        var retval = (current.touches == 0 && current.targetTouches == 0 && current.changedTouches == 0);
        if (retval) {
            this.loggingService.LogSuccess(`isCurrentTouchOneFinger: ${retval}`, this.IsOneFingerTouch.name, log);
        } else {
            this.loggingService.LogInfo(`isCurrentTouchOneFinger: ${retval}`, this.IsOneFingerTouch.name, log);
        }

        return retval;
    }

    wasPreviousOneFingerTouch(previous: TouchPoint, log: boolean) {

        var retval = (previous.touches == 1 && previous.targetTouches == 1 && previous.changedTouches == 1);
        if (retval) {
            this.loggingService.LogSuccess(`wasPreviousTouchOneFinger: ${retval}`, this.IsOneFingerTouch.name, log);
        } else {
            this.loggingService.LogInfo(`wasPreviousTouchOneFinger: ${retval}`, this.IsOneFingerTouch.name, log);
        }


        return retval;
    }

    DetectSwipeGesture(last: TouchPoint, first: TouchPoint, log: boolean) {        

        var degree = BaseService.getInstance().CalculationHelper.GetDegree(last, first, log);

        // Swipe right action.
        if (last.clientX > first.clientX) {

            if (last.clientY < first.clientY) {
                this.loggingService.LogWarn("Swipe 'right up' in progress", this.DetectSwipeGesture.name, log);
            } else {
                this.loggingService.LogWarn("Swipe 'right down' in progress", this.DetectSwipeGesture.name, log);
            };

            var high = 45;
            var low = -45;

            if (degree >= low && degree <= high) {

                this.loggingService.LogSuccess(`Degree ${degree} is within valid range.`, this.DetectSwipeGesture.name, log);
                return true;
            }
        }

        // Swipe left action
        if (first.clientX > last.clientX) {

            if (last.clientY < first.clientY) {
                this.loggingService.LogWarn("Swipe 'left up' in progress", this.DetectSwipeGesture.name, log);
            } else {
                this.loggingService.LogWarn("Swipe 'left down' in progress", this.DetectSwipeGesture.name, log);
            };

            var high = 105;
            var low = -135;

            if (degree >= low && degree <= high) {

                this.loggingService.LogSuccess(`Degree ${degree} is within valid range.`, this.DetectSwipeGesture.name, log);
                return true;
            }
        }
        
        this.loggingService.LogInfo(`Degree ${degree} is outside of the valid range.`, this.DetectSwipeGesture.name, log);
        return false;
    }
}