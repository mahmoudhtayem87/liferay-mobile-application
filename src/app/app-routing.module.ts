import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthenticationGuard} from "./authentication.guard";
import {ListPage} from "./dxp/structure/list/list.page";
import {StructuresPage} from "./dxp/structure/structures/structures.page";
import {ArticleDetailsPage} from "./dxp/structure/details/details.page";
import {SitesPage} from "./dxp/sites/sites.page";
import {DashboardPage} from "./dxp/dashboard/dashboard.page";
import {LoginPage} from "./login/login.page";
import {RootPage} from "./dxp/documents/root/root.page";
import {SubfolderPage} from "./dxp/documents/subfolder/subfolder.page";
import {FileDetailsPage} from "./dxp/documents/details/details.page";
import {FormsListPage} from "./dxp/forms/list/list.page";
import {FormsSubmitPage} from "./dxp/forms/submit/submit.page";
import {ProductsRouterPage} from "./router/router.page";
const routes: Routes = [
  {
    path: 'home',
    component:LoginPage
  },
  {
    path: 'dashboard',
    component:DashboardPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'webcontent/topicList/:structureId',
    component:ListPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'webcontent/article/:articleId',
    component:ArticleDetailsPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'webcontent/structures',
    component:StructuresPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'sites',
    component:SitesPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'documents/root',
    component:RootPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'documents/subfolder/:folderId',
    component:SubfolderPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'documents/details/:fileId',
   component:FileDetailsPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'forms/list',
    component:FormsListPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'forms/submit/:formId',
    component:FormsSubmitPage,
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'commerce',
    loadChildren: () => import('./commerce/commerce.module').then( m => m.CommerceModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'router',
    component:ProductsRouterPage,
    canActivate:[AuthenticationGuard]
  },{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
