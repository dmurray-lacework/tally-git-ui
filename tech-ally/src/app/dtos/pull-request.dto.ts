export interface PullRequestDto {
    id: string;
    title: string;
    state: string;
    created_at: string;
    updated_at: string;
    description:string;
    html_url: string;
    comments: number;
    head: HeadRequestDto;
    user: UserRequestDto;
    reviews: ReviewDto[];
}

export interface HeadRequestDto {
    repo: RepoRequestDto
}

export interface RepoRequestDto {
    name:string;
}

export interface UserRequestDto {
    login:string
}

export interface ReviewDto {
    state: string;
    user: UserRequestDto;
    submitted_at: string;
    body: string;
}