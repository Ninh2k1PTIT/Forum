import { Component, Input } from "@angular/core";

@Component({
  selector: "app-list-errors",
  templateUrl: "./list-errors.component.html",
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];
  error = null;

  @Input()
  set errors(errorList: any) {
    this.error = errorList;
  }

  get errorList() {
    return this.formattedErrors;
  }
}
