import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from './../../../@core/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectsService } from '../../../@core/services/subjects.service';
import { Subscription } from 'rxjs';
import { User } from '../../../@core/models/user';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  id: string;
  form: FormGroup;
  subjectsSub: Subscription;
  subjects: Array<any>;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private subjectService: SubjectsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.subjectsSub = this.subjectService.getSubjects().subscribe(result => {
      this.subjects = result.data;
    });
    this.initiateFromValidators();
    this.fillFormEditUser();
  }

  private initiateFromValidators() {
    this.form = this.fb.group({
      _id: ['', Validators.nullValidator],
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

  private fillFormEditUser() {
    if (this.id) {
      this.adminService.getUser(this.id).subscribe(res => {
        const user: User = res.data;
        const educationPeriodFormated = {
          start: res.data.educationFrom,
          end: res.data.educationTo,
        };
        const subjectFormated = user.subjects.map(a => a._id);
        this.form.setValue({
          _id: res.data._id,
          fullName: user.fullName,
          email: user.email,
          roles: user.roles,
          subjects: subjectFormated,
          school: user.school,
          educationPeriod: educationPeriodFormated,
          university: user.university,
          work: user.work,
          facebook: user.facebook,
          linkedin: user.linkedin,
          phone: user.phone,
          country: user.country,
          town: user.town,
          address: user.address,
          info: user.info,
        });
        console.log(this.form);
      });
    }
  }

  addUser() {
    console.log(this.form);
    if (this.form.valid) {
      this.adminService.addUser(this.form.value).subscribe(data => {
        this.router.navigate(['/students/all']);
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  get currentSubjects() {
    const subjIds = this.form.value.subjects;
    let userSubjs: string = '';
    if (subjIds.length > 0) {
      subjIds.forEach(id => {
        this.subjects.forEach(subj => {
          if (subj._id === id) {
            userSubjs += subj.name + ' ';
          }
        });
      });
    }
    return userSubjs;
  }

  addPhoto(e) {
    e.preventDefault();
    console.log('Adding photo');
  }

  ngOnDestroy(): void {
    this.subjectsSub.unsubscribe();
  }
}
