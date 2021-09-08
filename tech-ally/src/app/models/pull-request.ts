import { _RecycleViewRepeaterStrategy } from "@angular/cdk/collections";
import { PullRequestDto, ReviewDto } from "@app/dtos/pull-request.dto";
import { Review } from "./review";

export class PullRequest {

    name: string;
    id: string;
    description: string = "";
    user: string = "";
    repo: string = "";
    created: string;
    updated: string;
    url: string;
    review!: Review;

    constructor(id: string, name: string, repo: string, url: string, created: string, updated: string, user: string) {
        this.id = id;
        this.url = url
        this.name = name
        this.repo = repo
        this.user = user
        this.created = created
        this.updated = updated
    }

    static fromDto(pr: PullRequestDto): PullRequest {
        let pull: PullRequest = new PullRequest(pr.id, pr.title, pr.head.repo.name, pr.html_url, pr.created_at, pr.updated_at, pr.user.login)
        pull.review = determineReviewState(pr.reviews)
        console.log(pull.review.status)
        return pull
    }

    static fromDtoList(projectDtoList: PullRequestDto[]): PullRequest[] {
        let PullRequestList: PullRequest[] = []
        if (projectDtoList === undefined || projectDtoList == null || projectDtoList.length == 0) {
            console.log("No pull requests found")
            return PullRequestList;
        }
        for (let dto of projectDtoList) {
            PullRequestList.push(PullRequest.fromDto(dto))
        }
        return PullRequestList
      }
}

function determineReviewState(reviews: ReviewDto[]): Review{
    let review: Review = new Review("UNREVIEWED", "NONE", "", "", 0)
    let reviewCount = 0
    if (reviews) {
        reviewCount = reviews.length
    for (let r of reviews) {
      switch(r.state) { 
        case "CHANGES_REQUESTED": { 
            review = new Review("CHANGES_REQUESTED", r.user.login, r.submitted_at, r.state, reviewCount) 
            continue; 
        } 
        case "APPROVED": { 
            return new Review("APPROVED", r.user.login, r.submitted_at, r.state, reviewCount) 
        } 
     } 
    }
}
    return review
}
