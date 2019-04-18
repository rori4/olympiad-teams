import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SubjectsService } from '../../../@core/services/subjects.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-edit-subjects',
  templateUrl: './edit-subjects.component.html',
  styleUrls: ['./edit-subjects.component.scss'],
})
export class EditSubjectsComponent implements OnInit, OnDestroy {
  settings = {
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
      name: {
        title: 'Name',
        type: 'string',
      },
      currentInstructor: {
        title: 'Current Instructor',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  fetchSub: Subscription;
  addSubjectSub: Subscription;

  constructor(private service: SubjectsService) {}

  ngOnInit() {
    this.fetchSub = this.service.getSubjects().subscribe(result => {
      console.log(result);
      this.source.load(result.data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteSubject(event.data).subscribe(res => {
        if (res.success) {
          event.confirm.resolve();
        } else {
          alert('Somehting went wrong!');
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }
  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want edit this subject?')) {
      this.service.editSubject({old: event.data, new: event.newData}).subscribe(res => {
        if (res.success) {
          event.confirm.resolve();
        } else {
          alert('Please provide a name for the subject!');
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create this subject?')) {
      this.service.addSubject(event.newData).subscribe(res => {
        if (res.success) {
          event.confirm.resolve();
        } else {
          alert('Please provide a name for the subject!');
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  ngOnDestroy(): void {
    this.fetchSub !== undefined ? this.fetchSub.unsubscribe() : null;
    this.addSubjectSub !== undefined ? this.addSubjectSub.unsubscribe() : null;
  }
}
