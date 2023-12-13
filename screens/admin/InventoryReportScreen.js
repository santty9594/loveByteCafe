import React, { Component } from 'react';
import TableView from './Components/InventoryReport';
import Loader from '../../Components/loader'
import { connect } from 'react-redux';
import { getInventory } from './action';

class Dashboard extends Component {
    constructor(props) {
        super(props); {
            this.state = {
                view: 'All',// 7 days , today tomorrow, last 30 days
                skip: 0,
                limit: 100,
                loading: true,
                tableData: [],
            }
        }
    }

    componentDidMount() {
        this.iniState();
    }

    iniState() {
        try {
            let { view, limit, skip } = this.state;
            let model = { view, limit, skip };
            this.handleFetch(model)
        } catch (error) {
            console.log("error",error)
        }
    }


    handleFetch = async (model) => {
        try {
            this.setState({ loading: true });
            let response = await this.props.getInventory(model);
            this.setState({ loading: false })
            if (response && response.status == 0) {
                let { data } = response;
                this.setState({ tableData: data })
            }

        } catch (error) {
            console.log("error", error)
            this.setState({ loading: false })
        }
    }

    handleCardClick = (screenName) => {
        this.props.navigation.navigate(screenName)
    }


    renderLoading = () => {
        let { loading } = this.state;
        return loading && <Loader isLoading={loading} />
    }

    render() {
        let { tableData } = this.state;
        return (
            <>
                <TableView data={tableData} />
                {this.renderLoading()}
            </>

        )
    }
};



export default connect(null, { getInventory })(Dashboard);


