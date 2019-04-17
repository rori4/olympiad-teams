import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './../../../@core/services/admin.service';
import { Router } from '@angular/router';
import { SubjectsService } from '../../../@core/services/subjects.service';
import { Observable, Subscription } from 'rxjs';
import { ServerResponse } from '../../../@core/models/server-response';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subjectsSub: Subscription;
  subjects: Array<any>;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private subjectService: SubjectsService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.subjectsSub = this.subjectService.getSubjects().subscribe(result => {
      this.subjects = result.data;
    });
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            // tslint:disable-next-line: max-line-length
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ),
        ],
      ],
      roles: ['', Validators.required],
      subjects: ['', Validators.required],
      school: ['', Validators.nullValidator],
      educationPeriod: ['', Validators.nullValidator],
      university: ['', Validators.nullValidator],
      work: ['', Validators.nullValidator],
      facebook: [
        '',
        [
          Validators.nullValidator,
          Validators.pattern(
            // tslint:disable-next-line: max-line-length
            /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i,
          ),
        ],
      ],
      linkedin: [
        '',
        [Validators.nullValidator, Validators.pattern(/http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/gm)],
      ],
      // tslint:disable-next-line: max-line-length
      phone: [
        '',
        [
          Validators.pattern,
          Validators.pattern(
            /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
          ),
        ],
      ],
      country: ['', Validators.nullValidator],
      town: ['', Validators.nullValidator],
      address: ['', Validators.nullValidator],
      info: ['', Validators.nullValidator],
    });
  }

  addUser() {
    console.log(this.form);
    if (this.form.valid) {
      this.adminService.addUser(this.form.value).subscribe(data => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
    this.subjectsSub.unsubscribe();
  }
}
