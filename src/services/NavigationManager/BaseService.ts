import { TouchPoint } from "../../models/TouchPoint";
import { TouchDetectionHelper } from "./helpers/TouchDetectionHelper";
import { ThredsholdHelper } from "./helpers/Utilities/ThredsholdHelper";
import { LoggingService } from "../LoggingManager/LoggingService";

export const thredshold = 75;

export class BaseService {

    _baseServiceloggingEnabled = true; 
    
    className =  BaseService.name;
    private static instance: BaseService;
    LoggingService: LoggingService;       
    TouchDetectionHelper: TouchDetectionHelper;
    ThredsholdHelper: ThredsholdHelper;       
    BaseServiceloggingEnabled = this._baseServiceloggingEnabled;

    static getInstance(): BaseService {

        if (!BaseService.instance) {
            BaseService.instance = new BaseService();
        }

        return BaseService.instance;
    }

    constructor() {

        this.BaseServiceloggingEnabled = this._baseServiceloggingEnabled;
        this.LoggingService = new LoggingService();              
        this.TouchDetectionHelper = new TouchDetectionHelper();
        this.ThredsholdHelper = new ThredsholdHelper();
    }

    ShouldNavigate(current: TouchPoint, first: TouchPoint, previous: TouchPoint, thredshold: number, multiTouchDetected: boolean): boolean {


        if (multiTouchDetected) {
            this.LoggingService.Log("MultiTouch detected. Abort",this.LoggingService.GetIdentifier(this.className, this.ShouldNavigate.name),this._baseServiceloggingEnabled);
            return false;
        }       

        var shouldNavigate = (
            !multiTouchDetected 
            && BaseService.instance.TouchDetectionHelper.isHorisontalSwipe(current, first) 
            && BaseService.instance.TouchDetectionHelper.isCurrentTouchOneFinger(current) 
            && BaseService.instance.TouchDetectionHelper.wasPreviousTouchOneFinger(previous) 
            && BaseService.instance.ThredsholdHelper.ThredsholdExceeded(current, thredshold, first));

        if (shouldNavigate){
            if (history.length == 0) {

                this.LoggingService.Log("History is empty",this.LoggingService.GetIdentifier(this.className, this.ShouldNavigate.name),this._baseServiceloggingEnabled);
    
                return false;
            }
        }        

        return shouldNavigate;
    }
}
