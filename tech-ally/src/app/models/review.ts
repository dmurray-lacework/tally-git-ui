export class Review {
    status: string;
    reviewer: string
    submitted: string
    body: string
    count: number

    constructor(status: string, reviewer: string, submitted: string, body: string, count: number){
        this.status = status;
        this.reviewer = reviewer;
        this.body = body;
        this.submitted = submitted;
        this.count = count;
    }
}