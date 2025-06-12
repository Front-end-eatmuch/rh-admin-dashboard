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
  Spin,
  DatePicker
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  admin,
  get_all_admin,
  // get_all_total_admin,
  update_admin,
  delete_admin
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import Admin_edit from "../forms/admin_edit";
import Admin_new from "../forms/admin_new";
import { CSVLink } from "react-csv";
import { decryptSingleData } from "../functions/cryptojs";

const { RangePicker } = DatePicker;

const token = sessionStorage.getItem("auth_token");

class AdminAdmin extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    adminTotal: 0,
    data: [],
    start: null,
    end: null
  };

  componentDidMount() {
    this.getData();
    this.getAdminTotal();
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
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
   
    this.setState({ load: false, data: decryptSingleData(response.data.admin) || [] });
  };

  getAdminTotal = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: admin + "/count-admin",
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    console.log(response.data);
    this.setState({ load: false, adminTotal: response.data.admin || 0 });
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
      id,
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
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });
    window.location.reload();
  };

  handleDelete = async (id) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: admin + "/" + delete_admin + "/" + id,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });

    return setTimeout(() => window.location.reload(), 1000);
  };

  render() {
    const columns = [
      // {
      //   title: "Id",
      //   dataIndex: "_id",
      //   ...this.getColumnSearchProps("_id"),
      //   fixed: "left"
      // },
      {
        title: "Prénom",
        dataIndex: "firstname",
        ...this.getColumnSearchProps("firstname")
      },
      {
        title: "Nom",
        dataIndex: "lastname",
        ...this.getColumnSearchProps("lastname")
      },
      {
        title: "Email",
        dataIndex: "email",
        ...this.getColumnSearchProps("email"),
        render: (text) => (
          <a href={`mailto:${text}`}>{text}</a>
        )
      },
      {
        title: "Téléphone",
        dataIndex: "phone",
        ...this.getColumnSearchProps("phone"),
        render: (text) => (
          <a href={text ? `tel:${text}` : ""}>
            {text || "Aucun téléphone"}
          </a>
        )
      },
      {
        title: "Statut",
        dataIndex: "status",
        render: (text) =>
          text === true ? (
            <Tag color={"green"} key={text}>
              Actif
            </Tag>
          ) : (
            <Tag color={"volcano"} key={text}>
              Inactif
            </Tag>
          )
      },
      {
        title: "Création",
        dataIndex: "createdAt",
        render: (text) => <Tag>{text?.slice(0, 16)}</Tag>
      },
      {
        title: "Dernière MAJ",
        dataIndex: "updatedAt",
        render: (text) => <Tag color="blue">{text?.slice(0, 16)}</Tag>
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
          <Admin_edit row={record} />
        </Menu.Item>
        {record.status === false ? (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, true)}>
              Activer
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, false)}>
              Désactiver
            </Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <Link onClick={() => this.handleDelete(record._id)}>Supprimer</Link>
        </Menu.Item>
      </Menu>
    );

    const { load, data, start, end } = this.state;
    console.log(data);
    
    return (
      <>
        <PageHeader
          onBack={() => {
            //  window.history.back()
          }}
          title="Administrateurs"
          tags={<Tag color="blue">Liste des administrateurs</Tag>}
          subTitle=""
          extra={[
            <RangePicker
              showTime
              onChange={(data) => {
                console.log(data);
                if (data === null) {
                  this.setState({
                    start: null,
                    end: null
                  });
                  return;
                }
                let d1 = data[0].format("YYYY-MM-DDTHH:mm:ss");
                let d2 = data[1].format("YYYY-MM-DDTHH:mm:ss");

                this.setState({ start: d1, end: d2 });
              }}
            />,
            <Admin_new />,
            <CSVLink data={data}>Exporter CSV/Excel</CSVLink>
          ]}
        >
          <Row>
            <Statistic
              title="Total Administrateurs"
              value={
                data?.filter((item) => {
                  if (start === null && end === null) {
                    return item;
                  }
                  return item.createdAt >= start && item.createdAt <= end;
                }).length
              }
            />
            <Statistic
              title="Actifs"
              value={data?.filter((item) => item.status === true).length}
              style={{
                margin: "0 32px"
              }}
            />
            <Statistic
              title="Inactifs"
              value={data?.filter((item) => item.status === false).length}
            />
          </Row>
          <Row>
            {load ? (
              <Space size="middle" style={{ marginTop: 20 }}>
                <Spin size="large" />
              </Space>
            ) : (
              <Col span={24} style={{ marginTop: 20 }}>
                <Table
                  // rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data.filter((item) => {
                    if (start === null && end === null) {
                      return item;
                    }
                    return item.createdAt >= start && item.createdAt <= end;
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