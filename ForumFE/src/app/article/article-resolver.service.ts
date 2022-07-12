import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { ArticlesService } from "../core";
import { catchError } from "rxjs/operators";
import { Post } from "../core/models/Post.model";

@Injectable()
export class ArticleResolver implements Resolve<Post> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService
      .get(route.params["id"])
      .pipe(catchError((err) => this.router.navigateByUrl("/")));
  }
}
