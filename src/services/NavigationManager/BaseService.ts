import { TouchPoint } from "../../models/TouchPoint";
import { DegreeHelper } from "./helpers/Utilities/DegreeHelper";
import { TouchDetectionHelper } from "./helpers/TouchDetectionHelper";
import { HorisontalHelper } from "./helpers/Utilities/HorisontalHelper";
import { ThredsholdHelper } from "./helpers/Utilities/ThredsholdHelper";
import { LoggingService } from "../LoggingManager/LoggingService";

export const thredshold = 75;

export class BaseService {

    _baseServiceloggingEnabled = false; 
    
    private static instance: BaseService;
    LoggingService: LoggingService;
    DegreeHelper: DegreeHelper;
    HorisontalHelper: HorisontalHelper;
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
        this.LoggingService = new LoggingService(this.BaseServiceloggingEnabled,"LoggingService");
        this.DegreeHelper = new DegreeHelper();
        this.HorisontalHelper = new HorisontalHelper();
        this.TouchDetectionHelper = new TouchDetectionHelper();
        this.ThredsholdHelper = new ThredsholdHelper();
    }

    ShouldNavigate(current: TouchPoint, first: TouchPoint, previous: TouchPoint, thredshold: number, multiTouchDetected: boolean): boolean {


        if (multiTouchDetected) {
            return false;
        }       

        var shouldNavigate = (
            !multiTouchDetected 
            && BaseService.instance.HorisontalHelper.isHorisontalIsh(current, first) 
            && BaseService.instance.TouchDetectionHelper.isCurrentTouchOneFinger(current) 
            && BaseService.instance.TouchDetectionHelper.wasPreviousTouchOneFinger(previous) 
            && BaseService.instance.ThredsholdHelper.ThredsholdExceeded(current, thredshold, first));

        if (shouldNavigate){
            if (history.length == 0) {

                this.LoggingService.Log("History is empty");
    
                return false;
            }
        }        

        return shouldNavigate;
    }
}
