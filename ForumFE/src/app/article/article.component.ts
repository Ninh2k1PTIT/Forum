import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

import {
  ArticlesService,
  Comment,
  CommentsService,
  User,
  UserService,
} from "../core";
import { Post } from "../core/models/Post.model";

@Component({
  selector: "app-article-page",
  templateUrl: "./article.component.html",
})
export class ArticleComponent implements OnInit {
  post: Post;
  currentUser: User;
  canModify: boolean;
  isAdmin: boolean = false;
  comments: Comment[];
  commentForm = new FormGroup({});
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (
      JSON.parse(localStorage.getItem("user"))?.roles?.includes("ROLE_ADMIN")
    ) {
      this.isAdmin = true;
    }
    this.commentForm = this.fb.group({
      body: [null, Validators.required],
      postId: null,
      userId: null,
    });

    // Retreive the prefetched article
    this.route.data.subscribe((data) => {
      this.post = data.data;
      this.commentForm.patchValue({ postId: this.post.id });
      // Load the comments on this article
      this.populateComments();
    });

    // Load the current user's data
    this.userService.currentUser.subscribe((userData: User) => {
      this.currentUser = userData;
      this.commentForm.patchValue({ userId: userData.id });
      this.canModify = this.currentUser.id === this.post.userId;
    });
  }

  setStatus() {
    this.post.open = !this.post.open;
    if (this.post.open) {
      this.post.closedAt = null;
    } else this.post.closedAt = new Date();
    this.articlesService.save(this.post, "update").subscribe();
  }

  deleteArticle() {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn muốn xóa câu hỏi này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Đúng",
      cancelButtonText: "Hủy",
      preConfirm: () => {
        this.isDeleting = true;

        this.articlesService.destroy(this.post.id).subscribe((success) => {
          this.router.navigateByUrl("/");
        });
      },
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
    }).then(function (result: any) {
      if (result.value) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Câu hỏi của bạn đã được xóa",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  }

  populateComments() {
    this.commentsService.getAll(this.post.id).subscribe((res) => {
      this.comments = res.data;
    });
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    if (!this.currentUser.active) {
      Swal.fire({
        title: "Thất bại",
        text: "Tài khoản của bạn đã bị khóa và không thể trả lời câu hỏi. Vui lòng liên hệ quản trị viên.",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#7367F0",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
      this.isSubmitting = false;
      return;
    }

    this.commentsService.add(this.commentForm.value).subscribe(
      (comment) => {
        this.comments.unshift(comment);
        this.commentForm.patchValue({ body: null });
        this.isSubmitting = false;
      },
      (errors) => {
        this.isSubmitting = false;
        this.commentFormErrors = errors;
      }
    );
  }

  onDeleteComment(comment) {
    Swal.fire({
      title: "Xác nhận",
      text: "Xóa câu trả lời này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Đúng",
      cancelButtonText: "Hủy",
      preConfirm: () => {
        this.commentsService.destroy(comment.id).subscribe((success) => {
          this.comments = this.comments.filter((item) => item !== comment);
        });
      },
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
    }).then(function (result: any) {
      if (result.value) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Câu trả lời của bạn đã được xóa",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  }
}
