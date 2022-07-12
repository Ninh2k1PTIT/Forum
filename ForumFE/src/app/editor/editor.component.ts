import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import Swal from "sweetalert2";
import { ArticlesService, TagsService, User, UserService } from "../core";
import { Post } from "../core/models/Post.model";

@Component({
  selector: "app-editor-page",
  templateUrl: "./editor.component.html",
})
export class EditorComponent implements OnInit {
  article: Post = {} as Post;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;
  type: string = "create";

  subject = new Subject();
  tagExist: [];
  tags: any[] = [];
  userData: User;
  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private tagService: TagsService
  ) {
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      id: null,
      title: "",
      body: "",
      open: true,
      userId: [],
      tags: [[]],
    });

    // Initialized tagList as empty array
    // this.article.tagList = [];

    // Optional: subscribe to value changes on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }

  ngOnInit() {
    // If there's an article prefetched, load it
    this.route.data.subscribe((data) => {
      if (Object.keys(data).length > 0) {
        this.type = "update";
        this.article = data.data;
        this.tags = this.article.tags;
        this.articleForm.patchValue(this.article);
      }
    });

    this.userService.currentUser.subscribe((userData: User) => {
      this.userData = userData;
      this.articleForm.patchValue({ userId: userData.id });
    });

    this.subject
      .pipe(
        debounceTime(500),
        switchMap((searchText) => {
          return this.tagService.getByName(searchText);
        })
      )
      .subscribe((data) => {
        this.tagExist = data.data;
      });
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;

    // only add tag if it does not exist yet
    if (
      typeof tag == "object" &&
      this.tags
        .map((item) => {
          return item.id;
        })
        .indexOf(tag.id) < 0
    ) {
      this.tags.push(tag);
    } else if (
      typeof tag == "string" &&
      this.tags
        .map((item) => {
          return item.name;
        })
        .indexOf(tag) < 0
    ) {
      this.tags.push({ id: null, name: tag });
    }
    // clear the input
    this.tagField.reset("");
  }

  removeTag(tagName) {
    this.tags = this.tags.filter((tag) => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    if (!this.userData.active) {
      Swal.fire({
        title: "Thất bại",
        text: "Tài khoản của bạn đã bị khóa và không thể đăng câu hỏi. Vui lòng liên hệ quản trị viên.",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#7367F0",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
      this.router.navigateByUrl("/");
      return;
    }

    this.articleForm.patchValue({ tags: this.tags });

    // post the changes
    this.articlesService.save(this.articleForm.value, this.type).subscribe(
      (article) => {
        this.router.navigateByUrl("/article/" + article.id);
      },
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  search(evt) {
    const searchText = evt.target.value;

    if (/\S/.test(searchText)) this.subject.next(searchText);
    else this.tagExist = [];
  }

  displayFn(value?: any) {
    return value ? value.name : undefined;
  }
}
