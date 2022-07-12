import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { ApiService } from "./api.service";
import { ArticleListConfig } from "../models";
import { Post } from "../models/Post.model";
import { DataResponse } from "../models/DataResponse.model";
import { PostVote } from "../models/PostVote.model";

@Injectable()
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<DataResponse<Post>> {
    return this.apiService.get("/posts");
  }

  save(post: Post, type): Observable<Post> {
    if (type === "create") return this.apiService.post("/post", post);
    return this.apiService.put(`/post/${post.id}`, post);
  }

  query(
    config: ArticleListConfig
  ): Observable<{ articles: Post[]; articlesCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters).forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService.get(
      "/articles" + (config.type === "feed" ? "/feed" : ""),
      new HttpParams({ fromObject: params })
    );
  }

  get(id): Observable<Post> {
    return this.apiService.get("/post/" + id);
  }

  getByUserId(id): Observable<DataResponse<Post>> {
    return this.apiService.get("/post-by-user/" + id);
  }

  getByTagId(id): Observable<DataResponse<Post>> {
    return this.apiService.get("/post-by-tag/" + id);
  }

  destroy(id) {
    return this.apiService.delete("/post/" + id);
  }

  createVote(body): Observable<PostVote> {
    return this.apiService.post("/vote", body);
  }

  updateVote(body): Observable<PostVote> {
    return this.apiService.put(`/vote/update-by-post-and-user`, body);
  }

  deleteVote(body) {
    return this.apiService.post(`/vote/delete-by-post-and-user`, body);
  }
}
