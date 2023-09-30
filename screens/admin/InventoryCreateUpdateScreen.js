import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../Components/loader';
import UpdateInventoryForm from './Components/UpdateInventoryForm';
import { getInventory, createInventory, updateInventory,deleteInventory } from './action';

class InventoryCreateUpdate extends Component {
  state = {
    initialMode: 0,
    loading: false,
    inventories: [],
  };

  componentDidMount() {
    this.initState();
  }

  initState = async () => {
    try {
      this.setState({ loading: true });
      const response = await this.props.getInventory()
      if (response.status === 0) {
        this.setState({ inventories: response.data });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.error("error", error);
    }
  };

  handleFetchMenu = async () => {
    try {
      this.setState({ loading: true });
      const response = await this.props.getInventory();
      if (response.status === 0) {
        this.setState({ inventories: response.data });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.error("error", error);
    }
  }

  handleCreateMenu = async (data) => {
    try {
      this.setState({ loading: true });
      let respone = await this.props.createInventory(data);
      if (respone && respone.status == 0) {
        this.handleFetchMenu();
      }
      alert(respone.message)
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log("error", error)
    }
  };

  handleUpdateMenu = async (data) => {
    try {
      this.setState({ loading: true });
      let model = { ...data, price: parseInt(data.price) };
      let respone = await this.props.updateInventory(model);
      if (respone && respone.status == 0) {
        this.handleFetchMenu();
      }
      alert(respone.message)
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log("error", error);
    }
  };

  handleDeleteMenu = async (data) => {
    try {
      this.setState({ loading: true });
      let respone = await this.props.deleteInventory(data);
      if (respone && respone.status == 0) {
        this.handleFetchMenu();
      }
      alert(respone.message)
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log("error", error)
    }
  };

  handleCardClick = (screenName) => {
    this.props.navigation.navigate(screenName);
  };

  render() {
    const { inventories, initialMode, loading } = this.state;
    return (
      <>
        <UpdateInventoryForm
          inventories={inventories}
          handleCreate={this.handleCreateMenu}
          handleUpdate={this.handleUpdateMenu}
          handleDelete={this.handleDeleteMenu}
          initialMode={initialMode}
        />
        {loading && <Loader isLoading={loading} />}
      </>
    );
  }
  
}

const mapDispatchToProps = {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory
};

export default connect(null, mapDispatchToProps)(InventoryCreateUpdate);