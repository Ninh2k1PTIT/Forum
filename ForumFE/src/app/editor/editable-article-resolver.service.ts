import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

import { ArticlesService, UserService } from "../core";
import { catchError, map } from "rxjs/operators";
import { Post } from "../core/models/Post.model";

@Injectable()
export class EditableArticleResolver implements Resolve<Post> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService.get(route.params["id"]).pipe(
      map((post) => {
        if (this.userService.getCurrentUser().id === post.userId) {
          return post;
        } else {
          this.router.navigateByUrl("/");
        }
      }),
      catchError((err) => this.router.navigateByUrl("/"))
    );
  }
}
