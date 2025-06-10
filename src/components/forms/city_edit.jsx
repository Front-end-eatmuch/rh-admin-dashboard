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

import { MakeRequestAsync } from "../functions/axios";
import { GET, POST } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  city as cityRoute,
  create_city,
  get_all_city,
  province,
  get_all_province
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { decryptSingleData } from "../functions/cryptojs";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Province_edit extends Component {
  state = {
    visible: false,
    city: this.props.row.city,
    province: this.props.row.province,
    list: [],
    locked: false,
    load: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: province + "/" + get_all_province,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });

    this.setState({
      load: false,
      list: decryptSingleData(response.data.province)
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { city, province } = this.state;

    const data = {
      city: city.toLowerCase(),
      province: province
    };

    // console.log(token);

    const request_details = {
      type: POST,
      url: service_api,
      route: cityRoute + "/" + create_city,
      data: data,
      token: token
    };

    if (data.city.length === 0) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs"
      );
    }

    if (data.province === "") {
      this.setState({ load: false });
      return openNotificationWithIcon("error", "Veuillez selectionner un pays");
    }

    const response = await MakeRequestAsync(request_details).catch((err) => {
      console.log(err);
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
    const { city, province, list, load } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Modifier la ville"
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
                  // name="city"
                  label="Ville"
                  rules={[
                    {
                      required: true,
                      name: "Ville"
                    }
                  ]}
                >
                  <Input
                    name="city"
                    placeholder="Ville"
                    onChange={this.handleChange}
                    value={city}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  // name="province"
                  label="Province"
                  rules={[
                    {
                      required: true,
                      name: "Province"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Selectionner parmis les options"
                    defaultValue={province}
                    onChange={(data) => {
                      return this.setState({ province: data });
                    }}
                  >
                    {list.map((item, i) => (
                      <Option key={item?._id} value={item?._id}>
                        <span>{item?.province}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Province_edit;
