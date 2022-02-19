export class LoggingService {

    private _className: string;

    constructor(className: string){
        this._className = className;
    }  

    LogInfo(message: string, caller: string, enabled: boolean) {
        if (enabled){
            console.log(`${this._className}.${caller} - ${message}`);            
        }        
    };
    
    LogSuccess(message: string, caller: string, enabled: boolean) {
        if (enabled){
            console.log(`%c${this._className}.${caller} - ${message}`,'color: green;font-weight:bold;');            
        }        
    };

    LogWarn(message: string, caller: string, enabled: boolean) {
        if (enabled){
            console.log(`%c${this._className}.${caller} - ${message}`,'color: yellow;font-weight:bold;');            
        }        
    };

    LogError(message: string, caller: string, enabled: boolean) {
        if (enabled){
            console.log(`%c${this._className}.${caller} - ${message}`,'color: red;font-weight:bold;');            
        }        
    };

}