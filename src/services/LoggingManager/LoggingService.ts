export class LoggingService{

    loggingEnabled: boolean = false;
    _name:string = "";

    Log(message:string){
        
        if(this.loggingEnabled){
            console.log(this._name, message);
        }
    }

    EnableLog(enable:boolean, name:string){
        this.loggingEnabled = enable;
        this._name = name;
    }

    constructor(enableLogging:boolean, name: string){
        this.loggingEnabled = enableLogging;   
        this._name = name;     
    }

}