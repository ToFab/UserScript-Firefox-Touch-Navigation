import { TouchPoint } from "../../models/TouchPoint";
import { TouchDetectionHelper } from "./helpers/TouchDetectionHelper";
import { ThredsholdHelper } from "./helpers/Utilities/ThredsholdHelper";
import { LoggingService } from "../LoggingManager/LoggingService";

export const thredshold = 75;

export class BaseService {
    
    _traceHorisontalSwipe = true;
    _traceCurrentTouch = false;
    _traceThredshold = false;
    _traceBaseService = false;
    
    className =  BaseService.name;
    private static instance: BaseService;
    LoggingService: LoggingService;       
    TouchDetectionHelper: TouchDetectionHelper;
    ThredsholdHelper: ThredsholdHelper;           

    static getInstance(): BaseService {

        if (!BaseService.instance) {
            BaseService.instance = new BaseService();
        }

        return BaseService.instance;
    }

    constructor() {

        if (this._traceCurrentTouch == true || this._traceHorisontalSwipe == true || this._traceThredshold == true){

            console.log("Logging enabled for BaseService");            
            this._traceBaseService = true;

            if (this._traceCurrentTouch == true){
                console.log("Logging enabled for CurrentTouch");            
            }

            if (this._traceHorisontalSwipe == true){
                console.log("Logging enabled for HorisontalSwipe");            
            }

            if (this._traceThredshold == true){
                console.log("Logging enabled for Thredshold");            
            }
        }else{
            console.log("wtf");
        }
        
        this.LoggingService = new LoggingService(BaseService.name);              
        this.TouchDetectionHelper = new TouchDetectionHelper();
        this.ThredsholdHelper = new ThredsholdHelper();
    }

    ShouldNavigate(current: TouchPoint, first: TouchPoint, previous: TouchPoint, thredshold: number, multiTouchDetected: boolean): boolean {

        if (multiTouchDetected) {
            this.LoggingService.Log("MultiTouch detected. Abort",this.ShouldNavigate.name,this._traceBaseService);
            return false;
        }       

        var shouldNavigate = (
            !multiTouchDetected 
            && BaseService.instance.TouchDetectionHelper.isHorisontalSwipe(current, first, this._traceHorisontalSwipe) 
            && BaseService.instance.TouchDetectionHelper.isCurrentTouchOneFinger(current,this._traceCurrentTouch) 
            && BaseService.instance.TouchDetectionHelper.wasPreviousTouchOneFinger(previous,this._traceCurrentTouch) 
            && BaseService.instance.ThredsholdHelper.ThredsholdExceeded(current, thredshold, first,this._traceThredshold));

        if (shouldNavigate){
            if (history.length == 0) {

                this.LoggingService.Log("History is empty",this.ShouldNavigate.name,this._traceBaseService);
    
                return false;
            }
        }        

        return shouldNavigate;
    }
}
