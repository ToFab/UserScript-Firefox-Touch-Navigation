import { TouchPoint } from "../../../../models/TouchPoint";
import { LoggingService } from "../../../LoggingManager/LoggingService";


export class ThredsholdHelper {

    loggingEnabled = false;
    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(this.loggingEnabled, "ThredsholdHelper");
    };

    EnableLogging(enable: boolean){
        if (enable){
            console.log("Logging enabled for ThredsholdHelper");
        }
        this.loggingEnabled = enable;
    }

    ThredsholdExceeded(current: TouchPoint, thredshold: number, first: TouchPoint) {

        var loggingService = new LoggingService(this.loggingEnabled, "ThredsholdHelper");

        var deltas = this.GetDeltas(current, first);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {
            
            loggingService.Log(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`);
            
            return true;
        }
        loggingService.Log(`Thredshold: false deltaX: ${deltas.deltaX}`);
        
        return false;
    }

    GetDeltas(current: TouchPoint, first: TouchPoint) {

        return {
            deltaX: current.clientX - first.clientX,
            deltaY: current.clientY - first.clientY
        }
    }
}