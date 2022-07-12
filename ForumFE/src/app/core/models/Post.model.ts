import { PostVote } from "./PostVote.model";

export interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updateAt: Date;
  closedAt: Date;
  userId: number;
  tags: any[];
  postVotes: PostVote[];
  open: boolean;
  username: string;
  upVote: boolean;
  downVote: boolean;
}
