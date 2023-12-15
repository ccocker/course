import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { EntityDetailsComponent } from './components/entity-details/entity-details.component';
import { EntityComponent } from './entity.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EntityComponent },
  { path: 'details/:id', component: EntityDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntityRoutingModule {}
