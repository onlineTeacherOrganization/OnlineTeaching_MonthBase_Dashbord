import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-shaps',
  templateUrl: './shaps.component.html',
  styleUrls: ['./shaps.component.scss']
})
export class ShapsComponent implements AfterViewInit, OnInit {
  @ViewChild('myChartCanvas') myChartCanvas!: ElementRef;
  @ViewChild('myChartCanvas2') myChartCanvas2!: ElementRef;
  chart: any;
  constructor(private service: HomeService) { }
  Exams!: any;
  Lectures!: any;
  Subjects!: any;
  SubSubjects!: any;
  AllSubscribtion!: any;
  ReopenLectures!: any;
  NoComfirmSubscribtion!: any;
  Student!: any
  ReExams!: any
  ngOnInit(): void {
    this.SetUp()
    this.service.GetStudent().subscribe((ele: any) => { this.Student = ele })
    this.service.GetReExams().subscribe((ele: any) => { this.ReExams = ele })
    this.service.GetSubjects().subscribe(Subject => {
      this.service.GetLectures().subscribe(Lecture => {
        this.service.GetReopenLectures().subscribe(ReopenLecture => {
          this.service.GetSubSubjects().subscribe(SubSubject => {
            this.SubSubjects = SubSubject;
            this.Subjects = Subject;
            this.Lectures = Lecture
            this.ReopenLectures = ReopenLecture
            this.BarChart(this.Lectures?.count, this.ReopenLectures?.count, this.Subjects?.count, this.SubSubjects?.count)
          });
        });
      });
    });
  }
  SetUp() {
    this.service.GetExams().subscribe(ele => {
      this.Exams = ele
    });

    this.service.GetSubSubjects().subscribe(ele => {
      this.SubSubjects = ele;
      this.BarChart(this.Lectures, this.ReopenLectures, this.Subjects, this.SubSubjects)
    });
    this.service.GetNoComfirmSubscribtion().subscribe((ele: any) => {
      this.NoComfirmSubscribtion = ele

      this.service.GetAllSubscribtion().subscribe(elest => {
        this.AllSubscribtion = elest;
        this.pieChart(((ele?.length)), ((this.AllSubscribtion?.count - ele?.length)))
        // this.BarChart(((ele?.length) ), ((this.AllSubscribtion?.count - ele?.length) ))
      });
    });
  }
  pieChart(value: any, value2: any): void {
    const ctx = this.myChartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'pie', // Choose the chart type (e.g., bar, line, pie, etc.)
      data: {
        labels: ['غير تاكيد مشترك', 'مشترك'], // Your data labels
        datasets: [{
          label: 'عدد الطلاب المشتركين', // Legend label
          data: [value, value2],
          backgroundColor: ['red', 'green']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  chart1: Chart | null = null;
  BarChart(Lectures: any, ReOpenLectures: any, Subjects: any, SubSubjects: any): void {
    if (this.chart1) {
      this.chart1.destroy();
    }
    const ctx = this.myChartCanvas2.nativeElement.getContext('2d');
    this.chart1 = new Chart(ctx, {
      type: 'bar', // Choose the chart type (e.g., bar, line, pie, etc.)
      data: {
        labels: ['المحاضرات', 'فتح المحاضرات', 'الشهور', 'الاسابيع'], // Your data labels
        datasets: [{
          label: 'عدد الطلاب المشتركين', // Legend label
          data: [Lectures, ReOpenLectures, Subjects, SubSubjects],
          backgroundColor: ['blue', 'blue', 'blue', 'blue']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  ngAfterViewInit(): void {
  }

}