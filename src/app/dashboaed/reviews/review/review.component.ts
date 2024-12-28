import { ReviewsService } from 'src/app/services/Reviews.service';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  DataLevel: any;
  index = 0;
  size = 20;
  constructor(public dialog: MatDialog, private service: ReviewsService, private http: HttpClient, private paginatorIntl: MatPaginatorIntl) {
    // Override the range label function to use Arabic
    this.paginatorIntl.itemsPerPageLabel = 'عناصر لكل صفحة';
    this.paginatorIntl.nextPageLabel = 'الصفحة التالية';
    this.paginatorIntl.previousPageLabel = 'الصفحة السابقة';
    // this.paginatorIntl.getRangeLabel = arabicRangeLabel;
  }
  ngOnInit(): void {
    this.GetData();
  }
  GetData() {
    this.service.getallreview(this.index, this.size).subscribe((ele: any) => {
      this.DataLevel = ele;
      this.dataSource = ele.items;
    })
  };
  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData()
    });
  }
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['studentName', 'description', 'isAppear'];
  appear(item: any) {
    console.log(item)
    const appears =
    {
      "id": item.id,
      "isAppear": true
    }
    this.service.putreviwe(item.id, appears).subscribe({
      next: (ele) => {
        console.log(ele)
        this.GetData()
      }, error: (err) => {
        console.log(err)
        if (err.status >= 200 || err.sstaus <= 299)
          this.GetData()
      }
    })
  }
  deletefun(item: any) {
    console.log(item)

    this.service.deletereview(item.id).subscribe({
      next: (ele) => {
        this.GetData()

      }, error: (err) => {
        console.log(err)
        if (err.status >= 200 || err.sstaus <= 299)
          this.GetData()

      }
    })
  }

  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.index = pageIndex;
    this.size = pageSize;
    this.service.getallreview(pageIndex, pageSize).subscribe((ele: any) => {
      this.dataSource = ele.items;
    })
  }


  //  this.loadData(); // Load data for the new page based on the updated pageIndex and pageSize.
}
