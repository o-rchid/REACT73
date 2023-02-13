const contractlistcolumn = {
    columnDefs: [
        { width: '100', headerCheckboxSelection: true, checkboxSelection: true },
        {
            headerName: '수주상세일련번호',

            field: 'contractDetailNo',
            width: '220'
        }, //o
        { headerName: '유형', field: 'contractType', width: '120' }, //o
        { headerName: '계획구분', field: 'planClassification', hide: true },
        { headerName: '수주일자', field: 'contractDate' }, //o
        { headerName: '견적수량', field: 'estimateAmount', width: '150' }, //o
        { headerName: '초기납품', field: 'stockAmountUse', width: '150' }, //o
        { headerName: '제작수량', field: 'productionRequirement', width: '150' }, //o
        {
            headerName: '계획일자',
            field: 'mpsPlanDate',
            editable: true,
            cellEditor: 'datePicker'
        },
        {
            headerName: '출하예정일',
            field: 'scheduledEndDate',
            editable: true,
            cellEditor: 'datePicker'
        },
        { headerName: '납기일', field: 'dueDateOfContract' }, //o
        { headerName: '거래처코드', field: 'customerCode', hide: true }, //o
        { headerName: '품목코드', field: 'itemCode', hide: true }, //o
        { headerName: '품목명', field: 'itemName' }, //o
        { headerName: '단위', field: 'unitOfContract', hide: true }, //o
        { headerName: '비고', field: 'description', editable: true, hide: true } //o
    ]
};
export default contractlistcolumn;
