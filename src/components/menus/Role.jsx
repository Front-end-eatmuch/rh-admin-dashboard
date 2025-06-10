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
  Typography,
  Switch
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { role } from "../constants/routes";
import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import Role_new from "../forms/role_new";
import Role_edit from "../forms/role_edit";

const { Text } = Typography;

const token = sessionStorage.getItem("auth_token");

class Role extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: role + "/all",
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    console.log(response.data.roles);
    this.setState({ load: false, data: response.data.roles });
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

  handleDelete = async (roleId) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: role + "/" + roleId,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });

    if (response?.data?.status === 'success') {
      openNotificationWithIcon("success", "Rôle supprimé avec succès");
      this.getData(); // Rafraîchir la liste des rôles
    }
  };

//   handleEdit = (roleId) => {
//     const role = this.state.data.find(r => r._id === roleId);
//     return <Role_edit row={role} />;
//   };

  render() {
    const columns = [
      {
        title: "Nom",
        dataIndex: "name",
        ...this.getColumnSearchProps("name"),
        width: "20%"
      },
      {
        title: "Permissions",
        dataIndex: "permissions",
        width: "40%",
        render: (permissions) => (
          <Space wrap>
            {permissions?.map((permission, index) => (
              <Tag key={index} color="blue">
                {permission}
              </Tag>
            ))}
          </Space>
        )
      },
      {
        title: "Date de création",
        dataIndex: "createdAt",
        width: "20%",
        render: (text) => (
          <Text>{new Date(text).toLocaleString('fr-FR')}</Text>
        )
      },
      {
        title: "Actions",
        fixed: "right",
        render: (text, record) => (
          <div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    {/* {console.log(record)} */}
                    <Role_edit row={record} />
                  </Menu.Item>
                  <Menu.Item>
                    <Link onClick={() => this.handleDelete(record._id)}>
                      Supprimer
                    </Link>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomCenter"
              arrow
            >
              <Button>Options</Button>
            </Dropdown>
          </div>
        )
      }
    ];

    const { load, data } = this.state;
    
    return (
      <>
        <PageHeader
          title="Rôles"
          tags={<Tag color="blue">Liste des rôles</Tag>}
          subTitle=""
          extra={[
            <Role_new key="new-role" />,
            <CSVLink data={data}>Exporter CSV/Excel</CSVLink>
          ]}
        >
          <Row>
            <Statistic
              title="Total"
              value={data?.length}
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(Role); 