import React from 'react';
import { Route } from 'react-router-dom';
//************************************************생산 관리 ********************************************************
import MpsContainer from 'erp/logistic/production/page/MPS/MpsContainer'; // 주생산계획(MPS)
import WorkInstructionContainer from 'erp/logistic/production/page/WorkInstruction/WorkInstructionContainer'; // 작업지시
import MrpContainer from 'erp/logistic/production/page/MRP/MrpContainer'; // 소요량(MRP)
import MrpInfo from 'erp/logistic/production/page/MRP/MrpInfo'; // 뭔지모르겠음
import WorkSite from 'erp/logistic/production/page/WorkSite/WorkSite'; // 작업장/작업장로그
import AuthGuard from '../../../../utils/route-guard/AuthGuard'; //로그인확인 - Berry
import MainLayout from '../../../../template/layout/MainLayout'; //오른쪽 박스 템플릿 - Berry

const ProductionRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/app/logistic/production/mpsRegister',
            element: <MpsContainer />
        },
        {
            path: '/app/logistic/production/mrpRegisterAnd',
            element: <MrpContainer />
        },
        {
            path: '/app/logistic/production/workInstruction',
            element: <WorkInstructionContainer />
        },
        {
            path: '/app/logistic/production/workSite',
            element: <WorkSite />
        },
        {
            path: 'mrpInfo',
            element: <MrpInfo />
        }
    ]
};

export default ProductionRoute;
