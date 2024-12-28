import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubscrpitionsService } from 'src/app/services/Subscrpitions.service';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { SelectionModel } from '@angular/cdk/collections';
import { LockComponent } from './lock/lock.component';
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  studentName!: string;
  phone!: string;
  searchResults!: string;
  Subjects!: any;
  Datasubject: any;
  examples = "one";
  SubjectID!: any;
  index = 0;
  size = 20;
  SelectAll: boolean = true;
  ActiveSubscribtion: boolean = true;
  constructor(public dialog: MatDialog, private service: SubscrpitionsService, private paginatorIntl: MatPaginatorIntl) {
    // Override the range label function to use Arabic
    this.paginatorIntl.itemsPerPageLabel = 'عناصر لكل صفحة';
    this.paginatorIntl.nextPageLabel = 'الصفحة التالية';
    this.paginatorIntl.previousPageLabel = 'الصفحة السابقة';
    // this.paginatorIntl.getRangeLabel = arabicRangeLabel;
  }
  ngOnInit(): void {
    this.service.GetAllSubjects().subscribe((ele: any) => {
      console.log(ele)
      this.service.GetAllSubjects(ele.count).subscribe((ele2: any) => {
        this.Subjects = ele2.items
      })
    })
    this.GetActiveSubscribtion()
  }
  GetActiveSubscribtion() {
    this.service.GetActiveSubscribtion(this.index, this.size).subscribe((ele: any) => {
      this.Datasubject = ele;
      console.log(ele.count)
      this.dataSource = ele.items;
    })
  }
  GetNotConfirmedSubscribtion() {
    this.service.GetNotConfirmedSubscribtion().subscribe((ele: any) => {
      this.dataSource = ele;
      console.log(ele.length)
    })
  }
  search() {
    console.log(this.studentName)
    this.service.SearchSubscrpitions(this.studentName, this.phone).subscribe({
      next: (ele: any) => {
        console.log(ele)
        this.dataSource = ele.items;
      },
      error: (ele) => { console.log(ele) }
    })
  }
  UpdateElement(Object: any) {
    console.log(Object)
    const dialogRef = this.dialog.open(EditComponent, {
      data: [Object],
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetActiveSubscribtion();
      this.selection.clear()

    });
  }
  DeleteElement(Object: any) {
    console.log(Object)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: [Object]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetActiveSubscribtion()
      this.selection.clear()

    });
  }
  LockElement(Object: any) {
    console.log(Object)
    const dialogRef = this.dialog.open(LockComponent, {
      data: [Object]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetActiveSubscribtion()
      this.selection.clear()

    });
  }
  Lock() {
    console.log(this.selection.selected)
    const dialogRef = this.dialog.open(LockComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetActiveSubscribtion()
      this.selection.clear()
    });
  }
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['select', 'studentName', 'subjectName', 'phone', 'subscribtionDate', 'activationDate', 'edit'];
  clear() {
    this.studentName = '';
    this.phone = '';
    this.ActiveSubscribtion ? this.GetActiveSubscribtion() : this.GetNotConfirmedSubscribtion()
  }

  change() {
    console.log(this.examples)
    if (this.examples === 'one') {
      this.GetActiveSubscribtion()
    } else if (this.examples === 'two') {
      this.GetNotConfirmedSubscribtion();
    }
  }

  /*
   delete(Object: any) {
     console.log(Object)
     const dialogRef = this.dialog.open(DeleteComponent, {
       data: Object
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.GetActiveSubscribtion()
     });
   } */
  delete() {
    console.log(this.selection.selected)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetActiveSubscribtion()
      this.selection.clear()

    });
  }
  /* Update(Object: any) {
     const data = [
       {
         "studentID": Object.studentID,
         "subjectID": Object.subjectID,
         "isActive": true
       }
     ]
     this.service.PutSubscribtion(data).subscribe(ele => console.log(ele))
     console.log(Object)
     const dialogRef = this.dialog.open(EditComponent, {
       data: Object,
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.GetActiveSubscribtion();
     });
  } */
  Update() {
    console.log(this.selection.selected)
    const dialogRef = this.dialog.open(EditComponent, {
      data: this.selection.selected,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetActiveSubscribtion();
      this.selection.clear()

    });
  }
  pageChanged(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.index = pageIndex;
    this.size = pageSize;
    if (this.searchResults) {
      this.service.SearchSubscrpitions(this.studentName, this.phone, pageIndex, pageSize).subscribe((ele: any) => {
        this.dataSource = ele.items;
      },
        (ele) => {
          console.log(ele)
        }
      )
    }
    this.service.GetActiveSubscribtion(pageIndex, pageSize).subscribe((ele: any) => {
      this.dataSource = ele.items;
    })
  }
  selection = new SelectionModel<any>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.Datasubject.items.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.Datasubject.items.forEach((row: any) => this.selection.select(row));
    console.log(this.selection.selected)
  }
  // masterToggle() {
  //   this.SelectAll = !this.SelectAll;
  //   if (this.SelectAll) {
  //     this.Datasubject.items.forEach((row: any) => {
  //       // row.isActive = true;
  //       this.selection.select(row)
  //       console.log(this.selection.select(row), row)
  //     });
  //     console.log(this.selection.selected)
  //     this.dataSource = this.Datasubject.items;
  //   }
  //   else {
  //     this.selection.clear()
  //     this.Datasubject.items.forEach((row: any) => {
  //       row.isActive = false;
  //     });
  //     this.dataSource = this.Datasubject.items;
  //   }
  //   if (this.isAllSelected()) {
  //     this.selection.clear()
  //     this.Datasubject.items.forEach((row: any) => {
  //       row.isActive = false;
  //     });
  //     this.dataSource = this.Datasubject.items;
  //   }
  //   else {
  //     this.Datasubject.items.forEach((row: any) => {
  //       row.isActive = true;
  //       this.selection.select(row)
  //     });
  //     this.dataSource = this.Datasubject.items;
  //   }
  // }
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.Datasubject.items.length;
  //   return numSelected === numRows;
  // }
  Empty() {
    console.log(this.studentName)
    if ((this.studentName == '' && !this.phone) || (!this.studentName && this.phone == '')) {
      this.GetActiveSubscribtion()
    }
  }

  Download() {
    console.log(this.SubjectID);
    this.service.DownloadSubscriptiontData(this.SubjectID).subscribe((data: Blob) => {
      const excelBlob: Blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(excelBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Subscribtion.xlsx'; // Provide the desired filename here
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}




