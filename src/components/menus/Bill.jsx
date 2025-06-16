import React, { Component } from "react";
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  Row,
  Col,
  Space,
  Table,
  Input,
  DatePicker,
  Typography,
  Spin,
  Drawer,
  Divider
} from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Highlighter from "react-highlight-words";
import { CSVLink } from "react-csv";
import moment from 'moment';

import { GET } from "../constants/request-type";
import { service_api } from "../constants/url";
import { bill, get_all_bill } from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import { decryptSingleData } from "../functions/cryptojs";

const { Text } = Typography;
const { RangePicker } = DatePicker;

class Bill extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: [],
    start: null,
    end: null,
    drawerVisible: false,
    selectedBill: null
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: bill + "/" + get_all_bill,
      data: null,
      token: sessionStorage.getItem("auth_token")
    };
    
    try {
      const response = await MakeRequestAsync(request_details);
      this.setState({ load: false, data: decryptSingleData(response.data.bills) });
    //   console.log(response.data.bills)
    } catch (err) {
      this.setState({ load: false });
      openNotificationWithIcon("error", err?.response?.data?.message || "Erreur lors du chargement des factures");
    }
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

  showBillDetails = (record) => {
    this.setState({
      drawerVisible: true,
      selectedBill: record
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
      selectedBill: null
    });
  };

  render() {
    const columns = [
      {
        title: "Référence",
        dataIndex: "_id",
        ...this.getColumnSearchProps("_id"),
        width: "15%",
        render: (text) => (
          <p>
            {text}
          </p>
        )
      },
      {
        title: "Client",
        dataIndex: "userId",
        render: (user) => (
          <Space direction="vertical">
            <Text>{user?.firstname} {user?.lastname}</Text>
            <Text type="secondary">{user?.phoneNumber}</Text>
            <Text type="secondary">{user?.job}</Text>
          </Space>
        ),
        width: "20%"
      },
      {
        title: "Activité",
        dataIndex: "activityId",
        render: (activity) => (
          <Space direction="vertical">
            <Text>{activity?.title}</Text>
            <Tag color={activity?.progress === "Terminé" ? "green" : 
                      activity?.progress === "En cours" ? "blue" : "orange"}>
              {activity?.progress}
            </Tag>
          </Space>
        ),
        width: "20%"
      },
      {
        title: "Montant",
        dataIndex: "amount",
        render: (amount) => (
          <Tag color="green">
            {amount?.toLocaleString()} CFA
          </Tag>
        ),
        width: "15%"
      },
      {
        title: "Statut",
        dataIndex: "status",
        render: (status, record) => {
          const color = 
            status === "paid" && record.paid ? "green" :
            status === "pending" ? "orange" :
            "red";
          const text = 
            status === "paid" && record.paid ? "Payé" :
            status === "pending" ? "En attente" :
            "Non payé";
          return <Tag color={color}>{text}</Tag>;
        },
        width: "10%"
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
        width: "15%"
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Button type="primary" onClick={() => this.showBillDetails(record)}>
            Détails
          </Button>
        )
      }
    ];

    const { load, data, drawerVisible, selectedBill, start, end } = this.state;

    const filteredData = data.filter((item) => {
      if (start === null || end === null) {
        return true;
      }
      return moment(item.createdAt).isBetween(start, end, null, '[]');
    });

    return (
      <>
        <PageHeader
          title="Factures"
          tags={<Tag color="blue">Liste des factures</Tag>}
          extra={[
            <RangePicker
              showTime
              onChange={(dates) => {
                if (dates === null) {
                  this.setState({ start: null, end: null });
                } else {
                  this.setState({
                    start: dates[0].format("YYYY-MM-DDTHH:mm:ss"),
                    end: dates[1].format("YYYY-MM-DDTHH:mm:ss")
                  });
                }
              }}
            />,
            <CSVLink data={filteredData}>Exporter CSV/Excel</CSVLink>
          ]}
        >
          <Row>
            <Statistic title="Total" value={filteredData.length} />
            <Statistic
              title="Montant Total"
              value={filteredData.reduce((sum, item) => sum + (item.amount || 0), 0).toLocaleString()}
              prefix="CFA"
              style={{ margin: '0 32px' }}
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
                  dataSource={filteredData}
                  rowKey="_id"
                />
              </Col>
            )}
          </Row>
        </PageHeader>

        <Drawer
          title="Détails de la facture"
          placement="right"
          width={720}
          onClose={this.onClose}
          visible={drawerVisible}
          extra={
            <Space>
              <Button onClick={this.onClose}>Fermer</Button>
            </Space>
          }
        >
          {selectedBill && (
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text strong>Référence : </Text>
                <Text copyable>{selectedBill._id}</Text>
              </Col>
              
              <Divider orientation="centert">Informations Client</Divider>
              
              <Col span={24}>
                <Text strong>Client : </Text>
                <Text>{selectedBill.userId?.firstname} {selectedBill.userId?.lastname}</Text>
              </Col>
              
              <Col span={24}>
                <Text strong>Téléphone : </Text>
                <Text>{selectedBill.userId?.phoneNumber}</Text>
              </Col>
              
              <Col span={24}>
                <Text strong>Profession : </Text>
                <Text>{selectedBill.userId?.job}</Text>
              </Col>

              <Divider orientation="centert">Informations Activité</Divider>

              <Col span={24}>
                <Text strong>Titre de l'activité : </Text>
                <Text>{selectedBill.activityId?.title}</Text>
              </Col>

              <Col span={12}>
                <Text strong>Progression : </Text>
                <Tag color={selectedBill.activityId?.progress === "Terminé" ? "green" : 
                          selectedBill.activityId?.progress === "En cours" ? "blue" : "orange"}>
                  {selectedBill.activityId?.progress}
                </Tag>
              </Col>

              <Col span={12}>
                <Text strong>Statut : </Text>
                <Tag color={selectedBill.activityId?.status ? "green" : "red"}>
                  {selectedBill.activityId?.status ? "Active" : "Inactive"}
                </Tag>
              </Col>

              <Col span={12}>
                <Text strong>Accès : </Text>
                <Tag color={selectedBill.activityId?.accessible ? "green" : "red"}>
                  {selectedBill.activityId?.accessible ? "Accessible" : "Non accessible"}
                </Tag>
              </Col>

              <Col span={24}>
                <Text strong>Période : </Text>
                <br />
                <Space direction="vertical" style={{ marginTop: 8 }}>
                  <Text>Début : {moment(selectedBill.activityId?.starting).format('DD/MM/YYYY HH:mm')}</Text>
                  <Text>Fin : {moment(selectedBill.activityId?.ending).format('DD/MM/YYYY HH:mm')}</Text>
                </Space>
              </Col>

              <Divider orientation="centert">Informations Paiement</Divider>

              <Col span={12}>
                <Text strong>Montant : </Text>
                <Tag color="green" style={{ marginTop: 8 }}>
                  {selectedBill.amount?.toLocaleString()} CFA
                </Tag>
              </Col>

              <Col span={12}>
                <Text strong>Statut : </Text>
                <Tag color={selectedBill.status === "paid" && selectedBill.paid ? "green" : "orange"}>
                  {selectedBill.status === "paid" && selectedBill.paid ? "Payé" : "En attente"}
                </Tag>
              </Col>

              <Col span={24}>
                <Text strong>Date de création : </Text>
                <br />
                <Text>{moment(selectedBill.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
              </Col>

            </Row>
          )}
        </Drawer>
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(Bill); 