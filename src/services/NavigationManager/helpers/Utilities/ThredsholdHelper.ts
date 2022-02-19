import { TouchPoint } from "../../../../models/TouchPoint";
import { LoggingService } from "../../../LoggingManager/LoggingService";


export class ThredsholdHelper {

    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(ThredsholdHelper.name);
    };        

    ThredsholdExceeded(current: TouchPoint, thredshold: number, first: TouchPoint, log:boolean) {        
        
        var deltas = this.GetDeltas(current, first);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {
            
            this.loggingService.Log(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`, this.ThredsholdExceeded.name, log);
            
            return true;
        }
        this.loggingService.Log(`Thredshold: false deltaX: ${deltas.deltaX}`,this.ThredsholdExceeded.name, log);
        
        return false;
    }

    GetDeltas(current: TouchPoint, first: TouchPoint) {

        return {
            deltaX: current.clientX - first.clientX,
            deltaY: current.clientY - first.clientY
        }
    }
}