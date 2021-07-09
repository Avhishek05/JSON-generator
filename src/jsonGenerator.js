import React, { useState } from "react";
import "./App.scss"
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ReactJson from 'react-json-view'

const dataTypes = [
    'string',
    'float',
    'number',
    'boolean',
    'date',
]
const data = [
    {
        id: 1,
        field: 'name',
        len: 10,
        isSelected: true,
        dataType: 'string',
    },
    {
        id: 2,
        field: 'calories',
        len: 3,
        isSelected: true,
        dataType: 'number',
    },
    {
        id: 3,
        field: 'job',
        len: 12,
        isSelected: true,
        dataType: 'boolean',
    },
    {
        id: 4,
        field: 'protein',
        len: 4,
        isSelected: true,
        dataType: 'float',
    },
    {
        id: 5,
        field: 'createdAt',
        len: 4,
        isSelected: true,
        dataType: 'date',
    },
]

export const JSONGeneratorComponent = () => {
    const [noOfObj, setNoOfObj] = useState(10)
    const [configObj, setConfigObj] = useState(data)
    const [output, setOutput] = useState([]);


    const onFieldChange = (oId, type, value) => {
        let index = configObj.findIndex(i => i.id === oId)
        let dd = configObj[index];
        dd[type] = value;
        configObj[index] = dd;
        setConfigObj([...configObj]);
    }

    const getRandomObj = (arr) => {
        const getRandomStr = (len) => {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let charactersLength = characters.length;
            for (let i = 0; i < len; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        const getRandomBoolean = () => {
            let randNum = Math.floor(Math.random() * 4)
            return randNum % 2 === 0;
        }
        const getRandomNumber = (length) => {
            return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
        }
        const getRandomFloat = (length) => {
            return (Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toFixed(2);
        }
        const getRandomDate = (start) => {
            return new Date(start.getTime() + Math.random() * (new Date().getTime() - start.getTime()));
        }

        let obj = {};
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].dataType === 'boolean') {
                obj[arr[j].field] = getRandomBoolean();
            }
            if (arr[j].dataType === 'string') {
                obj[arr[j].field] = getRandomStr(arr[j].len);
            }
            if (arr[j].dataType === 'number') {
                obj[arr[j].field] = getRandomNumber(arr[j].len);
            }
            if (arr[j].dataType === 'float') {
                obj[arr[j].field] = getRandomFloat(arr[j].len);
            }
            if (arr[j].dataType === 'date') {
                obj[arr[j].field] = getRandomDate(new Date(2010, 0, 1)).toISOString();
            }
        }
        return obj;
    }

    const generate = (isDownload, showDemo) => {
        let arr = [];
        let selectedObjects = configObj.filter(i => i.isSelected && i.field.length > 0)
        for (let i = 0; i < noOfObj; i++) {
            let obj;
            obj = getRandomObj(selectedObjects)
            arr.push(obj)
        }
        console.log(arr);
        setOutput(arr[0]);
        if (isDownload) {
           
        } else if(!showDemo) {
            let myJson = JSON.stringify(arr, null, 2);
            let x = window.open();
            x.document.open();
            x.document.write('<html><body><pre>' + myJson + '</pre></body></html>');
            x.document.close();
        }
    }

    const addNew = () => {
        let _configObj = configObj;
        _configObj.push({
            id: configObj.length + 1,
            field: configObj[0].field + '_1',
            len: 4,
            isSelected: true,
            dataType: 'string',
        })
        setConfigObj([..._configObj]);
    }

    return (
        <div>
            <div style={{ marginBottom: 50, }}>
                <button className={'btn'} style={{ width: 200, background: 'linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)',color:'#fff' }}>JSON Generator
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <span style={{ fontSize: 22 }}>Step 1</span>
                    <Grid container spacing={2} style={{ marginTop: 20 }}>
                        <Grid item xs={2}>Selected</Grid>
                        <Grid item xs={4}>Field</Grid>
                        <Grid item xs={2}>Length</Grid>
                        <Grid item xs={4}>Type</Grid>
                    </Grid>
                    <div style={{ height: '50vh', overflowY: 'auto', overflowX: 'hidden' }}>
                        {
                            configObj.map((item, index) => {
                                return (
                                    <Grid key={index} container spacing={2}>
                                        <Grid item xs={2}><Checkbox
                                            onChange={(e) => onFieldChange(item.id, 'isSelected', e.target.checked)}
                                            checked={item.isSelected} /></Grid>
                                        <Grid item xs={4}><Input
                                            onChange={(e) => onFieldChange(item.id, 'field', e.target.value)}
                                            value={item.field} /></Grid>
                                        <Grid item xs={2}>
                                            {
                                                (item.dataType !== 'boolean' && item.dataType !== 'date') &&
                                                <Input value={item.len}
                                                    onChange={(e) => onFieldChange(item.id, 'len', e.target.value)} />
                                            }
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={item.dataType}
                                                onChange={(e) =>
                                                    onFieldChange(item.id, 'dataType', e.target.value)}
                                            >
                                                <MenuItem value={'string'}>String</MenuItem>
                                                <MenuItem value={'number'}>Integer</MenuItem>
                                                <MenuItem value={'boolean'}>Boolean</MenuItem>
                                                <MenuItem value={'float'}>Float</MenuItem>
                                                <MenuItem value={'date'}>Date</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                        <Grid container spacing={2} style={{ marginTop: 20 }}>
                            <Grid item xs={2} onClick={addNew}><AddCircleOutlineIcon /></Grid>
                        </Grid>
                    </div>
                </div>
                <div style={{ height: '55vh', width: 2, background: 'white', margin: 20 }}>

                </div>
                <div>
                    <span style={{ fontSize: 22 }}>Step 2</span>
                    <div style={{ marginTop: 20, }}>
                        <span>No of Object in JSON</span>
                        <Input style={{ width: 35, marginLeft: 25 }} value={noOfObj}
                            onChange={e => e.target.value < 501 ? setNoOfObj(e.target.value) : {}} />
                        <span>(max 500)</span>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <button className={'btn'} style={{ width: 200 }} onClick={()=>generate(false, true)}>Show Demo
                        </button>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <button className={'btn'} style={{ width: 200 }} onClick={generate}>Generate
                        </button>
                    </div>
                    {/* <div style={{ marginTop: 20 }}>
                        <button className={'btn'} style={{ width: 200 }} onClick={() => generate(true)}>Generate & Download
                        </button>
                    </div> */}
                </div>
                <div style={{ height: '55vh', width: 2, background: 'white', margin: 20 }}>
                </div>
                <div>
                    <span style={{ fontSize: 22 }}>Output (click on Show demo to see your first object)</span>
                    <div style={{ marginTop: 20, }}>
                        <ReactJson displayDataTypes={false} name={`Object1`} src={output} />
                    </div>
                </div>
            </div>
        </div>
    )
}
