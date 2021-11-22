import './App.css';
import 'antd/dist/antd.css';
import ListTickers from "../ListTickers/ListTickers";
import IntervalInput from "../InputInterval/InputInterval";
import NewTicker from "../NewTickerForm/NewTickerForm";

function App() {
    return (
        <div>
            <ListTickers/>
            <div className="wrapper">
                <IntervalInput/>
                <NewTicker />
            </div>
        </div>
    );
}
export default App;
