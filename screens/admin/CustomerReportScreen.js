import React, { Component } from 'react';
import TableView from './Components/CustomerReport';
import Loader from '../../Components/loader'
import { connect } from 'react-redux';
import { getOrder } from './action';

class Dashboard extends Component {
    constructor(props) {
        super(props); {
            this.state = {
                filter: 'all',// 7 days , today tomorrow, last 30 days
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
            let { filter } = this.state;
            let model = { filter };
            this.handleFetch(model)
        } catch (error) {
            console.log(error)
        }
    }


    handleFetch = async (model) => {
        try {
            this.setState({ loading: true });
            let response = await this.props.getOrder(model);
            this.setState({ loading: false })
            if (response && response.status == 0) {
                let { data } = response;
                this.setState({ tableData: data })
            }

        } catch (error) {
            console.log(error)
            this.setState({ loading: false })
        }
    }

    fetchDataByDate = async (filter) => {
        try {
            this.setState({ loading: true });
            let model = { filter };
            let response = await this.props.getOrder(model);
            this.setState({ loading: false })
            if (response && response.status == 0) {
                let { data } = response;
                this.setState({ tableData: data })
            }

        } catch (error) {
            console.log(error)
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
                <TableView
                    data={tableData}
                    fetchDataByDate={this.fetchDataByDate}
                />
                {this.renderLoading()}
            </>

        )
    }
};



export default connect(null, { getOrder })(Dashboard);


