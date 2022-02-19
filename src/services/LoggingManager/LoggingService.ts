export class LoggingService {

    Log(message: string, caller: string, enabled: boolean) {
        if (enabled){
            console.log(caller, message);
        }        
    }

    GetIdentifier(className: string, functionName: string){
        return className + "." + functionName;
    }

}