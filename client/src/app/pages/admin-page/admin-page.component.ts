import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/shared/portfolio.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private service : PortfolioService) { }

  ngOnInit() {
  }

}
