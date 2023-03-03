import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'util/LogiUtil/MyGrid';
import mrpListColumn from './MRPColumn';
import { TextField, Button } from '@material-ui/core';
import useInput from 'util/useInput';
import { today } from 'erp/hr/util/lib';
import * as types from '../../reducer/mrpReducer';
import Swal from 'sweetalert2';

const MrpDialog = ({ checkData, setCheckData, searchMrpList, mrpRegisterGridApi }) => {
    const dispatch = useDispatch();

    const MrpSimulatorList = useSelector((state) => state.RootReducers.logistic.production.mrpsimulatorlist.MrpSimulatorList);
    const mrpgetList = useSelector((state) => state.RootReducers.logistic.production.mrpReducer.MrpGetList);
    const error = useSelector((state) => state.RootReducers.logistic.production.mrpReducer.error);
    const errorMsg = useSelector((state) => state.RootReducers.logistic.production.mrpReducer.errorMsg);

    const fromDate = useInput(today);
    const [gridApi, setGridApi] = useState(null);

    const onClickMrpInsert = () => {
        gridApi.selectAll();
        var selectedData = gridApi.getSelectedRows();

        dispatch({
            type: types.INSERT_MRP_START,
            param: {
                mrpRegisterDate: fromDate.value
            }
        });

        if (error == true) {
            Swal.fire({
                icon: 'error',
                title: errorMsg
            });
            return;
        }

        gridApi.updateRowData({ remove: selectedData });

        mrpRegisterGridApi.setRowData([]);
    };

    const myGridApi = (prams) => {
        setGridApi(prams.api);
    };

    return (
        <>
            <MyGrid column={mrpListColumn} title={'MRP  SIMULATION'} list={MrpSimulatorList} api={myGridApi}>
                <div id="grid-wrapper">
                    <TextField
                        id={'fromDate'}
                        label={'소요량 전개일자'}
                        type={'date'}
                        defaultValue={fromDate.value}
                        onChange={fromDate.onChange}
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" style={{ marginRight: '1vh', marginTop: '2vh' }} onClick={onClickMrpInsert}>
                        전개 결과 MRP등록
                    </Button>
                </div>
            </MyGrid>
        </>
    );
};

export default MrpDialog;
