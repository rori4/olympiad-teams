import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { StudentsService } from './../../@core/services/students.service';

@Component({
  selector: 'ngx-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent implements OnInit {
  settings = {
    hideSubHeader: true,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private service: StudentsService) {
    this.service.getStudents().subscribe(data => {
      console.log(data);
      this.source.load(data['users']);
    });
  }

  ngOnInit() {}
}
