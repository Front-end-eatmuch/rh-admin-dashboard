import React, { Component } from "react";
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  Row,
  Col,
  Dropdown,
  Menu,
  Table,
  Input,
  Space,
  Spin
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  setting,
  get_all_setting,
  update_setting,
  delete_setting
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { decryptSingleData } from "../functions/cryptojs";

import Setting_trans_online_new from "../forms/setting_trans_user_new";
import Setting_trans_online_edit from "../forms/setting_trans_online_edit";

const token = sessionStorage.getItem("auth_token");

class CountryTransactionUser extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: [],
    overall: true,
    allowed: false,
    blocked: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: setting + "/" + get_all_setting,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data.message}`);
    });
    this.setState({
      load: false,
      data: decryptSingleData(response.data.setting)
    });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleStatus = async (id, status) => {
    const data = {
      status: status
    };
    const request_details = {
      type: UPDATE,
      url: service_api,
      route: setting + "/" + update_setting + "/" + id,
      data: data,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    return setTimeout(() => window.location.reload(), 1000);
  };

  handleDelete = async (id) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: setting + "/" + delete_setting + "/" + id,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });

    return setTimeout(() => window.location.reload(), 1000);
  };

  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "_id",
        // width: "20%",
        ...this.getColumnSearchProps("_id"),
        fixed: "left"
      },
      {
        title: "Code Pays",
        dataIndex: "country_code",
        // width: "20%",
        ...this.getColumnSearchProps("name")
        // fixed: "left",
      },
      {
        title: "Monnaie",
        dataIndex: "currency",
        // width: "20%",
        // ...this.getColumnSearchProps("fee"),
        // fixed: "left",
        render: (text, record) => (
          <Tag color="blue">
            <b>Code: {record?.currency_code}</b>
            <br />
            <b>Symbol: {record?.currency_symbol}</b>
            <br />
            <b>Nom: {record?.currency_name}</b>
            <br />
            <b>
              Value/$: {record?.currency_rate + " " + record?.currency_name}
            </b>
            <br />
          </Tag>
        )
      },
      {
        title: "Système frais",
        dataIndex: "fee",
        // width: "20%",
        // fixed: "left",
        render: (text, record) => (
          <Tag color="red">
            <b>Maximum Porte-feuille: {record?.max_wallet}</b> <br />
            <b>Maximum Cumule: {record?.max_cumulated}</b> <br />
            <b>Maximum Free Payment: {record?.max_free_payment}</b> <br />
            <b>Frais payment: {record?.payment_fee}</b>
            <br />
            <b>Payment minimal: {record?.min_payment}</b> <br />
            <b>Payment maximal: {record?.max_payment}</b> <br />
          </Tag>
        )
      },
      // {
      //   title: "Informations",
      //   dataIndex: "general",
      //   // width: "20%",
      //   // fixed: "left",
      //   render: (text, record) => (
      //     <Tag color="green">
      //       <b>Contact: {text?.contact_us}</b>
      //     </Tag>
      //   )
      // },
      // {
      //   title: "Service(s)",
      //   dataIndex: "service_id",
      //   render: (text) => (
      //     <Tag color="green" key="document">
      //       {text.map((item, i) => (
      //         <div>
      //           <img
      //             src={item?.logo}
      //             style={{
      //               width: 40,
      //               height: 40,
      //               objectFit: "contain"
      //             }}
      //           />
      //           <br />
      //           {item.status ? "( Actif )" : ""}
      //           <hr />
      //           <br />
      //         </div>
      //       ))}
      //     </Tag>
      //   )
      // },
      {
        title: "Actions",
        fixed: "right",
        render: (text, record) => (
          <div>
            <Dropdown
              overlay={MenuButton(record)}
              placement="bottomCenter"
              arrow
            >
              <Button>Options</Button>
            </Dropdown>
          </div>
        )
      }
    ];

    const { selectedRowKeys, allowed, blocked, overall } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          }
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          }
        }
      ]
    };

    const MenuButton = (record) => (
      <Menu>
        <Menu.Item>
          <Setting_trans_online_edit row={record} />
        </Menu.Item>
        {/* {record.status === true ? (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, 0)}>
              Desactiver
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, 1)}>
              Activer
            </Link>
          </Menu.Item>
        )} */}
        <Menu.Item>
          <Link onClick={() => this.handleDelete(record._id)}>Supprimé</Link>
        </Menu.Item>
      </Menu>
    );

    const { load, data } = this.state;
    return (
      <>
        <PageHeader
          onBack={() => {
            //  window.history.back()
          }}
          title="User Transaction setting"
          tags={<Tag color="blue">Liste des configurations</Tag>}
          subTitle="user"
          extra={[<Setting_trans_online_new />]}
        >
          <Row>
            <Statistic title="Total" value={data.length} style={{}} />
            {/* 
            <Statistic
              title="Inactif"
              value={data.filter((item) => item.status === false).length}
              style={{
                margin: "0 32px"
              }}
            />
            <Statistic
              title="Actif"
              value={data.filter((item) => item.status === true).length}
            /> */}
          </Row>
          <Row>
            {load ? (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            ) : (
              <Col span={24}>
                <Table
                  // rowSelection={rowSelection}
                  // size="small"
                  columns={columns}
                  dataSource={data}
                />
              </Col>
            )}
          </Row>
        </PageHeader>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin
  };
};

const mapDispatchStoreToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchStoreToProps
)(CountryTransactionUser);
