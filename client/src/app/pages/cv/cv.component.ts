import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/shared/portfolio.service';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CVComponent implements OnInit {

  constructor(private service : PortfolioService) { }

  ngOnInit() {
  }


  onSaveClicked(){ 
    html2canvas(document.querySelector("#capture"),{
      backgroundColor: null
    }).then(canvas => {
      // Convert the canvas to blob

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      pdf.addImage(contentDataURL, 'PNG', 0, -55, 211, 298)  
      pdf.save('MYPdf.pdf'); // Generated PDF  
    });
  }


  
}
