import {Button, Divider, Input, Tooltip} from "antd";
import Text from "antd/es/typography/Text";
import {FieldBinaryOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {useState} from "react";
import {setFetchInterval} from "../Services/setFetchInterval";

const IntervalInput = () => {
    const [newFetchInterval, setNewFetchInterval] = useState('');
    
    const onSetFetchInterval = () => {
        setFetchInterval(newFetchInterval)
        setNewFetchInterval('');
    }
    
    return (
        <div className='intervalInput'>
            <Divider>
                <Text type="secondary">Enter the number of seconds after which tickers should be updated</Text>
            </Divider>
            <Input
                placeholder="Enter the number of seconds"
                prefix={<FieldBinaryOutlined />}
                onChange={(e) => {
                    setNewFetchInterval(e.target.value)
                    console.log(newFetchInterval)
                }}
                value={newFetchInterval}
                type="number"
                suffix={
                    <Tooltip title="Enter the number of seconds after which tickers should be updated">
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
            />
            <Button onClick={onSetFetchInterval} type="primary" disabled={newFetchInterval === ''}>
                Set new interval
            </Button>
        </div>
    );
};

export default IntervalInput;