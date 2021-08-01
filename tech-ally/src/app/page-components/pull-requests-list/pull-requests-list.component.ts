import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { PullRequestDto } from '@app/dtos/pull-request.dto';
import { Project } from '@app/models/project';
import { PullRequest } from '@app/models/pull-request';
import { ProjectService } from '@app/services/project.service';

export interface PullRequestElement {
  id: string;
  created: string;
  name: string;
  repo: string;
  user: string;
  updated: string;
  url: string;
}

 @Component({
  selector: 'app-pull-requests-list',
  templateUrl: './pull-requests-list.component.html',
  styleUrls: ['./pull-requests-list.component.scss']
})
export class PullRequestsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['created','repo','name', 'user', 'updated','url'];
  projectResponse!: Project;
  prList: PullRequest[] = [];
  dataSource = new MatTableDataSource<PullRequest>();

  @ViewChild(MatSort)
   sort!: MatSort;

  constructor(private projectService: ProjectService){}

  async ngOnInit(){
    await this.fetchPullRequests();
    this.dataSource.data = this.prList;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async fetchPullRequests() {
    this.projectResponse = await this.projectService.fetchAllPRs();
    let prDto: PullRequestDto[] = JSON.parse(this.projectResponse.Data);
    this.prList = PullRequest.fromDtoList(prDto);
  }
}
