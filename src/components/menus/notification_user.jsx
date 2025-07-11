import React, { Component } from "react";
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  Descriptions,
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

import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import {
  notification,
  delete_notification,
  get_all_notifications,
  update_notification
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";

import Push_new from "../forms/push_new";
import Send_push from "../forms/send_push";
import { decryptSingleData } from "../functions/cryptojs";
const token = sessionStorage.getItem("auth_token");

class NotificationBetweenUsers extends Component {
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
      route: notification + "/" + get_all_notifications,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details)
      .then((res) => {
        const data = decryptSingleData(res.data.data);
        this.setState({
          load: false,
          data: data.notifications
        });
      })
      .catch((err) => {
        this.setState({ load: false });
        console.log(err);
        return openNotificationWithIcon("error", `${err}`);
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

  handleDelete = async (id) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: notification + "/" + delete_notification + "/" + id,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });

    return setTimeout(() => window.location.reload(), 1000);
  };

  handleStatus = async (id, status) => {
    const data = {
      status: status
    };
    const request_details = {
      type: UPDATE,
      url: service_api,
      route: notification + "/" + update_notification + "/" + id,
      data: data,
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
        ...this.getColumnSearchProps("_id"),
        fixed: "left"
      },
      {
        title: "Message",
        dataIndex: "message",
        ...this.getColumnSearchProps("message"),
        render: (text) => {
          return (
            <Tag color={"blue"} key={text}>
              {text}
            </Tag>
          );
        }
      },
      {
        title: "Lien",
        dataIndex: "link",
        ...this.getColumnSearchProps("link"),
        render: (text) => text ? (
          <Tag color={"green"} key={text}>
            {text}
          </Tag>
        ) : (
          <Tag color={"orange"}>Aucun lien</Tag>
        )
      },
      {
        title: "Lu",
        dataIndex: "read",
        render: (read) => (
          <Tag color={read ? "green" : "red"}>
            {read ? "Oui" : "Non"}
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
    const { selectedRowKeys } = this.state;
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
          <Send_push row={record} />
        </Menu.Item>
        <Menu.Item>
          <Link onClick={() => this.handleDelete(record._id)}>Supprimer</Link>
        </Menu.Item>
      </Menu>
    );

    const { load, data, allowed, blocked, verified, overall } = this.state;

    return (
      <>
        <PageHeader
          onBack={() => {
            //  window.history.back()
          }}
          title="Notifications"
          tags={<Tag color="blue">Liste des Notifications utilisateurs</Tag>}
          subTitle=""
          // extra={[<Push_new />]}
        >
          <Row>
            <Statistic title="Total" value={data.length} />
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
)(NotificationBetweenUsers);
