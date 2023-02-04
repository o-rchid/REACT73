import React from 'react';
import BasicInfoRoute from 'erp/logistic/base/route/BasicInfoRoute';
import LogisticsInfoRoute from 'erp/logistic/base/route/LogisticsInfoRoute';
import ProductionRoute from 'erp/logistic/production/route/ProductionRoute';
import PurchaseRoute from 'erp/logistic/purchase/route/PurchaseRoute';
import SalesRoute from 'erp/logistic/sales/route/SalesRoute';
import OutsourcRoute from 'erp/logistic/outsourc/route/OutsourcRoute';
import TransportRoute from 'erp/logistic/transport/route/transportRoute';

const LogiRootRoute = [BasicInfoRoute, LogisticsInfoRoute, OutsourcRoute, ProductionRoute, PurchaseRoute, SalesRoute, TransportRoute];

export default LogiRootRoute;
