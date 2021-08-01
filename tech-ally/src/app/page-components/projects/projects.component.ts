import { Component, OnInit } from '@angular/core';
import { RepoDto } from '@app/dtos/repo.dto';
import { Repo } from '@app/models/repo';
import { Project } from '@app/models/project';
import { ProjectService } from '@app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  panelOpenState = false;
  projectResponse!: Project;
  projectList: Repo[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.fetchProjects();
  }

  async fetchProjects() {
    this.projectResponse = await this.projectService.fetchProjects();
    let projectDto: RepoDto[] = JSON.parse(this.projectResponse.Data)
    this.projectList = Repo.fromDtoList(projectDto)
    this.setIconLink(this.projectList)
  }

   setIconLink(repos: Repo[]) {
    for (var repo of repos) {
      if (repo.language == "HCL" || repo.name.includes("terraform")) {
        repo.iconLink = "../../../assets/images/tf-logo.png"
      } else if (repo.language == "Go") {
        repo.iconLink = "../../../assets/images/gopher-thinking.png"
      } else if (repo.language == "Ruby") {
        repo.iconLink = "../../../assets/images/ruby-icon-min.png"
      } else {
      repo.iconLink = "../../../assets/images/terminal-shell.png"
    }
  }
}
}
