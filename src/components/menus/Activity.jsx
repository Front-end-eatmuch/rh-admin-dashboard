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
  DatePicker,
  Typography
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  activity,
  get_all_activity
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import Activity_edit from "../forms/Activity_edit";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const token = sessionStorage.getItem("auth_token");

class Activity extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: [],
    start: null,
    end: null,
    accessible: true,
    adminId: {
      _id: "",
      firstname: "",
      lastname: ""
    },
    category: {
      _id: "",
      name: ""
    },
    description: "",
    ending: "",
    starting: "",
    imageUrl: "",
    media: "",
    paid: false,
    progress: "",
    status: true,
    title: "",
    userThatPaid: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: activity + "/admin/" + get_all_activity,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    console.log(response.data);
    this.setState({ load: false, data: response.data.Activities });
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
      route: activity + "/admin/update-activity/" + id,
      data: data,
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

  handleDelete = async (id) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: activity + "/admin/delete-activity/" + id,
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
        title: "Titre",
        dataIndex: "title",
        ...this.getColumnSearchProps("title"),
        width: "20%",
        render: (text) => (
          <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {text?.length > 20 ? text.substring(0, 20) + "..." : text}
          </div>
        )
      },
    //   {
    //     title: "Description",
    //     dataIndex: "description",
    //     ...this.getColumnSearchProps("description"),
    //     width: "30%",
    //     render: (text) => (
    //       <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
    //         {text?.length > 20 ? text.substring(0, 20) + "..." : text}
    //       </div>
    //     )
    //   },
      {
        title: "Image",
        dataIndex: "imageUrl",
        render: (text) => text ? (
          <div>
            <img 
              src={text} 
              alt="activity" 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        ) : "Aucune image"
      },
      {
        title: "Catégorie",
        dataIndex: "category",
        render: (category) => (
          <Tag color="cyan">{category?.name}</Tag>
        )
      },
    //   {
    //     title: "Dates",
    //     dataIndex: "starting",
    //     render: (starting, record) => (
    //       <Space direction="vertical">
    //         <Text>Début: {new Date(starting).toLocaleString('fr-FR')}</Text>
    //         <Text>Fin: {new Date(record.ending).toLocaleString('fr-FR')}</Text>
    //       </Space>
    //     )
    //   },
      {
        title: "Progression",
        dataIndex: "progress",
        render: (progress) => {
          const color = 
            progress === "À venir" ? "blue" :
            progress === "En cours" ? "green" :
            "orange";
          return <Tag color={color}>{progress}</Tag>;
        }
      },
      {
        title: "Payant",
        dataIndex: "paid",
        render: (paid) => (
          <Tag color={paid ? "gold" : "green"}>
            {paid ? "Payant" : "Gratuit"}
          </Tag>
        )
      },
      {
        title: "Participants",
        dataIndex: "userThatPaid",
        render: (users) => (
          <Tag color="purple">{users?.length || 0} participant(s)</Tag>
        )
      },
      {
        title: "Administrateur",
        dataIndex: "adminId",
        render: (admin) => (
          <Tag color="geekblue">
            {admin?.firstname} {admin?.lastname}
          </Tag>
        )
      },
      {
        title: "Statut",
        dataIndex: "status",
        render: (text) =>
          text === true ? (
            <Tag color={"green"} key={text}>
              Active
            </Tag>
          ) : (
            <Tag color={"volcano"} key={text}>
              Inactive
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

    const MenuButton = (record) => (
      <Menu>
        <Menu.Item>
          <Activity_edit row={record} />
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
    
    return (
      <>
        <PageHeader
          title="Activités"
          tags={<Tag color="blue">Liste des activités</Tag>}
          subTitle=""
          extra={[
            <RangePicker
              showTime
              onChange={(data) => {
                if (data === null) {
                  this.setState({
                    start: null,
                    end: null
                  });
                } else {
                  let d1 = data[0].format("YYYY-MM-DDTHH:mm:ss");
                  let d2 = data[1].format("YYYY-MM-DDTHH:mm:ss");
                  this.setState({ start: d1, end: d2 });
                }
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(Activity); 