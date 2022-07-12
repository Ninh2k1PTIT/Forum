import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";

import { ArticlesService, UserService } from "../../core";
import { of } from "rxjs";
import { concatMap } from "rxjs/operators";
import { Post } from "../../core/models/Post.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-favorite-button",
  templateUrl: "./favorite-button.component.html",
})
export class FavoriteButtonComponent {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() post: Post;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;
    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          // Not authenticated? Push to login screen
          if (!authenticated) {
            this.router.navigateByUrl("/login");
            return of(null);
          }

          this.userService.currentUser
            .subscribe((user) => {
              if (!user.active) {
                this.isSubmitting = false;
                Swal.fire({
                  title: "Thất bại",
                  text: "Tài khoản của bạn đã bị khóa và không thể đánh giá câu hỏi. Vui lòng liên hệ quản trị viên.",
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonColor: "#7367F0",
                  confirmButtonText: "OK",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                });
                this.router.navigateByUrl("/");
              } else if (!this.post.upVote && !this.post.downVote) {
                this.articlesService
                  .createVote({
                    postId: this.post.id,
                    userId: user.id,
                    upVote: true,
                  })
                  .subscribe((data) => {
                    this.toggle.emit(true);
                    this.isSubmitting = false;
                  });
              } else if (this.post.upVote) {
                this.articlesService
                  .deleteVote({
                    postId: this.post.id,
                    userId: user.id,
                  })
                  .subscribe((data) => {
                    this.toggle.emit(false);
                    this.isSubmitting = false;
                  });
              } else {
                this.articlesService
                  .updateVote({
                    postId: this.post.id,
                    userId: user.id,
                  })
                  .subscribe((data) => {
                    this.toggle.emit(true);
                    this.isSubmitting = false;
                  });
              }
            })
            .unsubscribe();
          return of(null);
        })
      )
      .subscribe()
      .unsubscribe();
  }
}
