import React, { useState, useCallback, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import MyGrid from 'util/LogiUtil/MyGrid';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { searchContractDetailInMpsAvailable } from '../MPS/mpsAxios';
import * as types from '../../reducer/mrpReducer';
import mpsColumn from '../MPS/mpsListColumn';
import { today } from 'erp/hr/util/lib';
import MrpDialog from './MrpDialog2';
import Swal from 'sweetalert2';
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import MyCalendar from '../../../../../util/LogiUtil/MyCalendar';
import { getDatePicker } from '../../../../hr/util/datePicker';
import MyDialog from '../../../../../util/LogiUtil/MyDialog';

const MrpRegister = () => {
    const dispatch = useDispatch();
    //그리드 값 선택
    const [checkData, setCheckData] = useState(null);
    //MrpDialog open
    const [mrpDialog, setMrpDialog] = useState(false);
    const [contractGridApi, setcontractGridApi] = useState();
    //시작일 종료일
    const [calendarDate, setCalendarDate] = useState({
        startDate: today,
        endDate: today
    });
    //그리드 데이터 - 수주 상세
    const gridMrpList = useSelector((state) => state.RootReducers.logistic.production.mrpReducer.MrpList);
    //MrpDialog로 넘겨줄 값
    const mrpList = useSelector((state) => state.RootReducers.logistic.production.mpsReducer.MrpList);
    const mrpsimulatorList = useSelector((state) => state.RootReducers.logistic.production.mrpsimulatorlist.MrpSimulatorList);
    const mrpgetList = useSelector((state) => state.RootReducers.logistic.production.mrpReducer.MrpGetList);
    const getherList = useSelector((state) => state.RootReducers.logistic.production.gatherlist.GatherList);

    //------------------이벤트----------------------

    //MPS 조회
    const searchMps = useCallback(() => {
        dispatch({
            type: types.SEARCH_MRP_START,
            param: {
                startDate: calendarDate.startDate,
                endDate: calendarDate.endDate
            }
        });
    }, [calendarDate]);

    //MRP 모의전개 - 선택한 열 있으면 mrpDialog true
    const mrpRegister = useCallback(() => {
        console.log(checkData);

        if (!checkData) {
            Swal.fire('알림', '모의전개할 mps를 선택하십시오.', 'info');
            return;
        }

        setMrpDialog(true);
    }, [checkData]);

    //close 누르면 mrpDialog false
    const mrpClose = () => {
        setMrpDialog(false);
    };

    //그리드 선택하면 checkDate에 값 set
    const onRowSelected = useCallback(
        (e) => {
            setCheckData(e.api.getSelectedRows());
        },
        [checkData]
    );

    //달력 값 바꼈을 때 실행
    const onChangeDate = (e) => {
        let nextCalendarDate = { ...calendarDate };
        nextCalendarDate[e.target.id] = e.target.value;
        setCalendarDate(nextCalendarDate);
    };

    //그리드 API 가져오기
    const gridApi = (params) => {
        setcontractGridApi(params.api);
    };

    //MainCard secondary
    function setMrpgrid() {
        return (
            <Grid item xs={12}>
                <div id="grid-wrapper">
                    <MyCalendar onChangeDate={onChangeDate} />
                    <Button variant={'contained'} color={'secondary'} onClick={searchMps}>
                        MPS조회
                    </Button>
                    <Button variant={'contained'} color={'secondary'} name={'confirm'} onClick={mrpRegister}>
                        MRP모의전개
                    </Button>
                </div>
            </Grid>
        );
    }

    //----------------------------------------------------------

    return (
        <>
            <MainCard content={false} title="MRP주생산계획" secondary={setMrpgrid()}>
                <MyGrid
                    column={mpsColumn}
                    list={gridMrpList}
                    onCellClicked={undefined}
                    onRowSelected={onRowSelected}
                    rowSelection="multiple"
                    api={gridApi}
                    components={{ datePicker: getDatePicker() }}
                />

                <MyDialog open={mrpDialog} close={mrpClose} maxWidth={'90%'}>
                    <div>
                        <MrpDialog
                            searchMrpList={mrpList}
                            checkData={checkData}
                            serCheckData={setCheckData}
                            MrpSimulatorList={mrpsimulatorList}
                            MrpRegisterList={mrpgetList}
                            mrpRegisterGridApi={gridApi}
                        />
                    </div>
                </MyDialog>
            </MainCard>
        </>
    );
};
export default MrpRegister;
