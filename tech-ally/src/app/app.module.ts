import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/modules/material.module';
import { ProjectsComponent } from '@app/page-components/projects/projects.component';
import { IssuesCardComponent } from './page-components/issues-card/issues-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './http-interceptor/loader/loader.component';
import { LoaderService } from '@app/services/loader.service';
import { LoaderInterceptor } from '@app/http-interceptor/load.interceptor';
import { IssuesListComponent } from './page-components/issues-list/issues-list.component';
import { PullRequestsListComponent } from './page-components/pull-requests-list/pull-requests-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    IssuesCardComponent,
    LoaderComponent,
    IssuesListComponent,
    PullRequestsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
