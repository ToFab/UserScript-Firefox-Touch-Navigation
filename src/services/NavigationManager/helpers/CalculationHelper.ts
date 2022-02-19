import { TouchPoint } from "../../../models/TouchPoint";
import { LoggingService } from "../../LoggingManager/LoggingService";

export class CalculationHelper {

    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(CalculationHelper.name);
    }

    GetDegree(current: TouchPoint, first: TouchPoint, log: boolean): number {

        this.loggingService.LogInfo("Calculate the degree / angel of the swipe", CalculationHelper.name, log);

        this.loggingService.LogInfo(`x1: ${first.clientX}`, CalculationHelper.name, log);
        this.loggingService.LogInfo(`y1: ${first.clientY}`, CalculationHelper.name, log);
        this.loggingService.LogInfo(`x2: ${current.clientX}`, CalculationHelper.name, log);
        this.loggingService.LogInfo(`y2: ${current.clientY}`, CalculationHelper.name, log);
       

        var rad = Math.atan2((current.clientY - first.clientY), (current.clientX - first.clientX)); // In radians
        var degree = Math.round(rad * (180 / Math.PI));

        this.loggingService.LogInfo(`Degree: ${degree}`, this.GetDegree.name, log);

        return degree;
    }

    ThredsholdExceeded(current: TouchPoint, thredshold: number, first: TouchPoint, log: boolean) {

        var deltas = this.GetDeltas(current, first);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {

            this.loggingService.LogSuccess(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`, this.ThredsholdExceeded.name, log);

            return true;
        }
        this.loggingService.LogInfo(`Thredshold: false deltaX: ${deltas.deltaX}`, this.ThredsholdExceeded.name, log);

        return false;
    }

    GetDeltas(current: TouchPoint, first: TouchPoint) {

        return {
            deltaX: current.clientX - first.clientX,
            deltaY: current.clientY - first.clientY
        }
    }
}