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
  city,
  delete_city,
  update_city,
  get_all_city
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { decryptSingleData, encryptData } from "../functions/cryptojs";
import City_edit from "../forms/city_edit";
import City_new from "../forms/city_new";

const token = sessionStorage.getItem("auth_token");

class City extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: [],
    list: [],
    selected: true,
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
      route: city + "/" + get_all_city,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });

    console.log(decryptSingleData(response.data.city));

    this.setState({
      load: false,
      data: decryptSingleData(response.data.city)
    });
  };

  handleStatus = async (id, status) => {
    const data = {
      status: status
    };
    const request_details = {
      type: UPDATE,
      url: service_api,
      route: city + "/" + update_city + "/" + id,
      data: data,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    return setTimeout(() => window.location.reload(), 1000);
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

  handleDelete = async (id) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: city + "/" + delete_city + "/" + id,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
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
        title: "Province",
        dataIndex: "province",
        // width: "20%",
        // ...this.getColumnSearchProps("se"),
        // fixed: "left",
        render: (text) => <span>{text?.province}</span>
      },
      {
        title: "Ville",
        dataIndex: "city",
        ...this.getColumnSearchProps("city"),
        render: (text) => (
          <Tag color={"purple"}>
            <span>{text}</span>
          </Tag>
        )
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (text) => (
          <Tag color={text === true ? "green" : "red"}>
            {text === true ? "Actif" : "Inactif"}
          </Tag>
        )
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
          <City_edit row={record} />
        </Menu.Item>

        <Menu.Item>
          <Link onClick={() => this.handleStatus(record._id, true)}>
            Activer
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link onClick={() => this.handleStatus(record._id, false)}>
            Desactiver
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link onClick={() => this.handleDelete(record._id)}>Supprimer</Link>
        </Menu.Item>
      </Menu>
    );

    const { load, data, selected } = this.state;
    return (
      <>
        <PageHeader
          onBack={() => {
            //  window.history.back()
          }}
          title="Ville"
          tags={<Tag color="blue">Liste des villes</Tag>}
          subTitle=""
          extra={[<City_new />]}
        >
          <Row>
            <Statistic
              title="Total"
              value={
                data?.filter((item) => {
                  return item?.status === this.state.selected;
                })?.length
              }
            />
          </Row>
          <Row>
            {[
              { text: "Inactif", status: false },
              { text: "Actif", status: true }
            ]?.map((item, index) => (
              <Button
                style={{
                  marginLeft: 10
                }}
                type={selected === item?.status ? "primary" : "default"}
                onClick={() => {
                  this.setState({ selected: item?.status });
                }}
              >
                {item?.text}
              </Button>
            ))}
          </Row>
          <Row
            style={{
              marginTop: 20
            }}
          >
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
                  dataSource={data?.filter((item) => {
                    return item?.status === this.state.selected;
                  })}
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(City);
