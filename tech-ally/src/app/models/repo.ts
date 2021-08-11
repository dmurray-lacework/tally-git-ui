import { Commit } from "@app/models/commit";
import { RepoDto } from "@app/dtos/repo.dto";

export class Repo {

    name: string;
    issues: number;
    pullRequests: number;
    iconLink: string = "";
    language: string;
    description: string;
    latestRelease: string;
    releasePublished: string;
    releaseLink: string;
    commits!: Commit[];

    constructor(name: string, issues: number, pullRequests: number, language: string, description: string, 
        latestRelease:string, releasePublished: string, releaseLink: string) {
        this.name = name;
        this.issues = issues;
        this.pullRequests = pullRequests;
        this.language = language;
        this.description = description;
        this.latestRelease = latestRelease;
        this.releasePublished = releasePublished;
        this.releaseLink = releaseLink;
    }

    static fromDto(repoDto: RepoDto): Repo{
        let repo = new Repo(repoDto.name, repoDto.issues, repoDto.pull_requests, repoDto.language, 
            repoDto.description, repoDto.release.tag_name, repoDto.release.published_at, repoDto.release.html_url)
            repo.commits = Commit.fromDtoList(repoDto.commits);

        return repo;
    }

    static fromDtoList(projectDtoList: RepoDto[]): Repo[] {
        let repoList: Repo[] = []
        for (let dto of projectDtoList) {
            repoList.push(Repo.fromDto(dto))
        }
        
        return repoList.sort((a,b) => (a.commits.length < b.commits.length) ? 1 : -1)
      }
}
