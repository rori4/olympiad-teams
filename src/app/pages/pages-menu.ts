import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'NAVIGATION',
    group: true,
  },
  {
    title: 'Students',
    icon: 'fa fa-medal',
    children: [
      {
        title: 'Mathematics',
        link: '/',
      },
      {
        title: 'Informatics',
        link: '/',
      },
      {
        title: 'Linguistics',
        link: '/',
      },
      {
        title: 'Biology',
        link: '/',
      },
      {
        title: 'Chemestry',
        link: '/',
      },
      {
        title: 'Physics',
        link: '/',
      },
      {
        title: 'Astronomy',
        link: '/',
      },
      {
        title: 'Young Physicists',
        link: '/',
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
    title: 'Add Student',
    icon: 'fa fa-plus',
    link: '/admin/add-student',
  },
];
