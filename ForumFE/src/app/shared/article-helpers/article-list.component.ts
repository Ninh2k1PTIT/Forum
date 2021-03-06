import { Component, Input } from "@angular/core";

import { ArticleListConfig, ArticlesService } from "../../core";
import { Post } from "../../core/models/Post.model";
@Component({
  selector: "app-article-list",
  styleUrls: ["article-list.component.css"],
  templateUrl: "./article-list.component.html",
})
export class ArticleListComponent {
  constructor(private articlesService: ArticlesService) {}

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: ArticleListConfig;
  results: Post[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }
    if (this.query.filters.userId != undefined) {
      this.articlesService
        .getByUserId(this.query.filters.userId)
        .subscribe((data) => {
          this.loading = false;
          this.results = data.data;
        });
    } else if (this.query.filters.tagId != undefined) {
      this.articlesService
        .getByTagId(this.query.filters.tagId)
        .subscribe((data) => {
          this.loading = false;
          this.results = data.data;
        });
    } else {
      this.articlesService.getAll().subscribe((data) => {
        this.loading = false;
        this.results = data.data;
      });
    }
  }
}
