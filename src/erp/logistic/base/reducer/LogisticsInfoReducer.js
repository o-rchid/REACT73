import * as types from 'erp/logistic/base/action/LogisticsInfoActionType';

const initialState = {  //초기값
    codeList: [],
    detailCodeList: [],
    warehouseList: [],
    itemList:[],
    itemInfoDetail:[],
    warehouseDetail:[]
};

const logisticsinfo = (state = initialState, action) => {
    console.log("ㅅㅁㄴㅅㅅㅁㅅㅁㅅㅁㅅㅁㅅㅁㅅㅁ"+JSON.stringify(action));
    console.log("ㅅㅁㄴㅅㅅㅁㅅㅁㅅㅁㅅㅁㅅㅁㅅㅁ"+action.type);
    switch (action.type) {

        case types.SEARCH_ITEM_LIST:
            return {
                ...state
            };

        case types.SEARCH_ITEM_SUCCESS:
            console.log('@@@@@@@@아이템리스트성공했니????',action.payload.gridRowJson);
        return{
            ...state,
            itemList: action.payload.gridRowJson
        };


        case types.SAVE_DEAIL_CODE_LIST_SUCCESS:
            console.log('action은???',action);
            return;

        case types.CODE_LIST:  //맨처음 화면 바꼈을때 세팅 되는것. saga에서 액션객체와 data를 받아옴.
            if (action.mode === 'search') {
                let detailList = [];
                action.data.codeList.map(ele => { //ele=codeList=LogiCodeTO
                    //codeList에는 = LogiCodeTO - divisionCodeNo, codeType, divisionCodeName, codeChangeAva~, description,
                    //ArrayList<LogiCodeDetailTO> codeDetailTOList - 각각의 divisionCodeNo에 대한 detail {detail_code, detail_code_name} 이 들어가 있다. 
                    detailList = [...detailList, ele.codeDetailTOList];
                    return ele; //return ele=codeDetailTOList - 각각의 divisionCodeNo에 대한 detail {detail_code, detail_code_name}
                });
                return {
                    ...state,
                    codeList: action.data.codeList, //codeList, codeDetailTOList
                    detailCodeList: detailList //codEdtailTOList
                };
            } else if (action.mode === 'add') {
                let newList = [...state.codeList, action.codeTo]; //[]
                return {
                    ...state,
                    codeList: newList
                };
            } else if (action.mode === 'update') {
                let newList = state.codeList.map(ele => {
                    if (action.divisionCodeNo === ele.divisionCodeNo) {
                        ele.status = 'UPDATE';
                    }
                    return ele;
                });
                return {
                    ...state,
                    codeList: newList
                };
            } else if (action.mode === 'delete') {
                let newList = action.newList; //[]
                return {
                    ...state,
                    codeList: newList
                };
            } else if (action.mode === 'save') {
                console.log('action.codeList', action.codeList);
                if (action.codeList !== undefined) {
                    return {
                        ...state,
                        codeList: action.codeList
                    };
                }
                return {
                    ...state
                };
            }
        /* falls through */
        case types.DETAIL_CODE_LIST:
            //console.log('add접근');
            //console.log(action);
            let newList = state.detailCodeList.map(ele => {
                if (ele[0].divisionCodeNo === action.detailCodeTo.divisionCodeNo) {
                    ele.push(action.detailCodeTo);
                }
                return ele;
            });
            //console.log(newList)
            return {
                ...state,
                detailCodeList: newList
            };

        //내가 함 만들어보는거 코드상세
        case types.CODE_DETAIL_LIST:
            return {
                ...state
            };

        case types.CODE_DETAIL_LIST_SUCCESS:
            console.log('코드상세 성공했나???')
            console.log(action.payload.codeList)
            return {
                ...state,
                detailCodeList : action.payload.codeList
            };

        
        //품목상세
        case types.SEACRCH_ITEM_DETAIL_LIST:
            return {...state}
        
            case types.SEACRCH_ITEM_DETAIL_LIST_SUCCESS:
            console.log('나와조 젭알~~~',action.payload.gridRowJson);
            return {
                    ...state,
                    itemInfoDetail : action.payload.gridRowJson
            }
        
        //자재조회
        case types.WAREHOUSE_DETAIL : 
            return {
                ...state
            };
    
        case types.WAREHOUSE_DETAIL_SUCCESS :
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@자재조회~~~~~~~~~", action.payload.gridRowJson);
            return {
                ...state,
                    warehouseDetail : action.payload.gridRowJson
            };
        

        case types.SEARCH_WAREHOUSE_LIST:
            return {
                ...state
            };
        case types.SEARCH_WAREHOUSE_SUCCESS:
            console.log(action.payload.gridRowJson)
            return {
                ...state,
                warehouseList: action.payload.gridRowJson
            };
        case types.SEARCH_WAREHOUSE_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };
        /* falls through */
        case types.WAREHOUSE_LIST:
            if (action.mode === 'add') {
                //console.log("추가?", action.warehouseTo);
                let newList = [...state.warehouseList, action.warehouseTo];
                return {
                    ...state,
                    warehouseList: newList
                };
            } else if (action.mode === 'del') {
                let newList = action.warehouseTo;
                return {
                    ...state,
                    warehouseList: newList
                };
            } else if (action.mode === 'update') {
                let newList = action.warehouseTo;
                return {
                    ...state,
                    warehouseList: newList
                };
            };

        /* falls through */
        default:
            return state;
    }
};

export default logisticsinfo;
