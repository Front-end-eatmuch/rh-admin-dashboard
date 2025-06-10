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
  Spin
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/general.css";
import { service_api } from "../constants/url";
import {
  user,
  get_all_user,
  push,
  send_push,
  mailing
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { MakeRequestAsync } from "../functions/axios";
import { GET, POST } from "../constants/request-type";
import Axios from "axios";
import MultiSelect from "@khanacademy/react-multi-select";
import { decryptSingleData } from "../functions/cryptojs";

const { Option } = Select;
const token = sessionStorage.getItem("auth_token");

class Send_mail extends Component {
  state = {
    visible: false,
    data1: [],
    data2: [],
    emails: [],
    classes: {
      text: "Utilisateur",
      value: "user"
    },
    html: this.props.row.html,
    title: this.props.row.title,
    from: this.props.row.from,
    load: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    var list = [];

    const request_details_user = {
      type: GET,
      url: service_api,
      route: user + "/" + get_all_user,
      data: null,
      token: token
    };

    const response_user = await MakeRequestAsync(request_details_user)
      .then((res) => {
        const decryptedValue = decryptSingleData(res.data.user);
        decryptedValue?.map((data) =>
          list.push({
            label: data?.email,
            value: data?.email
          })
        );
        this.setState({
          load: false,
          data1: list
        });
      })
      .catch((err) => {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          `${err?.response?.data?.message}`
        );
      });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });
    const { emails, title, html } = this.state;
    const data = {
      emails: [...emails],
      subject: title,
      html: html
    };

    if (data.emails.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon("error", "Aucune selection ");
    }

    for (var i = 0; i < emails.length; i++) {
      const request_detail = {
        type: POST,
        url: service_api,
        route: mailing + "/" + "send-email",
        data: {
          email: emails[i],
          subject: title,
          html: html
        },
        token: token
      };

      const response = await MakeRequestAsync(request_detail)
        .then((res) => {
          console.log("Envoie terminé");
        })
        .catch((err) => {
          this.setState({ load: false });
          return openNotificationWithIcon(
            "error",
            `${err.response.data.message}`
          );
        });
    }

    openNotificationWithIcon("success", "Les mails ont bien été envoyés");

    return setTimeout(() => window.location.reload(), 1000);
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
    const { title, message, data1, tokens, classes, load } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Envoyer
        </Button>
        <Drawer
          title="Send push notification"
          width={720}
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
                    Cancel
                  </Button>
                  <Button
                    onClick={(e) => {
                      this.handleSubmit(e);
                    }}
                    type="primary"
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              {/* <Col span={4}>
                <Button
                  type={classes.value === "user" ? "primary" : "default"}
                  onClick={() => {
                    this.setState({
                      classes: {
                        text: "Utilisateur",
                        value: "user"
                      }
                    });
                  }}
                >
                  Individuel
                </Button>
              </Col> */}
              {/* <Col span={4}>
                <Button
                  type={classes.value === "all" ? "primary" : "default"}
                  onClick={() => {
                    this.setState({
                      classes: {
                        text: "All",
                        value: "all"
                      }
                    });
                  }}
                >
                  Tout
                </Button>
              </Col> */}
            </Row>
            <Row gutter={16} style={{ marginTop: 30 }}>
              <Col span={24}>
                <MultiSelect
                  options={data1}
                  onSelectedChanged={(emails) => this.setState({ emails })}
                  selected={this.state.emails}
                />
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Send_mail;
