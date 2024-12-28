import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LevelsService } from 'src/app/services/Levels.service';
import { AddComponent } from '../add/add.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent {

  DataLevel: any;
  constructor(public dialog: MatDialog, private service: LevelsService) {
  }
  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.service.getalllevel()
    this.service.levels.subscribe((ele: any) => {
      this.DataLevel = ele;
      this.dataSource = ele;
    })
  }
  openDialog(level: any): void {
    console.log(level)
    const dialogRef = this.dialog.open(AddComponent, {
      data: level,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getData()

    });
  }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ['levelName', 'telegeramLink', 'id'];
}
