import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/shared/portfolio.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private service : PortfolioService) { }

  ngOnInit() {
  }

}
