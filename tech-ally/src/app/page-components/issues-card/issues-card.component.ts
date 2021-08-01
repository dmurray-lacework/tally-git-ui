import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueDto } from '@app/dtos/issue.dto';
import { Issue } from '@app/models/issue';
import { Project } from '@app/models/project';
import { ProjectService } from '@app/services/project.service';

@Component({
  selector: 'app-issues-card',
  templateUrl: './issues-card.component.html',
  styleUrls: ['./issues-card.component.scss']
})
export class IssuesCardComponent implements OnInit {
  issues: Issue[] = [];
  projectResponse!: Project;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.fetchIssues()
  }

  async fetchIssues() {
    this.projectResponse = await this.projectService.fetchAllIssues();
    let projectDto: IssueDto[] = JSON.parse(this.projectResponse.Data)
    this.issues = Issue.fromDtoList(projectDto)
  }

  openRepoLink(url: string) {
      window.open(url, "_blank");
  }
}
