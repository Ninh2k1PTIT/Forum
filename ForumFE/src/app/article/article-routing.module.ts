import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleResolver } from './article-resolver.service';

const routes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
    resolve: {
      data: ArticleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}
