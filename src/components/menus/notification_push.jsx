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
  Spin,
  Modal,
  Typography
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import {
  notification,
  create_notification,
  update_notification,
  delete_notification,
  get_all_notifications,
  get_all_orphan_notifications
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";

import Push_new from "../forms/push_new";
import Send_push from "../forms/send_push";
import { decryptSingleData } from "../functions/cryptojs";
const token = sessionStorage.getItem("auth_token");

class NotificationPush extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: [],
    overall: true,
    allowed: false,
    blocked: false,
    modalVisible: false,
    selectedNotification: null
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: notification + "/" + get_all_orphan_notifications,
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
        return openNotificationWithIcon("error", err);
      });
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

  showModal = (record) => {
    this.setState({
      modalVisible: true,
      selectedNotification: record
    });
  };

  handleModalClose = () => {
    this.setState({
      modalVisible: false,
      selectedNotification: null
    });
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
            <Space>
              <Button type="primary" onClick={() => this.showModal(record)}>
                Détails
              </Button>
              <Button type="danger" onClick={() => this.handleDelete(record._id)}>
                Supprimer
              </Button>
            </Space>
          </div>
        )
      }
    ];

    const { load, data, modalVisible, selectedNotification } = this.state;

    return (
      <>
        <PageHeader
          onBack={() => {
            //  window.history.back()
          }}
          title="Notifications"
          tags={<Tag color="blue">Liste des notifications</Tag>}
          subTitle=""
          extra={[<Push_new />]}
        >
          <Row>
            <Statistic title="Total" value={data?.length} />
          </Row>
          <Row>
            {load ? (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            ) : (
              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={data}
                />
              </Col>
            )}
          </Row>
        </PageHeader>

        <Modal
          title="Détails de la notification"
          visible={modalVisible}
          onCancel={this.handleModalClose}
          footer={[
            <Button key="close" onClick={this.handleModalClose}>
              Fermer
            </Button>
          ]}
          width={600}
        >
          {selectedNotification && (
            <Descriptions column={1}>
              <Descriptions.Item label="Message">
                {selectedNotification.message}
              </Descriptions.Item>
              <Descriptions.Item label="Lien">
                {selectedNotification.link ? (
                  <a href={selectedNotification.link} target="_blank" rel="noopener noreferrer">
                    {selectedNotification.link}
                  </a>
                ) : (
                  "Aucun lien"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Statut">
                <Tag color={selectedNotification.read ? "green" : "red"}>
                  {selectedNotification.read ? "Lu" : "Non lu"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Date de création">
                {new Date(selectedNotification.createdAt).toLocaleString()}
              </Descriptions.Item>
              {selectedNotification.updatedAt && (
                <Descriptions.Item label="Dernière mise à jour">
                  {new Date(selectedNotification.updatedAt).toLocaleString()}
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
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
)(NotificationPush);
