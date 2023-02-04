import React, { useState, useCallback } from 'react';
import MyCalendar from 'util/LogiUtil/MyCalendar';
import MyGrid from 'util/LogiUtil/MyGrid';
import contractListColumn from './contractListColumn';
import { searchContractDetailInMpsAvailable, convertContractDetailToMps } from './mpsAxios';
import { getDatePicker } from 'erp/hr/util/datePicker';
import { today } from 'erp/hr/util/lib';
import Swal from 'sweetalert2';
import MpsDialog from './MpsDialog';
import { Button, Grid } from '@mui/material';
import MainCard from '../../../../../template/ui-component/cards/MainCard';
import MyDialog from '../../../../../util/LogiUtil/MyDialog';

const MpsContainer = () => {
    // MPS 등록 가능
    const [contractList, setContractList] = useState([]);
    // Ag-grid API
    const [contractGridApi, setcontractGridApi] = useState();
    // 시작 종료일
    const [calendarDate, setCalendarDate] = useState({
        startDate: '2020-01-01',
        endDate: today
    });
    // MpsDiaog open 상태 관리
    const [mpsDialog, setMpsDialog] = useState(false);

    //---------------------------------------------------------------

    // 시작 종료일 수정 시 setCalendarDate
    const onChangeDate = (e) => {
        let nextCalendarDate = { ...calendarDate };
        nextCalendarDate[e.target.id] = e.target.value;
        setCalendarDate(nextCalendarDate);
    };

    // axios로 MPS 등록 가능 조회
    const onClickSearchContract = useCallback(() => {
        searchContractDetailInMpsAvailable(setContractList, calendarDate);
    }, [calendarDate]);

    // onGridReady를 통해 grid API 넘어옴
    const orderGirdApi = (params) => {
        setcontractGridApi(params.api);
    };

    // MPS 등록 클릭
    const onClickMpsInsert = () => {
        let selectNodes = contractGridApi.getSelectedNodes();
        if (selectNodes.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: '조회부터 하세요'
            });
        }
        let row = selectNodes[0].data;
        if (row.mpsPlanDate === null || row.scheduledEndDate === null || row.mpsPlanDate === '' || row.scheduledEndDate === '') {
            return Swal.fire({
                icon: 'error',
                title: '계획일자,출하예정일 \r\n\r\n  값을 입력해주세요'
            });
        }

        let newRow = { ...row, planClassification: '수주상세' };

        console.log('newRow');
        console.log(newRow);
        console.log(selectNodes);
        convertContractDetailToMps(newRow);
        let selectRows = contractGridApi.getSelectedRows();
        contractGridApi.updateRowData({ remove: selectRows });
    };

    // MPS 조회 클릭 - MpsDialog open에 true 전달
    const onClickSearchMps = () => {
        setMpsDialog(true);
    };

    // MpsDialog close 클릭 - MpsDialog open에 false 전달
    const mpsClose = () => {
        setMpsDialog(false);
    };

    return (
        <>
            <MainCard
                content={false}
                title="MPS 등록 및 조회 "
                secondary={
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                            onClick={onClickMpsInsert}
                        >
                            MPS 등록
                        </Button>

                        <MyCalendar onChangeDate={onChangeDate} />
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                            onClick={onClickSearchContract}
                        >
                            MPS등록 가능 조회
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                            onClick={onClickSearchMps}
                        >
                            MPS 조회
                        </Button>
                    </Grid>
                }
            >
                <MyGrid
                    column={contractListColumn}
                    list={contractList}
                    onCellClicked={undefined}
                    rowSelection="single"
                    api={orderGirdApi}
                    components={{ datePicker: getDatePicker() }}
                ></MyGrid>

                <MyDialog open={mpsDialog} close={mpsClose} maxWidth={'150%'}>
                    <div>
                        <MpsDialog calendarDate={calendarDate} />
                    </div>
                </MyDialog>
            </MainCard>
        </>
    );
};

export default MpsContainer;
