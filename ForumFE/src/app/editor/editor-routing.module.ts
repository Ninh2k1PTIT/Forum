import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditorComponent } from "./editor.component";
import { EditableArticleResolver } from "./editable-article-resolver.service";
import { AuthGuard } from "../core";

const routes: Routes = [
  {
    path: "",
    component: EditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ":id",
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: EditableArticleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
