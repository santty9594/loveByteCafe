import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../Components/loader';
import UpdateMenuForm from './Components/UpdateMenuForm';
import { getMenuItems, getMenuCategory, createMenu, updateMenu, deleteMenu } from './action';

class MenuCreateUpdate extends Component {
  state = {
    initialMode: 0,
    loading: false,
    menuCategories: [],
    menus: [],
  };

  componentDidMount() {
    this.initState();
  }

  initState = async () => {
    try {
      this.setState({ loading: true });
      const [menusResponse, categoriesResponse] = await Promise.all([
        this.props.getMenuItems(),
        this.props.getMenuCategory(),
      ]);

      if (menusResponse.status === 0) {
        this.setState({ menus: menusResponse.data });
      }

      if (categoriesResponse.status === 0) {
        this.setState({ menuCategories: categoriesResponse.data });
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
      const menusResponse = await this.props.getMenuItems();
      if (menusResponse.status === 0) {
        this.setState({ menus: menusResponse.data });
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
      let respone = await this.props.createMenu(data);
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
      let respone = await this.props.updateMenu(model);
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
      let respone = await this.props.deleteMenu(data);
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
    const { menus, menuCategories, initialMode, loading } = this.state;
    return (
      <>
        <UpdateMenuForm
          menus={menus}
          menuCategories={menuCategories}
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
  getMenuItems,
  getMenuCategory,
  createMenu,
  updateMenu,
  deleteMenu
};

export default connect(null, mapDispatchToProps)(MenuCreateUpdate);