import React, {useRef} from 'react';
import {Button, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, PauseCircleOutlined, PoweroffOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";

const ListTickers = ({quotes, toggleTickerStatus, removeTicker}) => {
    
    
    const columns = [
        {
            title: 'Ticker',
            dataIndex: 'ticker',
            key: 'ticker',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Exchange',
            dataIndex: 'exchange',
            key: 'exchange',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Change',
            dataIndex: 'change',
            key: 'change',
        },
        {
            title: 'Change percent',
            dataIndex: 'change percent',
            key: 'change percent',
        },
        {
            title: 'Dividend',
            dataIndex: 'dividend',
            key: 'dividend',
        },
        {
            title: 'Yield',
            dataIndex: 'yield',
            key: 'yield',
        },
        {
            title: 'Last trade time',
            dataIndex: 'last trade time',
            key: 'last trade time',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        {
                            record.action
                                ? <Tooltip title="Turn off the ticker">
                                    <Button shape="circle"
                                            onClick={() => toggleTickerStatus(record.ticker, false)}
                                            icon={<PoweroffOutlined />} />
                                </Tooltip>
                                
                                : <Tooltip title="Enable ticker">
                                    <Button shape="circle"
                                            onClick={() => toggleTickerStatus(record.ticker, true)}
                                            icon={<ReloadOutlined />} />
                                </Tooltip>
                        }
                        <Tooltip title="Remove ticker">
                            <Button shape="circle"
                                    onClick={() => {removeTicker(record.ticker)}}
                                    icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Space>
                )
            },
        },
    ];
    
    const data = quotes.map((ticker, index) => (
        {
            key: index,
            ticker: ticker.ticker,
            exchange: ticker.exchange,
            price: ticker.price ? ticker.price+' '+'$' : '---',
            change: ticker.change ? ticker.change+' '+'$' : '---',
            'change percent': ticker.change_percent ? ticker.change_percent+' '+'%' : '---',
            dividend: ticker.dividend ? ticker.dividend : '---',
            yield: ticker.yield ? ticker.yield : '---',
            'last trade time': ticker.last_trade_time ? ticker.last_trade_time : '---',
            action: ticker.status,
        }
    ))
    
    return (
        <Table columns={columns} dataSource={data} quotes={quotes}
               pagination={false} sortDirections={'descend'}/>
    );
};

export default ListTickers;
