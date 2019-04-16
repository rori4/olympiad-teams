import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './../../../@core/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {}
  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      // tslint:disable-next-line: max-line-length
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      school: ['', Validators.nullValidator],
      educationPeriod: ['', Validators.nullValidator],
      university: ['', Validators.nullValidator],
      work: ['', Validators.nullValidator],
      // tslint:disable-next-line: max-line-length
      facebook: ['', [Validators.nullValidator, Validators.pattern(/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i)]],
      linkedin: ['', [Validators.nullValidator, Validators.pattern(/http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/gm)]],
      // tslint:disable-next-line: max-line-length
      phone: ['', [Validators.pattern, Validators.pattern(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm)]],
      country: ['', Validators.nullValidator],
      town: ['', Validators.nullValidator],
      address: ['', Validators.nullValidator],
    });
  }

  addStudent() {
    console.log(this.form);
    if (this.form.valid) {
      this.adminService.addStudent(this.form.value).subscribe(data => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
