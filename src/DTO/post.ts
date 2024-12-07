export interface Comment {
    "_id": string;
    title: string;
    description: string;
    color: string;
    comment_count: number;
}

export interface CreatePostDTO {
    title: string;
    description: string;
    color: string
}

