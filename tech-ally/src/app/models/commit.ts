import { CommitDto } from "@app/dtos/commit.dto";
import { IssueDto } from "@app/dtos/issue.dto";
import "@app/extensions/date";

export class Commit {
    name: string;
    author: string;
    url: string;
    created: string;
    sha!: string;
    type!: string;

    constructor(name: string, author: string, url: string, created: string, sha: string, type: string) {
        this.name = name;
        this.author = author;
        this.url = url;
        this.created = created;
        this.sha = sha;
        this.type = type;
    }

    static fromDto(commitDto: CommitDto): Commit{
        let message = commitDto.commit.message.split(":")
        return new Commit(message[1], 
            commitDto.commit.author.name, 
            commitDto.html_url, commitDto.commit.author.date,
            commitDto.sha,
            message[0]
            )
    }

    static fromDtoList(commitDtoList: CommitDto[]): Commit[] {
        let commitList: Commit[] = []
        if (commitDtoList === undefined || commitDtoList == null || commitDtoList.length == 0) {
            console.log("No commits found")
            return commitList;
        }
        for (let dto of commitDtoList) {
            commitList.push(Commit.fromDto(dto))
        }
        return commitList.sort((a,b) => (a.created < b.created) ? 1 : -1)
    }

}

