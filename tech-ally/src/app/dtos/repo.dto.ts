import { CommitDto } from "./commit.dto";
import { ReleaseDto } from "./release.dto";

export interface RepoDto {
    name: string;
    issues: number;
    pull_requests: number;
    language: string;
    description: string;
    release: ReleaseDto;
    commits: CommitDto[];
}