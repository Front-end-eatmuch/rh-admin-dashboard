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
  category,
  get_all_category,
  get_all_total_category,
  update_category,
  delete_category
} from "../constants/routes";
import GoogleMapReact from "google-map-react";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

// import User_new from "../forms/user_new";
import Category_edit from "../forms/category_edit";

import { CSVLink, CSVDownload } from "react-csv";
import { decryptSingleData } from "../functions/cryptojs";
import Category_new from "../forms/category_new";

const { RangePicker } = DatePicker;

const token = sessionStorage.getItem("auth_token");

class AdminCategory extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    // userTotal: 0,
    data: [],
    start: null,
    end: null,
    overall: true,
    allowed: false,
    blocked: false
  };

  componentDidMount() {
    this.getData();
    // this.getUserTotal();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: category + "/" + get_all_category,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    console.log(response.data);
    this.setState({ load: false, data: response.data.category });
  };

  // getUserTotal = async () => {
  //   const request_details = {
  //     type: GET,
  //     url: service_api,
  //     route: category + "/" + get_all_total_category,
  //     data: null,
  //     token: token
  //   };
  //   const response = await MakeRequestAsync(request_details).catch((err) => {
  //     this.setState({ load: false });
  //     return openNotificationWithIcon("error", `${err.response.data}`);
  //   });
  //   // console.log(response.data);
  //   this.setState({ load: false, userTotal: response.data.user });
  // };

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
      route: category + "/" + "update-category" + "/" + id,
      data: data,
      token: token
    };

    console.log(request_details)
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });
    // return setTimeout(() => window.location.reload(), 1000);
  };

  handleDelete = async (id) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: category + "/" + delete_category + "/" + id,
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
        title: "Titre",
        dataIndex: "name",
        // width: "20%",
        ...this.getColumnSearchProps("name")
        // fixed: "left"
      },
      {
        title: "Relation",
        dataIndex: "relation",
        // width: "20%",
        ...this.getColumnSearchProps("relation")
        // fixed: "left"
      },
      // {
      //   title: "Email",
      //   dataIndex: "email",
      //   // width: "20%",
      //   ...this.getColumnSearchProps("email")
      //   // fixed: "left"
      // },
      // {
      //   title: "Contact",
      //   dataIndex: "phoneNumber",
      //   // width: "20%",
      //   ...this.getColumnSearchProps("phoneNumber"),
      //   // fixed: "left",
      //   render: (text) => (
      //     <a href={text === "" ? "" : `tel:${text}`}>
      //       {text === "" || !text ? "Aucun contact" : text}
      //     </a>
      //   )
      // },
      // {
      //   title: "Pays/code",
      //   dataIndex: "country_code",
      //   // width: "20%",
      //   ...this.getColumnSearchProps("country_code"),
      //   // fixed: "left",
      //   render: (text) => <Tag color="blue">{text}</Tag>
      // },
      // {
      //   title: "Informations",
      //   dataIndex: "informations",
      //   render: (text, record) => (
      //     <Tag color="yellow">
      //       <span> Dernière connexion : {record?.last_login}</span>
      //     </Tag>
      //   )
      // },
      // {
      //   title: "Photo profile",
      //   dataIndex: "pic1",
      //   render: (text) =>
      //     text === null ? (
      //       "Aucune photo"
      //     ) : (
      //       <a href={text} target="_blank" rel="noreferrer">
      //         <img
      //           alt="user profile"
      //           src={text}
      //           style={{ width: 50, height: 50, borderRadius: 5 }}
      //         />
      //       </a>
      //     )
      // },
      {
        title: "Actif",
        dataIndex: "status",
        render: (text) =>
          text === true ? (
            <Tag color={"green"} key={text}>
              Oui
            </Tag>
          ) : (
            <Tag color={"volcano"} key={text}>
              Non
            </Tag>
          )
      },
      {
        title: "Index",
        dataIndex: "indexation",
        // width: "20%",
        ...this.getColumnSearchProps("indexation")
        // fixed: "left"
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
        {/* <Menu.Item>
          <User_info_print row={record} />
        </Menu.Item> */}
        <Menu.Item>
          <Category_edit row={record} />
        </Menu.Item>
        {/* <Menu.Item>
          <User_doc row={record} />
        </Menu.Item> */}

        {record.status === false ? (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, true)}>
              Activer
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link onClick={() => this.handleStatus(record._id, false)}>
              Desactiver
            </Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <Link onClick={() => this.handleDelete(record._id)}>Supprimer</Link>
        </Menu.Item>
      </Menu>
    );

    const { load, data, start, end } = this.state;
    console.log(data)
    return (
      <>
        <PageHeader
          onBack={() => {
            //  window.history.back()
          }}
          title="Catégories"
          tags={<Tag color="blue">Liste des catégories</Tag>}
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
                }
                let d1 = data[0].format("YYYY-MM-DDTHH:mm:ss");
                let d2 = data[1].format("YYYY-MM-DDTHH:mm:ss");

                this.setState({ start: d1, end: d2 });
              }}
            />,
            // <User_new />,
            <CSVLink data={data}>Exporter CSV/Excel</CSVLink>
          ]}
        >
          <Row>
            <Statistic
              title="Total"
              value={
                data?.filter((item) => {
                  if (start === null && end === null) {
                    return item;
                  }
                  return item.createdAt >= start && item.createdAt <= end;
                }).length
              }
            />
              <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <Category_new />
              </div>
              
            {/* <Statistic
              title="Actif"
              value={data?.filter((item) => item.status === 1).length}
              style={{
                margin: "0 32px"
              }}
            />
            <Statistic
              title="Inactif"
              value={data?.filter((item) => item.status === 2).length}
              style={
                {
                  // margin: "0 32px"
                }
              }
            />
            <Statistic
              title="En attente"
              value={data?.filter((item) => item.status === 0).length}
              style={{
                margin: "0 32px"
              }}
            />
            <Statistic
              title="Suspendu"
              value={data?.filter((item) => item.status === 3).length}
              style={
                {
                  // margin: "0 32px"
                }
              }
            /> */}
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
                  // size="small"
                  // scroll={{
                  //   x: 2200
                  // }}
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(AdminCategory);
