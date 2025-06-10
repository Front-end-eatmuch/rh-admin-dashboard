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
  country,
  get_all_country,
  update_country,
  delete_country
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Country_new from "../forms/country_new";
import Country_edit from "../forms/country_edit";
import { decryptSingleData } from "../functions/cryptojs";

const token = sessionStorage.getItem("auth_token");

class CountryCountry extends Component {
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
      route: country + "/" + get_all_country,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      console.log(err.response.data);
      return openNotificationWithIcon("error", `${err.response.data.message}`);
    });
    this.setState({
      load: false,
      data: decryptSingleData(response.data.country)
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
      route: country + "/" + update_country + "/" + id,
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
      route: country + "/" + delete_country + "/" + id,
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
        title: "Pays",
        dataIndex: "country",
        // width: "20%",
        // ...this.getColumnSearchProps("name")
        // fixed: "left",
        render: (text) => (
          <Tag color="blue">
            <b>{text?.country_name}</b>
          </Tag>
        )
      },
      {
        title: "Code",
        dataIndex: "country",
        // width: "20%",
        // ...this.getColumnSearchProps("code"),
        // fixed: "left",
        render: (text) => (
          <Tag color="blue">
            <b>{text?.country_code}</b>
          </Tag>
        )
      },
      {
        title: "Drapeau",
        dataIndex: "country",
        // fixed: "left",
        render: (text) => (
          <img
            src={text.flag}
            style={{
              width: 40,
              height: 25
            }}
          />
        )
      },
      {
        title: "Logo Pani",
        dataIndex: "general",
        // fixed: "left",
        // render: (text) => (
        //   <img
        //     src={text.logo}
        //     style={{
        //       width: 40,
        //       height: 40
        //     }}
        //   />
        // )
      },
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
      //               width: 25,
      //               height: 25
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
        title: "Actif",
        dataIndex: "status",
        ...this.getColumnSearchProps("status"),
        render: (text) =>
          text === true ? (
            <Tag color={"green"} key={text}>
              OUI
            </Tag>
          ) : (
            <Tag color={"volcano"} key={text}>
              NON
            </Tag>
          )
      },
      {
        title: "Création",
        dataIndex: "createdAt",
        render: (text) => <Tag>{text?.slice(0, 16)}</Tag>
      },
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
          <Country_edit row={record} />
        </Menu.Item>
        {record.status === true ? (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, false)}>
              Desactiver
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, true)}>
              Activer
            </Link>
          </Menu.Item>
        )}
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
          title="Pays"
          tags={<Tag color="blue">Liste des pays</Tag>}
          subTitle=""
          extra={[
            // <Driver_country_new />
            <Country_new />
          ]}
        >
          <Row>
            <Statistic title="Total" value={data.length} style={{}} />

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
            />
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
)(CountryCountry);
