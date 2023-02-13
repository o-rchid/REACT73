import axios from 'axios';
import Swal from 'sweetalert2';

export const searchContractDetailInMpsAvailable = (setContractList, calendarDate) => {
    axios
        .get('http://localhost:9102/production/mps/contractdetail-available', {
            params: {
                startDate: calendarDate.startDate,
                endDate: calendarDate.endDate,
                searchCondition: 'contractDate'
            }
        })
        .then(({ data }) => {
            if (data.errorCode < 0) {
                Swal.fire({
                    icon: data.errorCode < 0 ? 'error' : 'success',
                    title: data.errorMsg
                });
            }
            setContractList(data.gridRowJson);
        })
        .catch((e) => {
            Swal.fire({
                icon: 'error',
                title: e
            });
        });
};
export const convertContractDetailToMps = (newMps) => {
    console.log('convertContractDetailToMps 실행');
    console.log(newMps);
    axios
        .post('http://localhost:9102/production/mps/contractdetail', newMps)
        .then(({ data }) => {
            Swal.fire({
                icon: data.errorCode < 0 ? 'error' : 'success',
                title: data.errorMsg
            });
        })
        .catch((e) => {
            Swal.fire({
                icon: 'error',
                title: e
            });
        });
};

export const searchMpsInfo = (setMpsList, calendarDate) => {
    axios
        .get('http://localhost:9102/production/mps/list', {
            params: {
                startDate: calendarDate.startDate,
                endDate: calendarDate.endDate
            }
        })
        .then(({ data }) => {
            setMpsList(data.gridRowJson);
        })
        .catch((e) => {
            Swal.fire({
                icon: 'error',
                title: e
            });
        });
};
