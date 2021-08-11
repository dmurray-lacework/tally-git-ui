export interface CommitDto {
    sha: string;
    html_url: string;
    commit: Commit;
}

export interface Commit {
    message: string;
    comment_count: number;
    author: Author;
}

export interface Author {
    name: string;
    email: string;
    date: string;
}
