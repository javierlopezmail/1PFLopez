import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { AlumnosABMComponent } from './components/alumnos-abm/alumnos-abm.component';

const routes: Routes = [
  { path: 'listado-alumnos', component: AlumnosListComponent },
  { path: 'alta-alumno', component: AlumnosABMComponent, data: { mode: 'create' } },
  { path: 'modificacion-alumno', component: AlumnosABMComponent, data: { mode: 'edit' } },
  { path: 'baja-alumno', component: AlumnosABMComponent, data: { mode: 'delete' } },
  { path: '', redirectTo: '/listado-alumnos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }