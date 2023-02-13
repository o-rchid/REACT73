import React, { useState, useCallback, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Paper,
    TextField,
    Button,
    Grid,
    AppBar,
    InputLabel,
    Typography,
    Toolbar,
    MenuItem,
    Select,
    FormControl,
    OutlinedInput,
    NativeSelect
} from '@mui/material';
import MyGrid from 'util/LogiUtil/MyGrid';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { searchContractDetailInMpsAvailable } from '../MPS/mpsAxios';
import contractlistcolumn from '../MPS/contractListColumn';
import useInput from 'util/useInput';
import { today } from 'erp/hr/util/lib';
import { useThemeSwitcher } from 'mui-theme-switcher';
import MrpDialog from './MrpDialog2';
import Swal from 'sweetalert2';
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import MyCalendar from '../../../../../util/LogiUtil/MyCalendar';
import { getDatePicker } from '../../../../hr/util/datePicker';
import contractListColumn from '../MPS/contractListColumn';
import MyDialog from '../../../../../util/LogiUtil/MyDialog';

const MrpRegister = () => {
    const [checkData, setCheckData] = useState(null);
    const [mrpDialog, setMrpDialog] = useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [contractGridApi, setcontractGridApi] = useState();
    //시작일 종료일
    const [calendarDate, setCalendarDate] = useState({
        startDate: today,
        endDate: today
    });
    //그리드 데이터 - 수주 상세
    const [contractList, setContractList] = useState([]);

    //------------------이벤트----------------------

    //MPS 조회
    const searchMps = useCallback(() => {
        searchContractDetailInMpsAvailable(setContractList, calendarDate);
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

    const onChangeDate = (e) => {
        let nextCalendarDate = { ...calendarDate };
        nextCalendarDate[e.target.id] = e.target.value;
        setCalendarDate(nextCalendarDate);
    };

    const orderGirdApi = (params) => {
        setcontractGridApi(params.api);
    };

    //----------------------------------------------------------
    const dispatch = useDispatch();

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

    return (
        <>
            <MainCard content={false} title="MRP주생산계획" secondary={setMrpgrid()}>
                <MyGrid
                    column={contractlistcolumn}
                    list={contractList}
                    onCellClicked={undefined}
                    onRowSelected={onRowSelected}
                    rowSelection="single"
                    api={orderGirdApi}
                    components={{ datePicker: getDatePicker() }}
                />

                <MyDialog open={mrpDialog} close={mrpClose} maxWidth={'90%'}>
                    <div>
                        <MrpDialog />
                    </div>
                </MyDialog>
            </MainCard>
        </>
    );
};
export default MrpRegister;
