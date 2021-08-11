import { IssueDto } from "@app/dtos/issue.dto";
import "@app/extensions/date";

export class Issue {
    id: number;
    name: string;
    repo: string
    url: string;
    created: string;
    updated: string;
    labels: string[];
    state: string
    openedSince!: number;
    severity!: string;

    constructor(name: string, id: number, url: string, created: string, updated: string, labels: string[], state: string, repo: string) {
        this.name = name;
        this.id = id;
        this.url = url
        this.created = created
        this.updated = updated
        this.labels = labels
        this.state = state
        this.repo = repo
    }

    static fromDto(issueDto: IssueDto): Issue{
        let labels:[] = []
        for (let label of issueDto.labels) {
            labels.push(label['name'])
        }
        let issue = new Issue(issueDto.title, issueDto.id, issueDto.html_url, issueDto.created_at, issueDto.updated_at, labels, issueDto.state, issueDto.repo)
        issue.openedSince = new Date(issue.created).daysSince()
        issue.severity = this.setSeverity(issue.openedSince)
        return issue
    }

    static fromDtoList(issueDtoList: IssueDto[]): Issue[] {
        let IssueList: Issue[] = []
        if (issueDtoList === undefined || issueDtoList == null || issueDtoList.length == 0) {
            console.log("No issues found")
            return IssueList;
        }
        for (let dto of issueDtoList) {
            IssueList.push(Issue.fromDto(dto))
        }
        return IssueList.sort((a,b) => (a.created < b.created) ? 1 : -1)
      }

      static setSeverity(openedSince: number): string {
            if  (openedSince < 10) { 
                return Severity.LOW
            }
            if  (openedSince >= 10 && openedSince < 30) { 
                return Severity.MEDIUM
            }
            return Severity.HIGH
        }
    }

    enum Severity {
        HIGH = "high",
        MEDIUM = "medium",
        LOW = "low"
    }
