
interface Date {
    daysSince: () => number;
}

Date.prototype.daysSince = function(): number {  
    var diff = Math.abs(this.getTime() - Date.now());
    return Math.ceil(diff / (1000 * 3600 * 24)); 
}  