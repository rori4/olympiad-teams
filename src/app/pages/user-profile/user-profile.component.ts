import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../@core/services/user.service';
import { User } from '../../@core/models/user';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
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
      olympiad: {
        title: 'Olympiad',
        type: 'string',
      },
      position: {
        title: 'Position',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: '1', title: 'Gold Medal' },
              { value: '2', title: 'Silver Medal' },
              { value: '3', title: 'Bronze Medal' },
              { value: '4', title: '4th Position' },
              { value: '5', title: '5th Position' },
              { value: '6', title: '6th Position' },
              { value: '7', title: '7th Position' },
              { value: '8', title: '8th Position' },
              { value: '9', title: '9th Position' },
              { value: '10', title: '10th Position' },
            ],
          },
        },
      },
    },
  };
  adminSettings;
  source: LocalDataSource = new LocalDataSource();
  user: User;
  sourceSub: Subscription;
  id: string;
  constructor(private authService: NbAuthService, private userService: UserService, private route: ActivatedRoute) {}

  onDeleteConfirm(event): void {
    console.log(this.user);
    if (window.confirm('Are you sure you want to delete this result?')) {
      this.userService.deleteResult(event.data).subscribe(res => {
        if (res.success) {
          event.confirm.resolve();
        } else {
          alert('Please provide a name of competition and position of the user');
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }
  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit this result?')) {
      this.userService.editResult({ old: event.data, new: event.newData }).subscribe(res => {
        if (res.success) {
          event.confirm.resolve();
        } else {
          alert('Please provide a name of competition and position of the user');
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create this result?')) {
      this.userService.addResult(this.id, event.newData).subscribe(res => {
        if (res.success) {
          event.confirm.resolve();
        } else {
          alert('Please provide a name of competition and position of the user');
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.initAdminSettings();
    this.id = this.route.snapshot.params.id;
    this.sourceSub = this.userService.getUser(this.id).subscribe(res => {
      this.user = res.data;
      const subjects = res.data.subjects
        .slice(0, 3)
        .map(e => e.name)
        .join(' ');
      this.user.subjectsList = subjects;
      this.source.load(res.data.results);
    });
  }

  private initAdminSettings() {
    this.adminSettings = {};
    Object.assign(this.adminSettings, this.settings);
    this.adminSettings.actions = {
      add: true,
      edit: true,
      delete: true,
    };
  }
}
