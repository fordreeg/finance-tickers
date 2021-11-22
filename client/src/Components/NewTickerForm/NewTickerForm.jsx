import {Alert, Button, Divider, Input} from "antd";
import Text from "antd/es/typography/Text";
import {useState} from "react";
import {addNewTicker} from "../Services/addNewTicker";

const NewTicker = () => {
    const [nameTicker, setNameTicker] = useState('');
    const [exchange, setExchange] = useState('');
    const [error, setError] = useState(null);
    
    const onAddNewTicker = () => {
        addNewTicker(nameTicker, exchange, setError)
        setNameTicker('');
        setExchange('');
    }
    return (
        <div>
            <Divider>
                <Text type="secondary">Add new ticker</Text>
            </Divider>
            <Input
                placeholder="Ticker name"
                onChange={(e) => {
                    setNameTicker(e.target.value)
                }}
                value={nameTicker}
                type="text"
            />
            <Input
                placeholder="Exchange"
                onChange={(e) => {
                    setExchange(e.target.value)
                }}
                value={exchange}
                type="text"
            />
            <Button onClick={onAddNewTicker} type="primary" disabled={exchange === '' || nameTicker === ''}>
                Add new ticker
            </Button>
            {error && <span><Alert message={error} type="error" /></span>}
        </div>
    )
}

export default NewTicker;