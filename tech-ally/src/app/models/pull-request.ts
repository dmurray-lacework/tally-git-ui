import { PullRequestDto } from "@app/dtos/pull-request.dto";

export class PullRequest {

    name: string;
    id: string;
    description: string = "";
    user: string = "";
    repo: string = "";
    created: string;
    updated: string;
    url: string;

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
        return new PullRequest(pr.id, pr.title, pr.head.repo.name, pr.html_url, pr.created_at, pr.updated_at, pr.user.login)
    }

    static fromDtoList(projectDtoList: PullRequestDto[]): PullRequest[] {
        let PullRequestList: PullRequest[] = []
        for (let dto of projectDtoList) {
            PullRequestList.push(PullRequest.fromDto(dto))
        }
        return PullRequestList
      }
}
