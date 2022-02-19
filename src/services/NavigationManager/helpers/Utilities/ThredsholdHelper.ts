import { TouchPoint } from "../../../../models/TouchPoint";
import { LoggingService } from "../../../LoggingManager/LoggingService";


export class ThredsholdHelper {

    className =  ThredsholdHelper.name;
    loggingEnabled = false;
    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService();
    };

    EnableLogging(enable: boolean){
        if (enable){
            console.log("Logging enabled for ThredsholdHelper");
        }
        this.loggingEnabled = enable;
    }

    ThredsholdExceeded(current: TouchPoint, thredshold: number, first: TouchPoint) {        
        
        var deltas = this.GetDeltas(current, first);
        if (deltas.deltaX > thredshold && deltas.deltaX > -1) {
            
            this.loggingService.Log(`Thredshold: true deltaX: ${deltas.deltaX} thredshold: ${thredshold}`, this.loggingService.GetIdentifier(this.className, this.ThredsholdExceeded.name), this.loggingEnabled);
            
            return true;
        }
        this.loggingService.Log(`Thredshold: false deltaX: ${deltas.deltaX}`,this.loggingService.GetIdentifier(this.className, this.ThredsholdExceeded.name), this.loggingEnabled);
        
        return false;
    }

    GetDeltas(current: TouchPoint, first: TouchPoint) {

        return {
            deltaX: current.clientX - first.clientX,
            deltaY: current.clientY - first.clientY
        }
    }
}