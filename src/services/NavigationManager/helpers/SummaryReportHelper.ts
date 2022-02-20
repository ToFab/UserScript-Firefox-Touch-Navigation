import { LoggingService } from "../../LoggingManager/LoggingService";

export class SummaryReportHelper {

    loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService(SummaryReportHelper.name);
    }

    printSummary(check4MultiTouch: boolean, check4SwipeGesture: boolean, check4OneFingerTouch: boolean, checkTouchSerie: boolean, checkSwipeLength: boolean, printSummary:boolean, log: boolean) {

        if (printSummary) { 
                      
            this.loggingService.LogInfo(`Summary Report`, this.printSummary.name, log);

            var result = "FAIL";
            
            var message = "Not multi-touch?"
            if (check4MultiTouch == false) {
                result = "PASS"                

                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            } else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            };

            result = "FAIL";
            message = "Is Swipe gesture?";

            if (check4SwipeGesture == true) {
                result = "PASS";                

                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            } else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            };

            result = "FAIL";
            message = "Is one finger touch?";

            if (check4OneFingerTouch == true) {
                result = "PASS";
                
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            } else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            };

            result = "FAIL";
            message = "Touch serie ok?";

            if (checkTouchSerie == true) {
                result = "PASS";
                
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            } else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            };

            result = "FAIL";
            message = "Swipe has required minimum length? ";

            if (checkSwipeLength == true) {
                result = "PASS";
                
                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            } else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            };

            result = "FAIL";
            message = "There a pages in the history. OK.";

            if (history.length > 0) {
                result = "PASS";                

                this.loggingService.LogSuccess(`${message} ${result}`, this.printSummary.name, log);
            } else {
                this.loggingService.LogError(`${message} ${result}`, this.printSummary.name, log);
            };
        }
    }

}