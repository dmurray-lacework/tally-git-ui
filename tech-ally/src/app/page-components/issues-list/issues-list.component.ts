import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { IssueDto } from '@app/dtos/issue.dto';
import { Issue } from '@app/models/issue';
import { Project } from '@app/models/project';
import { ProjectService } from '@app/services/project.service';

export interface IssueElement {
  created: string;
  name: string;
  repo: string
  labels: string;
  url: string;
}

 @Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements AfterViewInit {
  displayedColumns: string[] = ['created', 'name', 'repo', 'labels', 'url'];
  projectResponse!: Project;
  issueList: Issue[] = [];
  dataSource = new MatTableDataSource<Issue>();

  @ViewChild(MatSort)
   sort!: MatSort;

   constructor(private projectService: ProjectService) { }

   async ngOnInit(){
    await this.fetchIssues();
    this.dataSource.data = this.issueList;
   }
   
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async fetchIssues() {
    this.projectResponse = await this.projectService.fetchAllIssues();
    let issueDto: IssueDto[] = JSON.parse(this.projectResponse.Data);
    this.issueList = Issue.fromDtoList(issueDto);
  }
}
