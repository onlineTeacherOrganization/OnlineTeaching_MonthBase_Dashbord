export interface IUser {
  FullName: string;
  Email: string;
  MobilleNumber: string[];
  Address: {
    City: string;
    PostalCode: string;
    Street: string;
  };
  Password: string;
  ConfirmPassword: string;
}
// export interface IStudent {
//   "name": string,
//   "phoneNumber": string,
//   "parentPhone": string,
//   "levelID": number,
//   "email": string,
//   "password": string,
//   "confirmPassword": string,
//   "schoolName": string,
//   "city": string
// }
export interface IStudentSubscriptions {
  activationDate: string;
  isActive: boolean;
  levelID: number;
  phone: string;
  studentID: number;
  studentName: string;
  subjectID: number;
  subjectName: string;
  subscribtionDate: string;
}
export interface IStudent {
  city: string;
  email: string;
  id: number;
  image: string;
  level: {
    id: number;
    levelName: string;
    telegeramLink: string;
  };
  levelID: number;
  levelName: string;
  name: string;
  parentPhone: string;
  phone: string;
  schoolName: string;
}
