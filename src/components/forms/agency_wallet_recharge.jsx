import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  notification,
  Space,
  Spin,
  Table,
  Tag
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/general.css";

import { MakeRequestAsync } from "../functions/axios";
import { POST, GET } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  country,
  get_all_country,
  user,
  create_user,
  check_tag
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import {
  EmailValidation,
  PasswordValidation
} from "../functions/validateEmailPassword";
import { uploadFile } from "../functions/upload-file";
import { AiFillMinusCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { pinEncryptor } from "../functions/pinSecure";
import ComponentToPrint from "../printeable/receipt";
import ReactToPrint from "react-to-print";
import { decryptSingleData } from "../functions/cryptojs";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Agency_wallet_recharge extends Component {
  state = {
    visible: false,
    data: [],
    amount: 0,
    load: true
  };

  componentDidMount() {
    this.getData();
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleImage = (e) => {
    e.preventDefault();
    return this.setState({ pic: e.target.files[0] });
  };

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route:
        "agency-uv" +
        "/" +
        "get-all-agency" +
        "/" +
        this.props.row?.card_id?._id,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    // console.log(response.data);
    this.setState({
      load: false,
      data: decryptSingleData(response.data.transaction)
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { amount } = this.state;
    this.setState({ load: true });

    if (amount <= 0 || amount % 1000 !== 0) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Les montants UV doivent être supérieur à 1000 & aussi un multiple de 1000"
      );
    }

    const request_details = {
      type: POST,
      url: service_api,
      route: "agency-uv" + "/" + "create-transaction-agency",
      data: {
        transaction_data: {
          amount: amount,
          card_id: this.props.row.card_id._id,
          currency: "xof"
        }
      },
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      console.log(JSON.stringify(err));
      this.setState({ load: false });
      return openNotificationWithIcon("error", err);
    });

    return setTimeout(() => window.location.reload(), 0);
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "_id",
        // width: "20%",
        // ...this.getColumnSearchProps("_id"),
        fixed: "left"
      },
      {
        title: "Détail de la transaction",
        dataIndex: "transaction_data",
        // width: "20%",
        // fixed: "left",
        render: (text) => (
          <Tag color={"green"}>
            Montant Envoyé: {text?.amount} {text?.currency} <br />
            <br />
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
          <Tag color={"orange"}>Dépot effectué par Payment Processor</Tag>
        )
      },
      {
        title: "Destinataire",
        dataIndex: "transaction_data",
        // width: "20%",
        // fixed: "left",
        render: (text) => (
          <Tag color={"orange"}>
            <b>
              {text?.receiver_data?.cvv +
                " " +
                text?.receiver_data?.bin?.slice(3) +
                " " +
                text?.receiver_data?.number}
            </b>
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
    ];

    const { data, amount, load } = this.state;

    return (
      <>
        <Button type="success" onClick={this.showDrawer}>
          Recharge & Transactions
        </Button>
        <Drawer
          title="Recharge & Transactions"
          width={"100%"}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: "right"
              }}
            >
              {load ? (
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              ) : (
                <div>
                  <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                    Annuler
                  </Button>
                  <Button
                    onClick={(e) => {
                      this.handleSubmit(e);
                    }}
                    type="primary"
                  >
                    Soumettre
                  </Button>
                </div>
              )}
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="amount"
                  label="UV à recharger"
                  rules={[{ required: true, message: "Please enter UV value" }]}
                >
                  <Input
                    name="amount"
                    placeholder="Please enter amount value"
                    onChange={this.handleChange}
                    value={amount}
                    type="number"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
                  dataSource={data}
                />
              </Col>
            )}
          </Row>
        </Drawer>
      </>
    );
  }
}

export default Agency_wallet_recharge;
