import {
  MuiIcons,
} from "../../utils/Icons";

export interface SideBarMenuItemType {
  name: string;
  icon: React.ReactNode;
  path?: string;
  isExpandable?: boolean;
  subItems?: SideBarMenuItemType[];
}

// Super Admin Menu Items
export const SuperAdminMenuItems: SideBarMenuItemType[] = [
  {
    name: "Dashboard",
    icon: <MuiIcons.Dashboard />,
    path: "/super-admin/dashboard",
    isExpandable: false,
  },
  {
    name: "Schools",
    icon: <MuiIcons.AccountBalance />,
    path: "/super-admin/schools",
    isExpandable: false,
  },
  {
    name: "Users",
    icon: <MuiIcons.People />,
    path: "/super-admin/users",
    isExpandable: false,
  },
];

// School Admin Menu Items
export const SchoolAdminMenuItems: SideBarMenuItemType[] = [
  {
    name: "Dashboard",
    icon: <MuiIcons.Dashboard />,
    path: "/school-admin/dashboard",
    isExpandable: false,
  },
  {
    name: "School",
    icon: <MuiIcons.AccountBalance />,
    path: "/school-admin/school",
    isExpandable: false,
  },
  {
    name: "Teachers",
    icon: <MuiIcons.Person />,
    path: "/school-admin/teachers",
    isExpandable: false,
  },
  {
    name: "Students",
    icon: <MuiIcons.Group />,
    path: "/school-admin/students",
    isExpandable: false,
  },
  {
    name: "Parents",
    icon: <MuiIcons.People />,
    path: "/school-admin/parents",
    isExpandable: false,
  },
];

// Teachers Menu Items
export const TeachersMenuItems: SideBarMenuItemType[] = [
  {
    name: "Dashboard",
    icon: <MuiIcons.Dashboard />,
    path: "/teacher/dashboard",
    isExpandable: false,
  },
  {
    name: "Classes",
    icon: <MuiIcons.Book />,
    path: "/teacher/classes",
    isExpandable: false,
  },
  {
    name: "Students",
    icon: <MuiIcons.Group />,
    path: "/teacher/students",
    isExpandable: false,
  },
  {
    name: "Attendance",
    icon: <MuiIcons.CheckCircle />,
    path: "/teacher/attendance",
    isExpandable: false,
  },
];

// Students Menu Items
export const StudentsMenuItems: SideBarMenuItemType[] = [
  {
    name: "Dashboard",
    icon: <MuiIcons.Dashboard />,
    path: "/student/dashboard",
    isExpandable: false,
  },
  {
    name: "Classes",
    icon: <MuiIcons.Book />,
    path: "/student/classes",
    isExpandable: false,
  },
  {
    name: "Attendance",
    icon: <MuiIcons.CheckCircle />,
    path: "/student/attendance",
    isExpandable: false,
  },
  {
    name: "Results",
    icon: <MuiIcons.Assessment />,
    path: "/student/results",
    isExpandable: false,
  },
];
