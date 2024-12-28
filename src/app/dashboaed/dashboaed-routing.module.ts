import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ReopenLectureComponent } from './reopen-lecture/Re_open/reopen-lecture.component';
import { RescheduleExamsComponent } from './reschedule-exams/reschedule-exams.component';
import { StudentsComponent } from './students/students.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SettingsComponent } from './settings/settings.component';
import { SubjectsComponent } from './subjects/subjects/subjects.component';
import { SubsubjectComponent } from './subsubjects/subsubject/subsubject.component';
import { LevelComponent } from './levels/level/level.component';
import { ReviewComponent } from './reviews/review/review.component';
import { ExamComponent } from './exams/exam/exam.component';
import { LectureComponent } from './lectures/lecture/lecture.component';
import { LateStudentComponent } from './LateStudent/LateStudent/LateStudent.component';
import { QuestionComponent } from './Questions/Question/Question.component';
import { ShapsComponent } from './charts/shaps/shaps.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { QuzitestComponent } from './quzi-test/quzitest.component';
import { LockUserComponent } from './LockStudent/LockUser/LockUser.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./charts/charts.module').then((m) => m.ChartsModule), component: ShapsComponent
  },
  {
    path: 'exams',
    loadChildren: () =>
      import('./exams/exams.module').then((m) => m.ExamsModule), component: ExamComponent
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule), component: HomePageComponent
  },
  {
    path: 'lectures',
    loadChildren: () =>
      import('./lectures/lectures.module').then((m) => m.LecturesModule), component: LectureComponent
  },
  {
    path: 'levels',
    loadChildren: () =>
      import('./levels/module/level.module').then((m) => m.LevelModule), component: LevelComponent
  },
  {
    path: 'reopenLecture',
    loadChildren: () =>
      import('./reopen-lecture/repen-lecture.module').then((m) => m.RopenLectureModule), component: ReopenLectureComponent
  },
  {
    path: 'rescheduleExams',
    loadChildren: () =>
      import('./reschedule-exams/rescheduleexams.module').then((m) => m.RescheduleexamsModule), component: RescheduleExamsComponent
  },
  {
    path: 'reviews',
    loadChildren: () =>
      import('./reviews/module/reviews.module').then((m) => m.ReviewsModule), component: ReviewComponent
  },

  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule), component: StudentsComponent
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./subscriptions/subscriptions.module').then((m) => m.SubscriptionsModule), component: SubscriptionsComponent
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule), component: SettingsComponent
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subjects/module/subjects.module').then((m) => m.SubjectsModule), component: SubjectsComponent
  },
  {
    path: 'subsubjects',
    loadChildren: () =>
      import('./subsubjects/module/subsubjects.module').then((m) => m.SubsubjectsModule), component: SubsubjectComponent
  }
  , {
    path: 'latestudent',
    loadChildren: () =>
      import('./LateStudent/LateStudent.module').then((m) => m.LateStudentModule), component: LateStudentComponent
  },
  {
    path: 'exams/questions/:id',
    loadChildren: () =>
      import('./Questions/Questions.module').then((m) => m.QuestionsModule), component: QuestionComponent
  },
  {
    path: 'assignment',
    loadChildren: () =>
      import('./assignment/assignment.module').then((m) => m.AssignmentModule), component: AssignmentComponent

  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./quzi-test/quzi-test.module').then((m) => m.QuziTestModule), component: QuzitestComponent
  },
  {
    path: 'lock',
    loadChildren: () =>
      import('./LockStudent/LockStudent.module').then((m) => m.LockStudentModule), component: LockUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboaedRoutingModule { }
