import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { RandomizerComponent } from './components/randomizer/randomizer.component';
import { NewStudentComponent } from './components/new-student/new-student.component';
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [

{path: 'home', component: HomeComponent},
{path: 'detail/:id', component: DetailComponent},
{path: 'randomize', component: RandomizerComponent},
{path: 'login', component: LoginComponent},
{path: 'addStudent', component: NewStudentComponent, canActivate:[authGuard]},
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: '**', loadComponent: () => import("./components/not-found/not-found.component")
                                        .then(ts => ts.NotFoundComponent)}   





];
