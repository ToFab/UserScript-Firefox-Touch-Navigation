import { TouchPoint } from "../../models/TouchPoint";
import { TouchDetectionHelper } from "./helpers/TouchDetectionHelper";
import { LoggingService } from "../LoggingManager/LoggingService";
import { CalculationHelper } from "./helpers/CalculationHelper";

export const thredshold = 75;

export class BaseService {

    _printSummary = true;

    _traceSwipeGesture = false;
    _traceTouchGesture = false;
    _traceThredshold = false;
    _traceCalcuations = false;

    private static instance: BaseService;
    className = BaseService.name;
    LoggingService: LoggingService;
    TouchDetectionHelper: TouchDetectionHelper;
    CalculationHelper: CalculationHelper;
    _traceBaseService = false; //Will be maintained by system

    static getInstance(): BaseService {

        if (!BaseService.instance) {
            BaseService.instance = new BaseService();
        }

        return BaseService.instance;
    }

    constructor() {

        if (this._traceTouchGesture == true) {
            console.log("Logging enabled for TouchDetection");
        }

        if (this._traceSwipeGesture == true) {
            console.log("Logging enabled for SwipeDetection");
        }

        if (this._traceThredshold == true) {
            console.log("Logging enabled for Thredshold");
        };

        if (this._traceCalcuations == true) {
            console.log("Logging enabled for Calculations")
        };

        if (this._traceTouchGesture == true || this._traceSwipeGesture == true || this._traceThredshold == true || this._traceCalcuations == true) {

            console.log("Logging enabled for BaseService");
            this._traceBaseService = true;
        };

        this.LoggingService = new LoggingService(BaseService.name);
        this.TouchDetectionHelper = new TouchDetectionHelper();
        this.CalculationHelper = new CalculationHelper();
    }

    ShouldNavigate(current: TouchPoint, first: TouchPoint, previous: TouchPoint, thredshold: number, multiTouchDetected: boolean): boolean {

        if (multiTouchDetected) {
            this.LoggingService.LogInfo("MultiTouch detected. Abort", this.ShouldNavigate.name, this._traceBaseService);
            return false;
        }


        var param1 = !multiTouchDetected;
        var param2 = BaseService.instance.TouchDetectionHelper.DetectSwipeGesture(current, first, this._traceSwipeGesture);
        var param3 = BaseService.instance.TouchDetectionHelper.IsOneFingerTouch(current, this._traceTouchGesture);
        var param4 = BaseService.instance.TouchDetectionHelper.wasPreviousOneFingerTouch(previous, this._traceTouchGesture);
        var param5 = BaseService.instance.CalculationHelper.ThredsholdExceeded(current, thredshold, first, this._traceCalcuations);

        if (this._printSummary) {
            this.LoggingService.LogWarn(`All test below must pass before navigation start`, this.ShouldNavigate.name, true);
            var result = "FAIL";
            if (!param1) {
                result = "PASS"
                this.LoggingService.LogSuccess(`multiTouchDetected : ${result}`, this.ShouldNavigate.name, true);
            } else {
                this.LoggingService.LogError(`multiTouchDetected : ${result}`, this.ShouldNavigate.name, true);
            };


            result = "FAIL";
            if (!param2) { 
                result = "PASS"
                this.LoggingService.LogSuccess(`DetectSwipeGesture : ${result}}`, this.ShouldNavigate.name, true);
             }else{
                this.LoggingService.LogError(`DetectSwipeGesture : ${result}}`, this.ShouldNavigate.name, true);
             };
            

            result = "FAIL";
            if (!param3) { 
                result = "PASS" 
                this.LoggingService.LogSuccess(`IsOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }else{
                this.LoggingService.LogError(`IsOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            };
            

            result = "FAIL";
            if (!param4) { 
                result = "PASS" 
                this.LoggingService.LogSuccess(`wasPreviousOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            }else{
                this.LoggingService.LogError(`wasPreviousOneFingerTouch : ${result}`, this.ShouldNavigate.name, true);
            };
            

            result = "FAIL";
            if (!param5) { 
                result = "PASS" 
                this.LoggingService.LogSuccess(`ThredsholdExceeded : ${result}`, this.ShouldNavigate.name, this._traceBaseService);
            }else{
                this.LoggingService.LogError(`ThredsholdExceeded : ${result}`, this.ShouldNavigate.name, this._traceBaseService);
            };            
        }


        var shouldNavigate = !param1 && param2 && param3 && param4 && param5;

        if (shouldNavigate) {
            if (history.length == 0) {

                this.LoggingService.LogInfo("History is empty", this.ShouldNavigate.name, this._traceBaseService);

                return false;
            }
        }

        return shouldNavigate;
    }
}
