import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { User, UserService, Profile } from "../core";
import { concatMap, tap } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  profile: Profile;
  currentUser: User;
  isUser: boolean;
  isAdmin: boolean = false;

  ngOnInit() {
    if (
      JSON.parse(localStorage.getItem("user"))?.roles?.includes("ROLE_ADMIN")
    ) {
      this.isAdmin = true;
    }
    this.route.data
      .pipe(
        concatMap((data: { profile: Profile }) => {
          this.profile = data.profile;
          console.log(this.profile);

          // Load the current user's data.
          return this.userService.currentUser.pipe(
            tap((userData: User) => {
              this.currentUser = userData;
              this.isUser = this.currentUser.username === this.profile.username;
            })
          );
        })
      )
      .subscribe();
  }

  setStatus() {
    if (this.profile.active) {
      Swal.fire({
        title: `Vô hiệu hóa tài khoản ${this.profile.username}`,
        text: `Tài khoản này sẽ không thể đăng câu hỏi, trả lời hay đánh giá.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7367F0",
        cancelButtonColor: "#E42728",
        confirmButtonText: "Đúng",
        cancelButtonText: "Hủy",
        preConfirm: () => {
          this.profile.active = false;
          this.userService.update(this.profile.id, this.profile).subscribe();
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
            text: "Tài khoản đã bị vô hiệu hóa",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      });
    } else {
      Swal.fire({
        title: `Kích hoạt tài khoản ${this.profile.username}`,
        text: `Tài khoản này có thể đăng câu hỏi, trả lời hay đánh giá.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#7367F0",
        cancelButtonColor: "#E42728",
        confirmButtonText: "Đúng",
        cancelButtonText: "Hủy",
        preConfirm: () => {
          this.profile.active = true;
          this.userService.update(this.profile.id, this.profile).subscribe();
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
            text: "Tài khoản này đã được kích hoạt",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      });
    }
  }
}
