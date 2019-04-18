export interface User {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  createdOn: Date;
  status: string;
  roles: Array<string>;
  school: string;
  facebook: string;
  linkedin: string;
  phone: string;
  address: string;
  town: string;
  country: string;
  university: string;
  educationFrom: Date;
  educationTo: Date;
  work: string;
  info: string;
  subjects: Array<Subject>;
  subjectsList: string;
  results: Array<Result>;
}

export interface Result {
  _id: string;
  olympiad: string;
  position: number;
}

export interface Subject {
  _id: string;
  name: string;
  currentInstructor: User;
  previousInstructors: Array<User>;
}
