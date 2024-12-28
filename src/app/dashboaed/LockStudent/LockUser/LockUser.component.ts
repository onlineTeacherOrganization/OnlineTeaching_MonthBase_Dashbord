import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LockStudentService } from 'src/app/services/lock.service';
import { UnLockStudentForSubSubjectComponent } from '../UnLockStudentForSubSubject/UnLockStudentForSubSubject.component';

@Component({
  selector: 'app-LockUser',
  templateUrl: './LockUser.component.html',
  styleUrls: ['./LockUser.component.scss']
})
export class LockUserComponent implements OnInit {
  DataLevel: any;
  searchQuery!: string;
  constructor(public dialog: MatDialog, private service: LockStudentService) {
  }
  ngOnInit(): void {
    this.GetData()
  }
  GetData() {
    this.service.GetLockStudent().subscribe((ele: any) => {
      this.DataLevel = ele;
      this.dataSource = ele;
    })
  }
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['studentName', 'subjectName', 'reason', 'lockedCount', 'edit'];
  /*
  isGeneral
  lockedCount
  studentName
  studnetID
  subSubjectID
  subjectName
  */
  search() {
    this.service.SearchStudent(this.searchQuery).subscribe((ele: any) => {
      this.dataSource = ele;
      console.log(ele)
    });
  }
  clear() {
    this.searchQuery = '';
    this.GetData();
  }
  Empty() {
    if (this.searchQuery == '') {
      this.GetData()
    }
  }
  openDialog(level: any): void {
    console.log(level)
    const dialogRef = this.dialog.open(UnLockStudentForSubSubjectComponent, {
      data: level,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetData()

    });
  }
}
