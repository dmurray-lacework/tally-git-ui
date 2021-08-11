import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '@app/models/project';
import { environment } from '@environments/environment';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  async fetchProjects(): Promise<Project> {
    if (!this.localStorageService.isEmpty('repositories')) {
      return this.localStorageService.get('repositories')
    }
    let res = await this.http.get<Project>(`${environment.tallyserver}/github.Repositories`).toPromise();
    this.localStorageService.set('repositories', res)
    return res
  }

  async fetchAllIssues(): Promise<Project> {
    if (!this.localStorageService.isEmpty('issues')) {
      return this.localStorageService.get('issues')
    }
    let res = await this.http.get<Project>(`${environment.tallyserver}/github.Issues`).toPromise();
    this.localStorageService.set('issues', res)
    return res
  }

  async fetchAllPRs(): Promise<Project> {
    if (!this.localStorageService.isEmpty('pullRequests')) {
      return this.localStorageService.get('pullRequests')
    }
    let res = await this.http.get<Project>(`${environment.tallyserver}/github.PullRequests`).toPromise();
    this.localStorageService.set('pullRequests', res)
    return res
  }
}