import { TouchPoint } from "../../../models/TouchPoint";
import { LoggingService } from "../../LoggingManager/LoggingService";

export class CalculationHelper {

    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(CalculationHelper.name);
    };

    // 
    GetVirtualCoordinates(p1: TouchPoint, p2: TouchPoint, log: boolean){
        
        var originalx1 = p1.clientX;
        var originaly1 = p1.clientY;
        var originalx2 = p2.clientX;
        var originaly2 = p2.clientY;

        var virtualx1 = 0;
        var virtualy1 = 0;

        var virtualx2 = originalx2 - originalx1;
        var virtualy2 = originaly1 - originaly2;
        
        this.loggingService.LogInfo(`Virtual p1: (${virtualx1},${virtualy1})`, this.GetVirtualCoordinates.name, log);
        this.loggingService.LogInfo(`Virtual p2 (deltaX,deltaY): (${virtualx2},${virtualy2})`, this.GetVirtualCoordinates.name, log); 

        return {
            X: Math.abs(virtualx2),
            Y: Math.abs(virtualy2)
        };
    } ;   

    GetAngle(first: TouchPoint, last: TouchPoint, log: boolean): number {        

        var virtualTouchPoint = this.GetVirtualCoordinates(first, last, log);        

        var radian = Math.atan2(virtualTouchPoint.Y, virtualTouchPoint.X); // In radian           
        var angle = Math.round(radian * (180 / Math.PI));

        this.loggingService.LogInfo(`Swipe angle: ${angle}`, this.GetAngle.name, log);

        return angle;
    };

    ValidateSwipeLength(first: TouchPoint, last: TouchPoint, minimumSwipeLength: number, log: boolean):boolean {

        var virtualTouchPoint = this.GetVirtualCoordinates(first, last, log);        

        if (virtualTouchPoint.X > minimumSwipeLength){
            
            this.loggingService.LogInfo("Swipe has the minimum required length", this.ValidateSwipeLength.name, log);
            return true;
        }

        this.loggingService.LogInfo("Swipe is too short", this.ValidateSwipeLength.name, log);
        return false;
      
    };

    
}