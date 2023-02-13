import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import MrpRegister from 'erp/logistic/production/page/MRP/MrpRegister2';
import MrpGather from 'erp/logistic/production/page/MRP/MrpGather';
import { Link } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';

import MainCard from '../../../../../template/ui-component/cards/MainCard';
import { searchGatherList, GatherInsert } from 'erp/logistic/production/saga/gatherSaga';
import { searchMpsList } from 'erp/logistic/production/saga/mpsSaga';
import { searchGetMrpList } from 'erp/logistic/production/saga/mrpSaga';
import { searchMrpList, MrpRegisterList } from 'erp/logistic/production/saga/mrpSimulatorSaga';
import { connect } from 'react-redux';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

//Tab에 적용할 id, ARIA용
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const MrpContainer = () => {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(value);
    return (
        <MainCard>
            <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={handleChange}
                variant="scrollable"
                aria-label="simple tabs example"
                sx={{
                    '& a': {
                        fontWeight: 'bold',
                        minHeight: 'auto',
                        minWidth: 10,
                        px: 1,
                        py: 1.5,
                        mr: 2.25,
                        color: theme.palette.grey[600],
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': {
                        color: theme.palette.secondary.main
                    },
                    '& a > svg': {
                        marginBottom: '0px !important',
                        marginRight: 1.25
                    },
                    mb: 3
                }}
            >
                <Tab component={Link} to="#" label="MRPR" {...a11yProps(0)} />
                <Tab component={Link} to="#" label="MRPG" {...a11yProps(1)} />
            </Tabs>

            {/* MRP 주생산계획 */}
            <TabPanel value={value} index={0}>
                <MrpRegister />
            </TabPanel>

            {/* 소요량 취합 */}
            <TabPanel value={value} index={1}>
                <MrpGather />
            </TabPanel>
        </MainCard>
    );
};

const mapStateToProps = (state) => {
    return {
        MrpList: state.RootReducers.logistic.ProductionReducerCombine.mpslist.MrpList,
        MrpSimulatorList: state.RootReducers.logistic.ProductionReducerCombine.mrpsimulatorlist.MrpSimulatorList,
        MrpGetList: state.RootReducers.logistic.ProductionReducerCombine.mrplist.MrpGetList,
        GatherList: state.RootReducers.logistic.ProductionReducerCombine.gatherlist.GatherList
    };
};

export default MrpContainer;
