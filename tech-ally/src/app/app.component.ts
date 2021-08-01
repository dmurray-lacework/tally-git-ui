import { Component } from '@angular/core';
import { IssueDto } from './dtos/issue.dto';
import { Issue } from './models/issue';
import { Project } from './models/project';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'tech-ally';
  issueCount:number = 0
  issues: Issue[] = [];
  projectResponse!: Project;

  constructor(private projectService: ProjectService) { }

  async ngOnInit(){
    await this.fetchIssues()
   }

   async fetchIssues() {
    this.projectResponse = await this.projectService.fetchAllIssues();
    let issueDto: IssueDto[] = JSON.parse(this.projectResponse.Data)
    this.issues = Issue.fromDtoList(issueDto)
    this.issueCount = this.issues.length
  }
}
