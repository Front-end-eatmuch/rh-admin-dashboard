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
  rang,
  get_all_rang,
  get_all_total_rang,
  update_rang,
  delete_rang
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import Rang_edit from "../forms/rang_edit";
import Rang_new from "../forms/rang_new";

import { CSVLink } from "react-csv";

const { RangePicker } = DatePicker;

const token = sessionStorage.getItem("auth_token");

class Rang extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: [],
    start: null,
    end: null
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: rang + "/" + get_all_rang,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    console.log(response.data)
    this.setState({ load: false, data: response.data });
  };

  onSelectChange = (selectedRowKeys) => {
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
          placeholder={`Rechercher ${dataIndex}`}
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
            Rechercher
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Réinitialiser
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
            Filtrer
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
      route: rang + "/" + "update-rang" + "/" + id,
      data: data,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });
    console.log(response.data)

    if (response?.data?.success === true) {
      openNotificationWithIcon("success", "Statut mis à jour avec succès");
      this.getData();
    }
  };

  handleDelete = async (id) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: rang + "/" + delete_rang + "/" + id,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });

    console.log(response.data) 

    if (response?.data?.success === true) {
      openNotificationWithIcon("success", "Rang supprimé avec succès");
      this.getData();
    }
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
        title: "Titre",
        dataIndex: "title",
        ...this.getColumnSearchProps("title")
      },
      {
        title: "Niveau",
        dataIndex: "level",
        sorter: (a, b) => a.level - b.level,
        ...this.getColumnSearchProps("level")
      },
      {
        title: "Statut",
        dataIndex: "isActive",
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
      // {
      //   title: "Création",
      //   dataIndex: "createdAt",
      //   render: (text) => <Tag>{text?.slice(0, 16)}</Tag>
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

    const MenuButton = (record) => (
      <Menu>
        <Menu.Item>
          <Rang_edit row={record} />
        </Menu.Item>

        {record.isActive === false ? (
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
          title="Rangs"
          tags={<Tag color="blue">Liste des rangs</Tag>}
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
              value={data?.filter((item) => {
                if (start === null && end === null) {
                  return item;
                }
                return item.createdAt >= start && item.createdAt <= end;
              }).length}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
              <Rang_new />
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(Rang); 