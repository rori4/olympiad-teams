import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { StudentsService } from '../../../@core/services/students.service';

@Component({
  selector: 'ngx-students-latest-results',
  templateUrl: './students-latest-results.component.html',
  styleUrls: ['./students-latest-results.component.scss'],
})
export class StudentsLatestResultsComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      fullName: {
        title: 'Name',
        type: 'string',
      },
      position: {
        title: 'Medals',
        type: 'html',
      },
      olympiad: {
        title: 'Olympiad',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getResults().subscribe(res => {
      let modified = this.modifyData(res.data);
      this.source.load(modified);
    });
  }

  modifyData(data: any): any {
    return data.map(el => {
      el.fullName = el.user.fullName;
      switch (el.position) {
        case 1:
          el.position = '<span class="badge badge-warning">Gold Medal <i class="fas fa-medal"></i></span>';
          break;
        case 2:
          el.position = '<span class="badge badge-light">Silver Medal <i class="fas fa-medal"></i></span>';
          break;
        case 3:
          el.position = '<span class="badge badge-dark">Bronze Medal <i class="fas fa-medal"></i></span>';
          break;
        default:
          el.position = `<span class="badge badge-primary">${el.position}th Place</span>`;
          break;
      }
      return el;
    });
  }

  ngOnDestroy(): void {}
}
