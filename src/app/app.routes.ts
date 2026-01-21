import { Details } from './components/details/details';
import { MainPage } from './components/main-page/main-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', component: MainPage },
    { path: 'details', component: Details },
];
