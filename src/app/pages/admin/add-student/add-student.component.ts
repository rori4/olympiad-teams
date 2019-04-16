import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    this.form = this.fb.group({
      file: ['', Validators.required],
    });

  }

  register() {
    if (this.form.valid) {
    }
  }

  get f() {
    return this.form.controls;
  }
}
