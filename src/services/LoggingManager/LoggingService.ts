export class LoggingService {

    private _className: string;

    constructor(className: string){
        this._className = className;
    }

    Log(message: string, caller: string, enabled: boolean) {
        if (enabled){
            console.log(`${this._className}.${caller} : ${message}`);            
        }        
    }   

}