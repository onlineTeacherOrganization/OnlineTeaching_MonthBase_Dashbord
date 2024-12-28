import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubSubjectsService } from 'src/app/services/SubSubjects.service';
import { LockstudentsComponent } from '../lockstudents/lockstudents.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  Student!: any;
  Datasubject!: any;
  Idsubject = this.data.id;
  constructor(public dialog: MatDialog, private service: SubSubjectsService, private paginatorIntl: MatPaginatorIntl,
    public dialogRef: MatDialogRef<StudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    console.log(this.data)
    this.GetData()
  }
  GetData() {
    this.service.GetAllForSubSubject(this.data.id).subscribe((ele: any) => {
      this.Datasubject = ele;
      this.dataSource = ele.items;
      if (this.dataSource.data) {
        console.log(ele)
      }
      else{
        console.log(ele)
      }
    })
  }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['num','name', 'edit'];
  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.service.GetAllForSubSubject(pageIndex, pageSize).subscribe((ele: any) => {
      this.dataSource = ele.items;
      console.log(ele)
    })
    //  this.loadData(); // Load data for the new page based on the updated pageIndex and pageSize.
  }
  openDialog(obj: any) {
    const dialogRef = this.dialog.open(LockstudentsComponent, {
      data: [this.Idsubject, obj]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData();
    });
  }
  Close() {
    this.dialogRef.close();
  }
}
