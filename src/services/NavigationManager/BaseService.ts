import { TouchPoint } from "../../models/TouchPoint";
import { TouchDetectionHelper } from "./helpers/TouchDetectionHelper";
import { LoggingService } from "../LoggingManager/LoggingService";
import { CalculationHelper } from "./helpers/CalculationHelper";
import { Direction } from "../../models/enums";
import { SummaryReportHelper } from "./helpers/SummaryReportHelper";

export class BaseService {
    
    private static instance: BaseService;
    _minimumSwipeLength: number = -1;
    className = BaseService.name;
    LoggingService: LoggingService;
    TouchDetectionHelper: TouchDetectionHelper;
    CalculationHelper: CalculationHelper;
    SummaryReportHelper: SummaryReportHelper;
    _traceBaseService = false; //Will be maintained by system. Use Main 
    _printSummary: boolean = false; //Will be maintained by system. Use Main
    _traceSwipeGesture: boolean = false; //Will be maintained by system. Use Main
    _traceTouchGesture: boolean = false; //Will be maintained by system. Use Main    
    _traceCalcuations: boolean = false; //Will be maintained by system. Use Main

    InitializeSettings(minimumSwipeLength: number) {
      this._minimumSwipeLength = minimumSwipeLength
    }

    InitializeLogging(printSummary: boolean, traceSwipeGesture: boolean, traceTouchGesture: boolean, traceCalcuations: boolean) {
        this._printSummary = printSummary;
        this._traceSwipeGesture = traceSwipeGesture;
        this._traceTouchGesture = traceTouchGesture;        
        this._traceCalcuations = traceCalcuations;
    };  
    
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

        if (this._traceCalcuations == true) {
            console.log("Logging enabled for Calculations")
        };

        if (this._traceTouchGesture == true || this._traceSwipeGesture == true || this._traceCalcuations == true) {

            console.log("Logging enabled for BaseService");
            this._traceBaseService = true;
        };

        this.LoggingService = new LoggingService(BaseService.name);
        this.TouchDetectionHelper = new TouchDetectionHelper();
        this.CalculationHelper = new CalculationHelper();
        this.SummaryReportHelper = new SummaryReportHelper();
    }

    ShouldWeNavigate(last: TouchPoint, first: TouchPoint, previous: TouchPoint, minimumSwipeLength: number, multiTouchDetected: boolean) {

        var retVal = [false, Direction.DoNothing];

        if (multiTouchDetected) {
            this.LoggingService.LogInfo("MultiTouch detected. Abort", this.ShouldWeNavigate.name, this._traceBaseService);
            return retVal;            
        }
        
        var validateSwipeAngle = BaseService.instance.TouchDetectionHelper.ValidateSwipeAngle(first,last , this._traceSwipeGesture);
        var validateSwipeLength = BaseService.instance.CalculationHelper.ValidateSwipeLength(first, last, minimumSwipeLength, this._traceCalcuations);
        var validateTouch = BaseService.instance.TouchDetectionHelper.ValidateTouch(last, this._traceTouchGesture);
        var validateTouchSeries = BaseService.instance.TouchDetectionHelper.ValidateTouchSeries(previous, this._traceTouchGesture);        

        var shouldNavigate = ((multiTouchDetected == false) && (validateSwipeAngle == true) && (validateTouch == true) && (validateTouchSeries == true) && (validateSwipeLength == true));

        BaseService.getInstance().SummaryReportHelper.printSummary(multiTouchDetected, validateSwipeAngle, validateTouch, validateTouchSeries, validateSwipeLength,this._printSummary,this._printSummary);

        if (shouldNavigate) { 

            if (history.length == 0) {

                this.LoggingService.LogInfo("History is empty", this.ShouldWeNavigate.name, this._traceBaseService);
                retVal = [shouldNavigate, Direction.DoNothing];            
            };

            if (first.clientX < last.clientX){
                this.LoggingService.LogInfo("Swiping left", this.ShouldWeNavigate.name, this._traceBaseService);
                retVal =  [shouldNavigate, Direction.Left];
            };

            if (first.clientX > last.clientX){
                this.LoggingService.LogInfo("Swiping right", this.ShouldWeNavigate.name, this._traceBaseService);
                retVal =  [shouldNavigate, Direction.Right];
            }
        }

        this.LoggingService.LogInfo(`Direction: ${retVal[1]}`, this.ShouldWeNavigate.name, this._traceBaseService);
        return retVal;  
    }

    
}
