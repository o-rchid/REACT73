import React, { useEffect, useState } from 'react';
import MyGrid from 'util/LogiUtil/MyGrid';
import mrpListColumn from './MRPColumn';
import UseStyles from './UseStyles';
import { TextField, Button } from '@material-ui/core';
import useInput from 'util/useInput';
import { today } from 'erp/hr/util/lib';

const MrpDialog = ({}) => {
    return (
        <>
            <MyGrid>
                <div id="grid-wrapper">
                    <TextField />
                    <Button>전개 결과 MRP등록</Button>
                </div>
            </MyGrid>
        </>
    );
};

export default MrpDialog;
