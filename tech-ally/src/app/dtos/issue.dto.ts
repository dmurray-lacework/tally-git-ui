export interface IssueDto {
    title: string;
    id: number;
    repo: string
    html_url: string;
    state: string;
    labels: [];
    created_at: string;
    updated_at: string;
}
