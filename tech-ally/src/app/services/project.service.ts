import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '@app/models/project';
import { environment } from '@environments/environment';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  async fetchProjects(): Promise<Project> {
    return await this.http.get<Project>(`${environment.tallyserver}/github.Repositories`).toPromise();
  }

  async fetchAllIssues(): Promise<Project> {
    return await this.http.get<Project>(`${environment.tallyserver}/github.Issues`).toPromise();
  }

  async fetchAllPRs(): Promise<Project> {
    return await this.http.get<Project>(`${environment.tallyserver}/github.PullRequests`).toPromise();
  }
}