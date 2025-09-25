import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { StatisticsComponent } from './components/statistics/statistics';
import { TasksComponent } from './components/tasks/tasks';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'tasks', component: TasksComponent },
    { path: '**', redirectTo: '' }
];
