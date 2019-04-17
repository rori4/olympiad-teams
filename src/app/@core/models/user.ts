export interface User {
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
  olympiad: string;
  position: number;
}

export interface Subject {
  name: string;
  currentInstructor: User;
  previousInstructors: Array<User>;
}
