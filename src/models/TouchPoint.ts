export class TouchPoint {

    public clientX: number = -1;
    public clientY: number = -1;
    public touches: number = -1;
    public targetTouches: number = -1;
    public changedTouches: number = -1;
  
    constructor(e: any, useChangedTouches: boolean = false) {
  
      if (useChangedTouches) {
        this.clientX = e.changedTouches[0].clientX;
        this.clientY = e.changedTouches[0].clientY;
      } else {
        if (e.touches != null) {
          this.clientX = e.touches[0].clientX;
          this.clientY = e.touches[0].clientY;
        }
      }
  
      if (e.touches != null) {
        this.touches = e.touches.length;
      }
  
      if (e.targetTouches != null) {
        this.targetTouches = e.targetTouches.length;
        this.changedTouches = e.targetTouches.length;
      }      
    }
  }