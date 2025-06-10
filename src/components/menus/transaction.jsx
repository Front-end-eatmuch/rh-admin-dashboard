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
import { card, get_all_card } from "../constants/routes";
import GoogleMapReact from "google-map-react";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink, CSVDownload } from "react-csv";

const token = sessionStorage.getItem("auth_token");

const { RangePicker } = DatePicker;

class Transaction extends Component {
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
    blocked: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: "transfert" + "/" + "get-all-for-admin",
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    console.log(response.data);
    this.setState({ load: false, data: response.data.transaction });
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

  // handleStatus = async (id, status) => {
  //   const data = {
  //     status: status
  //   };

  //   const request_details = {
  //     type: UPDATE,
  //     url: service_user,
  //     route: user + "/" + update_user + "/" + id,
  //     data: data,
  //     token: token
  //   };
  //   const response = await MakeRequestAsync(request_details).catch((err) => {
  //     return openNotificationWithIcon("error", `${err.response.data}`);
  //   });
  //   return setTimeout(() => window.location.reload(), 1000);
  // };

  // handleDelete = async (id) => {
  //   const request_details = {
  //     type: DELETE,
  //     url: service_user,
  //     route: user + "/" + delete_user + "/" + id,
  //     token: token
  //   };
  //   const response = await MakeRequestAsync(request_details).catch((err) => {
  //     return openNotificationWithIcon("error", `${err.response.data}`);
  //   });

  //   return setTimeout(() => window.location.reload(), 1000);
  // };

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
        title: "Détail de la transaction",
        dataIndex: "transaction_data",
        // width: "20%",
        // fixed: "left",
        render: (text) => (
          <Tag color={"green"}>
            Montant Envoyé: {text?.amount} {text?.currency_sender} <br />
            Montant Reçu: {text?.amount_to_receive} {text?.currency_receiver}{" "}
            <br />
            Frais de transaction: {text?.fee} {text?.currency_sender}
            <br />
            Frais de transaction (Rec) : {text?.fee_rec}{" "}
            {text?.currency_receiver} <br />
            Raison: {text?.reason}
          </Tag>
        )
      },
      {
        title: "Type",
        dataIndex: "transaction_data",
        // ...this.getColumnSearchProps("transaction_data.transaction_service"),
        // width: "20%",
        // fixed: "left",
        render: (text) => (
          <Tag color={"volcano"}>
            Type de transaction : {text?.transaction_service}
          </Tag>
        )
      },
      {
        title: "Expéditeur",
        dataIndex: "transaction_data",
        // width: "20%",
        // fixed: "left",
        render: (text) => (
          <Tag color={"orange"}>{text?.sender_data?.number}</Tag>
        )
      },
      {
        title: "Destinataire",
        dataIndex: "transaction_data",
        // width: "20%",
        // fixed: "left",
        render: (text) => (
          <Tag color={"orange"}>{text?.receiver_data?.number}</Tag>
        )
      },
      {
        title: "Log",
        dataIndex: "log",
        // width: "20%",
        // ...this.getColumnSearchProps("tag"),
        // fixed: "left",
        render: (text) => (
          <Tag color="blue">
            {text.map((e) => (
              <p>
                {e} <br />
              </p>
            ))}
          </Tag>
        )
      },
      {
        title: "Date & Heure",
        dataIndex: "createdAt",
        render: (text, record) => (
          <Tag color="yellow">
            <span> {text}</span>
          </Tag>
        )
      }
      // {
      //   title: "Actions",
      //   fixed: "right",
      //   render: (text, record) => (
      //     <div>
      //       {/* <Dropdown
      //         overlay={MenuButton(record)}
      //         placement="bottomCenter"
      //         arrow
      //       >
      //         <Button>Options</Button>
      //       </Dropdown> */}
      //     </div>
      //   )
      // }
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

    const MenuButton = (record) => <Menu></Menu>;

    const { load, data, start, end } = this.state;
    return (
      <>
        <PageHeader
          onBack={() => {
            //  window.history.back()
          }}
          title="Transactions"
          tags={<Tag color="blue">Liste des transactions</Tag>}
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
            <Statistic title="Total" value={data?.length} />
            <Statistic
              title="Transfert"
              value={
                data?.filter(
                  (item) =>
                    item?.transaction_data?.transaction_service === "pay" ||
                    item?.transaction_data?.transaction_service === "request"
                ).length
              }
              style={{
                margin: "0 32px"
              }}
            />
            {/* <Statistic
              title="Dépot"
              value={
                data?.filter(
                  (item) =>
                    item?.transaction_data?.transaction_service === "deposit"
                ).length
              }
              style={{
                margin: "0 32px"
              }}
            />
            <Statistic
              title="Retrait"
              value={
                data?.filter(
                  (item) =>
                    item?.transaction_data?.transaction_service === "withdrawal"
                ).length
              }
              style={{
                margin: "0 32px"
              }}
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
                  columns={columns}
                  dataSource={
                    data.filter((item) => {
                      if (start === null && end === null) {
                        return item;
                      }
                      return item.createdAt >= start && item.createdAt <= end;
                    })
                    // .filter((item) => {
                    //   if (this.props.t_type === "transfert") {
                    //     return (
                    //       item?.transaction_data?.transaction_service ===
                    //         "pay" ||
                    //       item?.transaction_data?.transaction_service ===
                    //         "request"
                    //     );
                    //   }
                    //   if (this.props.t_type === "depot") {
                    //     return (
                    //       item?.transaction_data?.transaction_service ===
                    //       "deposit"
                    //     );
                    //   }
                    //   if (this.props.t_type === "retrait") {
                    //     return (
                    //       item?.transaction_data?.transaction_service ===
                    //       "withdrawal"
                    //     );
                    //   }
                    // })
                  }
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

export default connect(mapStateToProps, mapDispatchStoreToProps)(Transaction);
