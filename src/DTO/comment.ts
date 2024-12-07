export interface CommentDTO {
    _id: string;
    title: string;
    description: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    comments: CommentDetail[];
}

export interface CommentDetail {
    _id: string;
    comment: string;
    post_id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
