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

import Admin_new from "../forms/admin_new";
import Admin_edit from "../forms/admin_edit";

import {
  admin,
  delete_admin,
  get_all_admin,
  update_admin
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import { decryptSingleData } from "../functions/cryptojs";

const token = sessionStorage.getItem("auth_token");

class AdminAdmin extends Component {
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
      route: admin + "/" + get_all_admin,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      console.log(err);
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });

    // console.log(response.data);

    this.setState({
      load: false,
      data: decryptSingleData(response?.data?.admin)
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
      route: admin + "/" + delete_admin + "/" + id,
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

  handleStatus = async (id, status) => {
    const data = {
      status: status
    };
    const request_details = {
      type: UPDATE,
      url: service_api,
      route: admin + "/" + update_admin + "/" + id,
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
        // width: "20%",
        ...this.getColumnSearchProps("_id"),
        fixed: "left"
      },
      {
        title: "Nom",
        dataIndex: "firstname",
        // width: "20%",
        ...this.getColumnSearchProps("firstname")
        // fixed: "left",
      },
      {
        title: "Prénom",
        dataIndex: "lastname",
        // width: "20%",
        ...this.getColumnSearchProps("lastname")
        // fixed: "left",
      },
      {
        title: "Contact",
        dataIndex: "number",
        // width: "20%",
        ...this.getColumnSearchProps("number"),
        render: (text) => {
          return <a href={`tel:${text}`}>{text}</a>;
        }
      },
      {
        title: "Profil",
        dataIndex: "pic",
        render: (text) => {
          return (
            <a href={text} target="_blank" rel="noreferrer">
              <img
                src={text}
                style={{
                  width: 70
                }}
                alt="profil"
              />
            </a>
          );
        }
      },
      {
        title: "Role & Permission",
        dataIndex: "permission",
        // width: "20%",
        render: (text) => {
          return (
            <Tag color={"blue"} key={text.name}>
              {text.name}
            </Tag>
          );
        }
      },
      {
        title: "Actif",
        dataIndex: "status",
        render: (text) =>
          text === false ? (
            <Tag color={"volcano"} key={text}>
              NON
            </Tag>
          ) : (
            <Tag color={"green"} key={text}>
              OUI
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
          <Admin_edit row={record} />
        </Menu.Item>
        {record.status === true ? (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, false)}>
              Verrouiller
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, true)}>
              Autoriser
            </Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <Link onClick={() => this.handleDelete(record._id)}>Supprimer</Link>
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
          title="Adminstrateurs"
          tags={<Tag color="blue">Liste des admins</Tag>}
          subTitle=""
          extra={[
            <Admin_new />,
            <Button
              key="2"
              color="primary"
              onClick={() =>
                this.setState({
                  allowed: false,
                  blocked: false,
                  verified: false,
                  overall: true
                })
              }
            >
              Tout
            </Button>,
            <Button
              key="2"
              color="primary"
              onClick={() =>
                this.setState({
                  allowed: true,
                  blocked: false,
                  overall: false
                })
              }
            >
              Actif
            </Button>,
            <Button
              key="3"
              color="danger"
              onClick={() =>
                this.setState({
                  allowed: false,
                  blocked: true,
                  overall: false
                })
              }
            >
              Inactif
            </Button>
          ]}
        >
          <Row>
            <Statistic
              title="Actif"
              value={
                data.filter((res) => {
                  return res.status === 0;
                }).length
              }
            />
            <Statistic
              title="Inactif"
              value={
                data.filter((res) => {
                  return res.status === 1;
                }).length
              }
              style={{
                margin: "0 32px"
              }}
            />
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
                  dataSource={data.filter((res) => {
                    if (allowed && !blocked && !overall)
                      return res.status === 0;
                    if (!allowed && blocked && !overall)
                      return res.status === 1;

                    return res;
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(AdminAdmin);
