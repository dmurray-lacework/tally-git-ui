import { Component, Input, OnInit } from '@angular/core';
import { Commit } from '@app/models/commit';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {
  @Input() commits!: Commit[];
  @Input('release') release!: string;
  @Input('releaseDate') releaseDate!: string;
  @Input('releaseLink') releaseLink!: string;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
