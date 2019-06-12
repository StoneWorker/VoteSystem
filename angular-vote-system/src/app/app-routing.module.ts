import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { Component } from '@angular/core/src/metadata/directives';
import { VoteComponent } from './vote/vote.component';
import { VoteService} from './vote.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { VoteResultComponent } from './vote-result/vote-result.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'vote', component: VoteComponent, canActivate:[VoteService] },
  { path: 'voteresult', component: VoteResultComponent, canActivate:[VoteService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/vote', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
