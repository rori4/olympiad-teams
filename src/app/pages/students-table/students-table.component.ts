import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { StudentsService } from './../../@core/services/students.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent implements OnInit, OnDestroy {
  settings = {
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
      fullName: {
        title: 'Name',
        type: 'html',
      },
      school: {
        title: 'School',
        type: 'string',
      },
      town: {
        title: 'Town',
        type: 'string',
      },
      subjectList: {
        title: 'Subjects',
        type: 'html',
      },
      medalsCount: {
        title: 'Medals',
        type: 'text',
      },
      socialProfiles: {
        title: 'Social',
        type: 'html',
        width: '5%',
      },
      info: {
        title: 'Additional Info',
        type: 'text',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  sourceSub: Subscription;
  subject: string;
  constructor(private service: StudentsService, private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.retreiveData();
    });
  }

  private modifyData(data: Object) {
    return data['users'].map((el, i) => {
      el.medalsCount = el.results.length;
      el.subjects.length !== 0
        ? (el.subjectList = el.subjects
            .map((el, idx) => {
              return el.name;
            })
            .join(' '))
        : '';
      el.fullName !== '' ? (el.fullName = `<a href="/profile/${el._id}">${el.fullName}</a>`) : '';
      el.facebook !== ''
        ? (el.facebook = `<a href="${el.facebook}"<i class="table-icon fab fa-facebook"></i></a>`)
        : '';
      el.linkedin !== ''
        ? (el.linkedin = `<a href="${el.linkedin}"<i class="table-icon fab fa-linkedin"></i></a>`)
        : '';
      el.socialProfiles = el.facebook + el.linkedin;
      return el;
    });
  }

  ngOnInit() {
    this.retreiveData();
  }

  private retreiveData() {
    this.subject = this.route.snapshot.params.subject;
    const search = this.route.snapshot.params.search;
    if (!search) {
      this.sourceSub = this.service.getStudents(this.subject).subscribe(data => {
        const modifiedResult = this.modifyData(data);
        this.source.load(modifiedResult);
      });
    } else {
      this.sourceSub = this.service.searchStudents(search).subscribe(data => {
        const modifiedResult = this.modifyData(data);
        this.source.load(modifiedResult);
      });
    }
  }

  ngOnDestroy(): void {
    this.sourceSub.unsubscribe();
  }
}
