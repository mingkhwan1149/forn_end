import { useRoutes, type RouteObject } from 'react-router';
import HomePage from '../modules/auth/page/HomePage';
import NotFoundPage from '../shared/NotFoundPage';
import LoginPage from '../modules/auth/page/LoginPage';
import DashBoardPage from '../modules/dashboard/DashBoardPage';
import type { IRouterConfig } from './Router.interface';
import UserListPage from '../modules/user/page/UserListPage';


// Icon
import HomeIcon from '../assets/svg/home_icon.svg';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import OwnerListPage from '../modules/owner/page/OwnerListPage';
import OwnerFrome from '../modules/owner/components/From/OwnerFrom';
import BranchFrom from '../modules/branch/components/From/BranchFrom';
export const AppRoutes = {
    default: '/',
    user: '/user',
    login: '/login',
    notFoundPage: '*',
    dashboard: '/dashboard',
    owner_management: '/owner-management',
    branch_management: '/branch-management',
};

export const routesConfig: {
    privateRoutes: IRouterConfig[];
    publicRoutes: RouteObject[];
} = {
    privateRoutes: [
        {
            path: AppRoutes.default,
            element: <HomePage />,
            code: 'home',
            name: 'Home',
            icon: <img src={HomeIcon} />,
        },
        {
            path: AppRoutes.dashboard,
            element: <DashBoardPage />,
            code: 'dashboard',
            name: 'Dashboard',
            icon: <SpaceDashboardOutlinedIcon />
        },
        // {
        //     path: AppRoutes.user,
        //     element: <UserListPage />,
        //     code: 'user',
        //     name: 'User',
        //     children: [
        //         {
        //             path: AppRoutes.user,
        //             element: <UserListPage />,
        //             code: 'user',
        //             name: 'User'
        //         }
        //     ]
        // },
        // {
        //     path: AppRoutes.owner_management,
        //     code: 'owner',
        //     name: 'Owner',
        //     icon: <StoreIcon />,
        //     children: [
        //         {
        //             path: AppRoutes.owner_management,
        //             element: <OwnerListPage />,
        //             code: 'owner',
        //             name: 'จัดการบัญชีเจ้าของร้าน',
        //             subpath: false,
        //             childrens: [
        //                 {
        //                     path: `${AppRoutes.owner_management}/view/create/:id`,
        //                     element: <OwnerFrome />,
        //                     code: 'owner-edit',
        //                     name: 'เพิ่มบัญชีเจ้าของร้าน',
        //                     subpath: true,
        //                 },
        //                 {
        //                     path: `${AppRoutes.owner_management}/view/edit/:id`,
        //                     element: <OwnerFrome />,
        //                     code: 'owner-edit',
        //                     name: 'แก้ไขบัญชีเจ้าของร้าน',
        //                     subpath: true,
        //                 },
        //                 {
        //                     path: `${AppRoutes.owner_management}/branch/create/:id`,
        //                     element: <BranchFrom />,
        //                     code: 'branch-edit',
        //                     name: 'เพิ่มข้อมูลสาขา',
        //                     subpath: true,
        //                 },
        //                 {
        //                     path: `${AppRoutes.owner_management}/branch/edit/:id`,
        //                     element: <BranchFrom />,
        //                     code: 'branch',
        //                     name: 'แก้ไขข้อมูลสาขา',
        //                     subpath: true,
        //                 },],
        //         },
        //     ]
        // },

        {
            path: AppRoutes.owner_management,
            code: 'owner',
            name: 'การจัดการบัญชีร้านค้า',
            icon: <StoreMallDirectoryOutlinedIcon />,
            children: [
                {
                    path: AppRoutes.owner_management,
                    element: <OwnerListPage />,
                    code: 'owner',
                    name: 'จัดการบัญชีเจ้าของร้าน',
                    subpath: false,
                    childrens: [
                        {
                            path: `${AppRoutes.owner_management}/view/create/:id`,
                            element: <OwnerFrome />,
                            code: 'owner-edit',
                            name: 'เพิ่มบัญชีเจ้าของร้าน',
                            subpath: true,
                            modal: true,        
                        },
                        {
                            path: `${AppRoutes.owner_management}/view/edit/:id`,
                            element: <OwnerFrome />,
                            code: 'owner-edit',
                            name: 'แก้ไขบัญชีเจ้าของร้าน',
                            subpath: true,
                            modal: true,         
                        },
                        {
                            path: `${AppRoutes.owner_management}/branch/create/:id`,
                            element: <BranchFrom />,
                            code: 'branch-edit',
                            name: 'เพิ่มข้อมูลสาขา',
                            subpath: true,
                            modal: true,          
                        },
                        {
                            path: `${AppRoutes.owner_management}/branch/edit/:id`,
                            element: <BranchFrom />,
                            code: 'branch',
                            name: 'แก้ไขข้อมูลสาขา',
                            subpath: true,
                            modal: true,          
                        },
                    ],
                },
                // {
                //     path: AppRoutes.owner_management,
                //     element: <OwnerListPage />,
                //     code: 'owner',
                //     name: 'จัดการบัญชีเจ้าของร้าน',
                //     subpath: false,
                //     childrens: [
                //         {
                //             path: `${AppRoutes.owner_management}/view/create/:id`,
                //             element: <OwnerFrome />,
                //             code: 'owner-edit',
                //             name: 'เพิ่มบัญชีเจ้าของร้าน',
                //             subpath: true,
                //             modal: true,        
                //         },
                //         {
                //             path: `${AppRoutes.owner_management}/view/edit/:id`,
                //             element: <OwnerFrome />,
                //             code: 'owner-edit',
                //             name: 'แก้ไขบัญชีเจ้าของร้าน',
                //             subpath: true,
                //             modal: true,         
                //         },
                //         {
                //             path: `${AppRoutes.owner_management}/branch/create/:id`,
                //             element: <BranchFrom />,
                //             code: 'branch-edit',
                //             name: 'เพิ่มข้อมูลสาขา',
                //             subpath: true,
                //             modal: true,          
                //         },
                //         {
                //             path: `${AppRoutes.owner_management}/branch/edit/:id`,
                //             element: <BranchFrom />,
                //             code: 'branch',
                //             name: 'แก้ไขข้อมูลสาขา',
                //             subpath: true,
                //             modal: true,          
                //         },
                //     ],
                // },
            ],
        },
    ],
    publicRoutes: [
        {
            path: AppRoutes.notFoundPage,
            element: <NotFoundPage />
        },
        {
            path: AppRoutes.login,
            element: <LoginPage />
        }
    ]
};
