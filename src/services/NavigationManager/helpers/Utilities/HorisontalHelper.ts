import { TouchPoint } from "../../../../models/TouchPoint";
import { LoggingService } from "../../../LoggingManager/LoggingService";
import { BaseService } from "../../BaseService";


export class HorisontalHelper {

    loggingEnabled = false;
    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(this.loggingEnabled, "HorisontalHelper");
    };

    EnableLogging(enable: boolean){
        if (enable){
            console.log("Logging enabled for HorisontalHelper");
        }
        this.loggingEnabled = enable;
    }

    isHorisontalIsh(current: TouchPoint, first: TouchPoint) {

        var loggingService = new LoggingService(this.loggingEnabled, "HorisontalHelper");

        loggingService.Log("Entering isHorisontalIsh");
                var degree = BaseService.getInstance().DegreeHelper.GetDegree(current, first);        
                loggingService.Log(`Degree A: ${degree}`);        

        if ((degree >= -36 && degree <= 15) || (degree >= -150 && degree <= 165)) {
            loggingService.Log("Degree is validxx");          

            return true;
        } else {
            console.log("Degree is invalidxx"); 
        }

        return false;
    }
}