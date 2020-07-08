import React, { Component } from 'react';
import { mock } from '../mockService/mock.js';
import '../css/home.css';
import config from '../config/config.json';
import { dataStreamUpdateAction } from '../actions/dataStreamUpdateAction.js'
import { connect } from 'react-redux';
import { sortAction } from '../actions/sortAction.js';
import { filterAction } from '../actions/filterAction.js';
import { favAction } from '../actions/favAction.js';
import { sortdata } from '../helperFn/sortdata.js';
import { filterdata } from '../helperFn/filterdata.js';
import { favouritedata } from '../helperFn/favouritedata.js';
import { bindActionCreators } from 'redux';

class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isUniqueDataSet: false,
            uniqueAssetName: [],
            uniqueType: [],
            filterid: [],
            filterprice: [],
            filterlastUpdate: [],
        }
    }

    componentDidMount() {
        let assetData = [];
        mock.subscribe(val => {
            assetData.push(val);
            if(assetData.length === 400) {
                this.props.dataStreamUpdateAction(assetData);
                assetData = [];
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        let sorteddata = sortdata([...nextProps.data]);
        let filtereddata = filterdata([...sorteddata]);
        let favdata = favouritedata([...filtereddata]);
        if(this.state.isUniqueDataSet) {
            this.setState({
                data: [...favdata],
            });
        } else { 
            let uniqueAssetName = new Set();
            let uniqueType = new Set();
            favdata.forEach(val => {
                uniqueAssetName.add(val.assetName);
                uniqueType.add(val.type);
            });
            this.setState({
                data: [...favdata],
                uniqueAssetName: [...uniqueAssetName],
                uniqueType: [...uniqueType],
                isUniqueDataSet: true
            });
        }
    }

    componentWillUnmount() {
        mock.unsubscribe();
    }

    handleAssetNameOnChange(e) {
        this.props.filterAction("assetName", config.filterType.select, [e.target.value]);
    }

    handleTypeOnChange(e) {
        this.props.filterAction("type", config.filterType.select, [e.target.value]);
    }

    handleFilterChanges(col, type, e) {
        let val = e.target.value;
        switch(col) {
            case "id":
                let filterId = [...this.state.filterid];
                if(type === "from") {
                    filterId[0] = val;
                } else {
                    filterId[1] = val;
                }
                this.setState({filterid: filterId}, function(){
                    this.generateFilterAction(col, config.filterType.range);
                })
                break;
            case "price":
                let filterPrice = [...this.state.filterprice];
                if(type == "from") {
                    filterPrice[0] = val;
                } else {
                    filterPrice[1] = val;  
                }
                this.setState({filterprice: filterPrice}, function(){
                    this.generateFilterAction(col, config.filterType.range);
                })
                break;
            case "lastUpdate":
                let filterLastupdate = [...this.state.filterlastUpdate];
                if(type === "from") {
                    filterLastupdate[0] = val;
                } else {
                    filterLastupdate[1] = val;
                }
                this.setState({filterlastUpdate: filterLastupdate}, function(){
                    this.generateFilterAction(col, config.filterType.range);
                })
                break;
        }
    }

    generateFilterAction(col, type) {
        this.props.filterAction(col, type, this.state["filter"+col]);
    }

    handleCheckboxChanges(id, e) {
        if(e.target.checked) {
            this.props.favAction(id, config.favAction.add);
        } else {
            this.props.favAction(id, config.favAction.remove);
        }
    }
    
    render() {
        return (
            <div>
                <h3>{config.applicationName}</h3>
            <div className="wrapper">
                <div className="table">
                    <tr>
                        <th>
                            <div className="columnName" onClick={ () => this.props.sortAction("id")}>
                                {config.columnNames.id}
                            </div>
                            <div className="columnName">
                                <input 
                                    type="number"
                                    onChange={(e) => this.handleFilterChanges("id", "from", e)} placeholder="from"
                                />
                                <input 
                                    type="number" 
                                    onChange={(e) => this.handleFilterChanges("id", "to", e)} placeholder="to"
                                />
                            </div>
                        </th>
                        <th>
                            <div className="columnName" onClick={ () => this.props.sortAction("assetName")}>
                                {config.columnNames.assetName}
                            </div>
                            <div className="columnName">
                                <select onChange={this.handleAssetNameOnChange.bind(this)}>
                                    <option value="None" >Select...</option>
                                    {
                                        this.state.uniqueAssetName.map((val) => {
                                            return (
                                                <option key={val.id} value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </th>
                        <th>
                            <div className="columnName" onClick={ () => this.props.sortAction("price")}>
                                {config.columnNames.price}
                            </div>
                            <div className="columnName">
                                <input
                                    type="number"
                                    onChange={(e) => this.handleFilterChanges("price", "from", e)} placeholder="from"
                                />
                                <input 
                                    type="number"
                                    onChange={(e) => this.handleFilterChanges("price", "to", e)} placeholder="to"
                                />
                            </div>
                        </th>
                        <th>
                            <div className="columnName" onClick={ () => this.props.sortAction("lastUpdate")}>
                                {config.columnNames.lastUpdate}
                            </div>
                            <div className="columnName">
                                <input 
                                    type="number"
                                    onChange={(e) => this.handleFilterChanges("lastUpdate", "from", e)} placeholder="from"
                                />
                                <input 
                                    type="number" 
                                    onChange={(e) => this.handleFilterChanges("lastUpdate", "to", e)} placeholder="to"
                                />
                            </div>
                        </th>
                        <th>
                            <div className="columnName" onClick={ () => this.props.sortAction("type")}>
                                {config.columnNames.assetType}
                            </div>
                            <div className="columnName">
                                <select onChange={this.handleTypeOnChange.bind(this)}>
                                    <option value="None">Select...</option>
                                    {
                                        this.state.uniqueType.map((val) => {
                                            return (
                                                <option key={val.id} value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </th>
                        <th>
                            <div>
                                {config.columnNames.favourites}
                            </div>
                            <div></div>
                        </th>
                    </tr>
                    {this.state.data.map((val) => {
                        if(val!=undefined){
                            return (
                                <tr>
                                    <td>
                                        {val.id}
                                    </td>
                                    <td>
                                        {val.assetName}
                                    </td>
                                    <td>
                                        {val.price}
                                    </td>
                                    <td>
                                        {val.lastUpdate}
                                    </td>
                                    <td>
                                        {val.type}
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={val.check}
                                            onChange={(e) => this.handleCheckboxChanges(val.id, e)}
                                        />
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </div>
            </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({dataStreamUpdateAction,sortAction,filterAction,favAction}, dispatch)
    };
}

function mapStateToProps(state){
    return {
        data : state.dataStreamUpdate.data
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(home);