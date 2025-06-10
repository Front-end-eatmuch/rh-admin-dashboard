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
  delete_category,
  actuality,
  get_all_actuality
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Category_edit from "../forms/category_edit";
import { CSVLink } from "react-csv";
import Category_new from "../forms/category_new";
import Actuality_edit from "../forms/Actuality_edit";

const { RangePicker } = DatePicker;

const token = sessionStorage.getItem("auth_token");

class Actuality extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: [],
    start: null,
    end: null,
    overall: true,
    allowed: false,
    blocked: false,
    content: "",
    category: null,
    likesCount: {
      like: 0,
      love: 0
    },
    media: "",
    type: "actuality",
    user: {
      firstname: "",
      lastname: "",
      _id: ""
    }
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: actuality + "/admin/" + get_all_actuality,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    console.log(response.data.actualities);
    this.setState({ load: false, data: response.data.actualities });
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
      route: actuality + "/" + "admin/update-actuality" + "/" + id,
      data: data,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });
    console.log(response);
    return setTimeout(() => window.location.reload(), 1000);
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
    //   {
    //     title: "Id",
    //     dataIndex: "_id",
    //     ...this.getColumnSearchProps("_id"),
    //     fixed: "left"
    //   },
       {
         title: "Contenu",
         dataIndex: "content",
         ...this.getColumnSearchProps("content"),
         width: "30%",
         render: (text) => (
           <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
             {text?.length > 20 ? text.substring(0, 60) + "..." : text}
           </div>
        )
       },
      {
        title: "Média",
        dataIndex: "imageUrl",
        render: (text) => text ? (
            <div>
              <img 
                src={text} 
                alt="media" 
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              {console.log(text)}
            </div>
        ) : "Aucun média"
      },
      {
        title: "J'aimes",
        dataIndex: "likesCount",
        render: (counts) => (
          <Space>
            <Tag color="blue">Like: {counts?.like || 0}</Tag>
            <Tag color="red">Love: {counts?.love || 0}</Tag>
          </Space>
        )
      },
      {
        title: "Auteur",
        dataIndex: "user",
        render: (user) => (
          <Tag color="purple">
            {user?.firstname} {user?.lastname}
          </Tag>
        )
      },
    //   {
    //     title: "Type",
    //     dataIndex: "type",
    //     ...this.getColumnSearchProps("type")
    //   },
      {
        title: "Catégorie",
        dataIndex: "category",
        render: (text) => text ? <Tag>{text}</Tag> : "Aucune catégorie"
      },
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
        title: "Création",
        dataIndex: "createdAt",
        render: (text) => <Tag>{text?.slice(0, 16)}</Tag>
      },
    //   {
    //     title: "Mise à jour",
    //     dataIndex: "updatedAt",
    //     render: (text) => <Tag>{text?.slice(0, 16)}</Tag>
    //   },
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

    const MenuButton = (record) => (
      <Menu>
        <Menu.Item>
          <Actuality_edit row={record} />
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
    
    return (
      <>
        <PageHeader
          title="Actualités"
          tags={<Tag color="blue">Liste des actualités</Tag>}
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
          </Row>
          <Row>
            {load ? (
              <Space size="middle" style={{ marginTop: 20 }}>
                <Spin size="large" />
              </Space>
            ) : (
              <Col span={24} style={{ marginTop: 20 }}>
                <Table
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(Actuality); 