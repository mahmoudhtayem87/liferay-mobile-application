import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthenticationGuard} from "./authentication.guard";
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'topicList/:structureId',
    loadChildren: () => import('./structure/list/list.module').then( m => m.ListPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'details/:articleId',
    loadChildren: () => import('./structure/details/details.module').then( m => m.DetailsPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'sites',
    loadChildren: () => import('./sites/sites.module').then( m => m.SitesPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'structures',
    loadChildren: () => import('./structure/structures/structures.module').then( m => m.StructuresPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'documents/root',
    loadChildren: () => import('./documents/root/root.module').then( m => m.RootPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'documents/subfolder/:folderId',
    loadChildren: () => import('./documents/subfolder/subfolder.module').then( m => m.SubfolderPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'documents/details/:fileId',
    loadChildren: () => import('./documents/details/details.module').then( m => m.DetailsPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'forms/list',
    loadChildren: () => import('./forms/list/list.module').then( m => m.ListPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'forms/submit/:formId',
    loadChildren: () => import('./forms/submit/submit.module').then( m => m.SubmitPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'commerce',
    loadChildren: () => import('./commerce/commerce.module').then( m => m.CommerceModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'router',
    loadChildren: () => import('./router/router.module').then( m => m.RouterPageModule),
    canActivate:[AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
