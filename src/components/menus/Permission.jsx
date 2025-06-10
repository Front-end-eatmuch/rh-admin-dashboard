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
import { permission } from "../constants/routes";
import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";

const { Text } = Typography;

const token = sessionStorage.getItem("auth_token");

class Permission extends Component {
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
      route: permission + "/all",
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    
    this.setState({ load: false, data: response.data.permissions });
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

  render() {
    const columns = [
    //   {
    //     title: "ID",
    //     dataIndex: "_id",
    //     ...this.getColumnSearchProps("_id"),
    //     width: "15%",
    //     render: (text) => (
    //       <Space direction="vertical">
    //         <Text copyable>{text}</Text>
    //       </Space>
    //     )
    //   },
      {
        title: "Nom",
        dataIndex: "name",
        ...this.getColumnSearchProps("name"),
        width: "20%"
      },
      {
        title: "Description",
        dataIndex: "description",
        ...this.getColumnSearchProps("description"),
        width: "30%"
      },
    //   {
    //     title: "Date de création",
    //     dataIndex: "createdAt",
    //     render: (text) => (
    //       <Text>{new Date(text).toLocaleString('fr-FR')}</Text>
    //     )
    //   },
    //   {
    //     title: "Actions",
    //     fixed: "right",
    //     render: (text, record) => (
    //       <div>
    //         <Dropdown
    //           overlay={
    //             <Menu>
    //               <Menu.Item>
    //                 <Link onClick={() => this.handleEdit(record._id)}>
    //                   Modifier
    //                 </Link>
    //               </Menu.Item>
    //               <Menu.Item>
    //                 <Link onClick={() => this.handleDelete(record._id)}>
    //                   Supprimer
    //                 </Link>
    //               </Menu.Item>
    //             </Menu>
    //           }
    //           placement="bottomCenter"
    //           arrow
    //         >
    //           <Button>Options</Button>
    //         </Dropdown>
    //       </div>
    //     )
    //   }
    ];

    const { load, data } = this.state;
    
    return (
      <>
        <PageHeader
          title="Permissions"
          tags={<Tag color="blue">Liste des permissions</Tag>}
          subTitle=""
          extra={[
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(Permission); 