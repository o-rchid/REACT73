import { Typography, AppBar, Toolbar, TextField } from "@material-ui/core";
import {Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup} from '@mui/material';
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import Moment from "moment";
import Axios from 'axios';
import React, {useState, useRef, useCallback, useEffect} from 'react';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import ItemDialog from '../Presentational/ItemDialog';
import AmountDialog from '../Presentational/AmountDialog';
// import XLSX from 'xlsx';
import { CSVLink } from 'react-csv';
import * as api from 'erp/logistic/sales/api';
import useAsync from 'util/useAsync';
import MainCard from "template/ui-component/cards/MainCard";
import { getDatePicker } from "util/LogiUtil/DatePicker";
import MyDialog from "../../../../../../../util/LogiUtil/MyDialog";

const EstimateInfo= () => {
    const today = Moment().format('YYYY-MM-DD');
    const [gridApiEstimate, setGridApiEstimate] = useState(null);
    const [gridColumnApiEstimate, setGridColumnApiEstimate] = useState(null);
    const [gridApiEstimateDetail, setGridApiEstimateDetail] = useState(null);
    const [gridColumnApiEstimateDetail, setGridColumnApiEstimateDetail] = useState(null);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [rowEstimate, setRowEstimate] = useState([]);
    const [rowEstimateDetail, setRowEstimateDetail] = useState([]);
    const [dateSearchCondition, setDateSearchCondition] = useState('estimateDate');
    const [openItemDialog, setOpenItemDialog] = useState(false);
    const [openAmountDialog, setOpenAmountDialog] = useState(false);
    const [estimateNo, setEstimateNo] = useState('');
    const [estsave, setEstSave] =  useState([]);

    const columnDefsEstimate = [
        {
            headerName: ' ',
            checkboxSelection: true,
            width: 35,
            cellStyle: { textAlign: 'center' }
        },

        { headerName: "견적일련번호", field: "estimateNo"},
        { headerName: "거래처코드", field: "customerCode"},
        { headerName: "견적일자", field: "estimateDate"},
        { headerName: "수주여부", field: "contractStatus"},
        { headerName: "견적요청자", field: "estimateRequester"},
        { headerName: "유효일자", field: "effectiveDate"},
        { headerName: "견적담당자코드", field: "personCodeInChange"},
        { headerName: "비고", field: "description"},
    ];

    const columnDefsEstimateDetail = [
        { headerName: "견적상세일련번호", field: "estimateDetailNo"},
        { headerName: "품목코드", field: "itemCode"},
        { headerName: "품목명", field: "itemName"},
        { headerName: "단위", field: "unitOfEstimate"},
        { headerName: "납기일", field: "dueDateOfEstimate", cellEditor: 'datePicker'},
        { headerName: "견적수량", field: "estimateAmount"},
        { headerName: "견적단가", field: "unitPriceOfEstimate"},
        { headerName: "합계액", field: "sumPriceOfEstimate"},
        { headerName: "비고", field: "description"},
        { headerName: "견적일련번호", field: "description"},
        {
            headerName: "삭제",
            field: "remove",
            cellRenderer: 'btnRemove'
        }
    ];
    
    function onGridReadyEstimate(params) {
        setGridApiEstimate(params.api);
        setGridColumnApiEstimate(params.columnApi);
        params.api.sizeColumnsToFit();
    }

    function onGridReadyEstimateDetail(params) {
        setGridApiEstimateDetail(params.api);
        setGridColumnApiEstimateDetail(params.columnApi);
        params.api.sizeColumnsToFit();
    }

    const onChangeDate = (e) => {
        if(e.target.id === 'startDate'){
            setStartDate(e.target.value)
        }else{
            setEndDate(e.target.value)
        }
        console.log(e);
    }

    const [estimate, searchEstimateFetch] = useAsync((param) =>api.searchEstimate(param), [], true);
    const [estimateDetail, searchEstimateDetailFetch] = useAsync((param) =>api.estimateCellClicked(param), [], true);
//setRowEstimate
    const searchEstimate = useCallback(() => {
        let param = {
            startDate : startDate,
            endDate : endDate,
            dateSearchCondition : dateSearchCondition
        }
        console.log("@@@@@@")
        searchEstimateFetch(param);
       
        estimate.data ? setRowEstimate(estimate.data.gridRowJson) : null;
    },[dateSearchCondition, endDate, searchEstimateFetch, startDate]);

    const onCellClicked = params => {
        console.log("!!!!!!!!!!!!!!!!"+JSON.stringify(params.data));
        params.data ? setEstSave(params.data) : null;
        console.log("*****"+JSON.stringify(estsave));
          const estimateNo = params.data.estimateNo;
          setEstimateNo(estimateNo);
          searchEstimateDetailFetch(params);
          estimateDetail.data ? setRowEstimateDetail(estimateDetail.data.gridRowJson) : null;
          console.log('@@@@@'+JSON.stringify(rowEstimateDetail));
      };

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(3),
        },
        button: {
          margin: theme.spacing(1, 1, 0, 0),
        },
      }));

    const classes = useStyles();

    const handleRadioChange = (event) => {
        console.log(event.target.value);
        if(event.target.value === 'estimateDate'){
            setDateSearchCondition('estimateDate');
        }
        else if(event.target.value === 'effectiveDate'){
            setDateSearchCondition('effectiveDate');
        }
        
    }

    const frameworkComponents = {
        btnRemove : ()=>{return BtnRemove(handleRemove)}
    }

    const handleAddEstimateDetailRow = () => {
        var newData = {
            itemCode : '',
            itemName : '',
            unitOfEstimate : 'EA',
            dueDateOfEstimate : '',
            estimateAmount : 0,
            unitPriceOfEstimate : 0,
            sumPriceOfEstimate : 0,
            description : '',
            remove : '',
            status : 'INSERT',
        };
        setRowEstimateDetail([...rowEstimateDetail, newData]);
    }
    const [estimateRow, saveEstimateRowFetch] = useAsync((param) =>api.saveEstimateRow(param), [], true);

    const handleBatchEstimateDetailRow = () => {
        console.log("^^^^^"+JSON.stringify(estsave));
        estsave.estimateDetailTOList = null;
        estsave.estimateDetailTOList = rowEstimateDetail;
        console.log("!!!!!!!!!!"+JSON.stringify(estsave));
        saveEstimateRowFetch(estsave);
    }

    const handleRemove = (e) =>{
        e.defaultPrevented();
       console.log(e);

   }

    const handleOpenDialog = (params) =>{
        if(params.colDef.field === 'itemCode' || params.colDef.field === 'itemName'){
            setOpenItemDialog(true);
        }else if(params.colDef.field === 'estimateAmount' || params.colDef.field === 'unitPriceOfEstimate' || params.colDef.field === 'sumPriceOfEstimate'){
            setOpenAmountDialog(true);
        }
    }

    const handleCloseItemDialog = () =>{
        setOpenItemDialog(false);
    }

    const handleItemSelected=(params)=>{
       
        var selectedData = gridApiEstimateDetail.getSelectedRows();
        selectedData[0].itemCode = params.data.itemCode;
        selectedData[0].itemName = params.data.itemName;

        gridApiEstimateDetail.updateRowData({ update: selectedData });

        console.log(rowEstimateDetail);
        

    }


    const handleCloseAmountDialog = (params) =>{
        // console.log(params);
        setOpenAmountDialog(false);
    }
    
    const [itemCost, searchItemCostFetch] = useAsync((param) =>api.searchItemCode(param), [], true);
    const handleSearchItemCode = () => {
        var row = gridApiEstimateDetail.getSelectedRows();
        let param = {
            itemCode: row[0].itemCode
        };
      
        searchItemCostFetch(param);
        console.log("@##@@#@##@"+JSON.stringify(itemCost));
    };



    const headers = [
        { label: "estimateDate", key: "estimateDate" },
        { label: "estimateNo", key: "estimateNo" },
        { label: "customerCode", key: "customerCode" },
        { label: "customerName", key: "customerName" },
        { label: "businessLicenseNumber", key: "businessLicenseNumber" },
        { label: "estimateAmount", key: "estimateAmount" },
        { label: "unitPriceOfEstimate", key: "unitPriceOfEstimate" },
        { label: "sumPriceOfEstimate", key: "sumPriceOfEstimate" },
        { label: "itemName", key: "itemName" },
        { label: "dueDateOfEstimate", key: "dueDateOfEstimate" },
        { label: "customerTelNumber", key: "customerTelNumber" }
      ];

      const [data, setData] = useState([]);

      const  downloadReport = useCallback(() => {
          
        const process = async () => {
        let param = {
            estimateNo : estimateNo
        }

        try{
       const result = await api.downloadReport(param);

        setData(result.data.gridRowJson);
        csvLinkEl.current.link.click();
    }catch(e){
        console.log(e.message);
    }
      }

      process();
    },[estimateNo]);

      const csvLinkEl = useRef(null);

    return (
        <>
            <div>
                <MainCard
                    content={false}
                    title="견적 조회"
                    secondary={<Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                         <div align='right'>
                    <FormControl component="fieldset" error={true} className={classes.formControl}>
                        <RadioGroup row aria-label="quiz" name="quiz" value={dateSearchCondition} onChange={handleRadioChange} >
                            <FormControlLabel value="estimateDate" control={<Radio />} label="견적일자" />
                            <FormControlLabel value="effectiveDate" control={<Radio />} label="유효일자" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                    id="startDate"
                    label="시작일"
                    onChange={onChangeDate}
                    type={"date"}
                    defaultValue="2020-12-03"
                    
                    />
                    <TextField
                    id="endDate"
                    label="종료일"
                    onChange={onChangeDate}
                    type={"date"}
                    defaultValue="2020-12-03"
                
                    />

                    <Button                     
                    variant="contained"
                    color="secondary"
                    onClick={downloadReport}
                    style={{ marginRight: '1vh' }}>Export to CSV (Async)</Button>
        <CSVLink
          headers={headers}
          filename="Clue_Mediator_Report_Async.csv"
          data={data}
          ref={csvLinkEl}
        ></CSVLink>

                    <Button 
                    onClick={searchEstimate}
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    >
                        견적조회
                    </Button>
                    </div>
                    </Grid>
                }>
                  <div className="ag-theme-material"
                    align='center'
                    skipHeaderOnAutoSize="true"
                    enableColResize="true"
                    enableSorting="true"
                    enableFilter="true"
                    enableRangeSelection="true"        
                    rowStyle={{ "text-align": "center" }}
                    cellStyle={{textAlign: "center"}}
                    style={ { height: 250, width: "100%", float:"center"} }
                > 
                    
                    <AgGridReact
                        columnDefs={columnDefsEstimate}
                        defaultColDef= {{
                            resizable: true,
                            editable : true
                        }}
                        rowSelection="single"
                        onGridReady={onGridReadyEstimate}
                        rowData={rowEstimate ? rowEstimate : null}
                        style={{
                            height: "400%",
                            width: "100%"
                        }}
                        onCellClicked={onCellClicked}
                        onGridSizeChanged={event => {
                            event.api.sizeColumnsToFit();
                          }}
                    />
                 </div> 
                
            

                </MainCard>

                {/* 견적상세 그리드 */}
                <div align='right'>
                    <Button 
                    onClick={handleAddEstimateDetailRow}
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    >
                        견적상세추가
                    </Button>
                    <Button 
                    onClick={handleBatchEstimateDetailRow}
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: '1vh' }}
                    >
                        일괄저장
                    </Button>
                   
                   
                </div>
                <div className="ag-theme-material"
                    align='center'
                    skipHeaderOnAutoSize="true"
                    enableColResize="true"
                    enableSorting="true"
                    enableFilter="true"
                    enableRangeSelection="true"        
                    rowStyle={{ "text-align": "center" }}
                    cellStyle={{textAlign: "center"}}
                    style={ { height: 250, width: "100%", float:"center"} }
                >
                    <AgGridReact
                        columnDefs={columnDefsEstimateDetail}
                        defaultColDef= {{
                            resizable: true,
                            editable : true
                        }}
                        rowSelection="single"
                        onGridReady={onGridReadyEstimateDetail}
                        rowData={rowEstimateDetail ? rowEstimateDetail : null}
                        frameworkComponents = {frameworkComponents}
                        onCellClicked = {handleOpenDialog}
                        components={{ datePicker: getDatePicker() }}
                        style={{
                            height: "400%",
                            width: "100%"
                        }}
                        onGridSizeChanged={event => {
                            event.api.sizeColumnsToFit();
                          }}
                       
                    />

                    <MyDialog open={openItemDialog} close={handleCloseItemDialog}>
                        <ItemDialog close={handleCloseItemDialog} onCellClicked={handleItemSelected}/>
                    </MyDialog>

                    <MyDialog open={openAmountDialog} close={handleCloseAmountDialog}>
                        <AmountDialog close={handleCloseAmountDialog}
                        handleSearchItemCode={handleSearchItemCode}
                        itemCost={itemCost.data ? itemCost.data.gridRowJson:null}
                        gridApiEstimateDetail={gridApiEstimateDetail}
                        />
                    </MyDialog>
                </div>
            </div>
        </>
    );
}

const BtnRemove = (handleRemove) => {

    
    return (
        <Button
        variant="contained"
        color="secondary">Remove</Button>
    )
}

export default EstimateInfo;