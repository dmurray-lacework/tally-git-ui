import { CommitDto } from "@app/dtos/commit.dto";
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
        let type = "n/a";
        let commitMessage = commitDto.commit.message;
        if (message.length > 0) {
            commitMessage = message[1];
            type = message[0]
        }

        return new Commit(commitMessage, 
            commitDto.commit.author.name, 
            commitDto.html_url, commitDto.commit.author.date,
            commitDto.sha,
            type
            )
    }

    static fromDtoList(commitDtoList: CommitDto[]): Commit[] {
        let commitList: Commit[] = []
        if (commitDtoList === undefined || commitDtoList == null || commitDtoList.length == 0) {
            console.debug("No commits found")
            return commitList;
        }
        for (let dto of commitDtoList) {
            commitList.push(Commit.fromDto(dto))
        }
        return commitList.sort((a,b) => (a.created < b.created) ? 1 : -1)
    }

}

