import { RepoDto } from "@app/dtos/repo.dto";

export class Repo {

    name: string;
    issues: number;
    pullRequests: number;
    iconLink: string = "";
    language: string;
    description: string;

    constructor(name: string, issues: number, pullRequests: number, language: string, description: string) {
        this.name = name;
        this.issues = issues;
        this.pullRequests = pullRequests
        this.language = language
        this.description = description
    }

    static fromDto(repo: RepoDto): Repo{
        return new Repo(repo.name, repo.issues, repo.pull_requests, repo.language, repo.description)
    }

    static fromDtoList(projectDtoList: RepoDto[]): Repo[] {
        let repoList: Repo[] = []
        for (let dto of projectDtoList) {
            repoList.push(Repo.fromDto(dto))
        }
        return repoList
      }
}
