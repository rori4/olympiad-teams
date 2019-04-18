import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'NAVIGATION',
    group: true,
  },
  {
    title: 'Students',
    icon: 'fa fa-medal',
    expanded: true,
    children: [
      {
        title: 'Everyone',
        link: '/students/all',
      },
      {
        title: 'Mathematics',
        link: '/students/mathematics',
      },
      {
        title: 'Informatics',
        link: '/students/informatics',
      },
      {
        title: 'Linguistics',
        link: '/students/linguistics',
      },
      {
        title: 'Biology',
        link: '/students/biology',
      },
      {
        title: 'Chemestry',
        link: '/students/chemestry',
      },
      {
        title: 'Physics',
        link: '/students/physics',
      },
      {
        title: 'Astronomy',
        link: '/students/astronomy',
      },
      {
        title: 'Young Physicists',
        link: '/students/young',
      },
    ],
  },
];

export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'ADMIN',
    group: true,
  },
  {
    title: 'Add User',
    icon: 'fa fa-plus',
    link: '/admin/add-user',
  },
  {
    title: 'Edit Subjects',
    icon: 'fa fa-edit',
    link: '/admin/edit-subjects',
  },
];
