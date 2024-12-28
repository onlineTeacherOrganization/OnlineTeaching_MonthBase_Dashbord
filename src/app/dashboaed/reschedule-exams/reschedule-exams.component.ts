import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExamsService } from 'src/app/services/Exams.service';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-reschedule-exams',
  templateUrl: './reschedule-exams.component.html',
  styleUrls: ['./reschedule-exams.component.scss']
})
export class RescheduleExamsComponent {
  searchQuery!: string;
  searchResults!: string;
  Datasubject: any;

  constructor(public dialog: MatDialog, private service: ExamsService) {
  }
  ngOnInit(): void {
    this.GetData();
  }
  GetData() {
    this.service.GetAcceptReopenExam().subscribe((ele: any) => {
      this.Datasubject = ele;
      this.dataSource = ele.items;
      console.log(ele)
    })
  }

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['studentName', 'objectName', 'reasone', 'edit'];

  openDialog(level: any): void {
    const dialogRef = this.dialog.open(AddComponent, {
      data: level,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetData();
    });
  }
}
