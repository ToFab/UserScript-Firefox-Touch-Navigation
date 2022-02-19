import { TouchPoint } from "../../../../models/TouchPoint";
import { LoggingService } from "../../../LoggingManager/LoggingService";
import { BaseService, thredshold } from "../../BaseService";

export class DegreeHelper {

    private loggingEnabled = false; 
    _loggingService: LoggingService;   

    constructor() { 
        this._loggingService = new LoggingService(this.loggingEnabled, "DegreeHelper");
    };

    EnableLogging(enable: boolean){
        if (enable){
            console.log("Logging enabled for DegreeHelper");
        }
        
        this.loggingEnabled = enable;
        
    }

    GetDegree(current: TouchPoint, first: TouchPoint): number {

        var tmpX = current.clientX - first.clientX;
        var tmpY = current.clientY - first.clientY;
        var rad = Math.atan2(tmpY, tmpX); // In radians
        var degree = Math.round(rad * (180 / Math.PI));
        
        this._loggingService.Log(`Degreexxx: ${degree}`)
        

        return degree;
    }
}