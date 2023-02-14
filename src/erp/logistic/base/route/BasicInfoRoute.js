import React from 'react';

import { default as CompanyInfo } from 'erp/logistic/base/page/CompanyInfo';
import { default as WorkplaceInfo } from 'erp/logistic/base/page/WorkplaceInfo';
import { default as DeptInfo } from 'erp/logistic/base/page/DeptInfo/DeptInfo';
import { default as ClientInfo } from 'erp/logistic/base/page/ClientInfo/ClientInfo';
import AuthGuard from '../../../../utils/route-guard/AuthGuard';
import MainLayout from '../../../../template/layout/MainLayout';

const BasicInfoRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/app/logistic/base/companyInfo',
            element: <CompanyInfo />
        },
        {
            path: '/app/logistic/base/workplaceInfo',
            element: <WorkplaceInfo />
        },
        {
            path: '/app/logistic/base/deptInfo',
            element: <DeptInfo />
        },
        {
            path: '/app/logistic/base/clientInfo',
            element: <ClientInfo />
        }
    ]
};

export default BasicInfoRoute;
