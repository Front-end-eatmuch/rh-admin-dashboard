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
import { decryptSingleData } from "../functions/cryptojs";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class User_new extends Component {
  state = {
    visible: false,
    account_type: "",
    tag: "",
    number: "",
    list: [],
    list2: [],
    country_code: "",
    card_id: null,
    existingTag: false,
    pic: null,
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
      route: country + "/" + get_all_country,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details)
      .then((res) => {
        this.setState({
          list: decryptSingleData(res.data.country)
        });
      })
      .catch((err) => {
        this.setState({ load: false });
        console.log(err);
        return openNotificationWithIcon("error", err);
      });
  };

  checkTag = async (tag) => {
    // const { tag } = this.state;
    if (tag < 6) {
      return this.setState({ existingTag: false });
    }

    const request_details = {
      type: GET,
      url: service_api,
      route: user + "/" + check_tag + "/" + tag
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      console.log(err);
      this.setState({ existingTag: false });
      return openNotificationWithIcon("error", "Une erreur est survenue");
    });
    return this.setState({ existingTag: response.data.exist });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { number, country_code, pic, tag, card_id, account_type } =
      this.state;

    const data = {
      tag,
      number: number,
      card_id,
      country_code
    };

    if (
      number === "" ||
      country_code === "" ||
      account_type === "" ||
      card_id === null ||
      tag === "" ||
      pic === null
    ) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs"
      );
    }

    // if (account_type === "business" && company_name === "") {
    //   this.setState({ load: false });
    //   return openNotificationWithIcon(
    //     "error",
    //     "Si vous êtes un compte business, veuillez entrer le nom de votre entreprise"
    //   );
    // }

    var format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(tag) === true) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Votre tag ne doit pas contenir de caractères spéciaux ou d'espaces"
      );
    }
    if (tag.length < 6) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Votre tag doit contenir au moins 6 caractères"
      );
    }

    let pic_url;

    pic_url = await uploadFile(pic);
    if (!pic_url.data.success) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Une erreur est survenue lors de l'upload de la photo"
      );
    }

    const request_details = {
      type: POST,
      url: service_api,
      route: user + "/" + create_user,
      data: { ...data, pic: pic_url.data.url },
      token: token
    };

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
    const {
      number,
      country_code,
      pic,
      card_id,

      tag,
      account_type,
      existingTag,
      list,
      list2,
      load
    } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> Crée un utilisateur
        </Button>
        <Drawer
          title="Creation d'utilisateur"
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
                  name="number"
                  label="Contact (sans extension)"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le contact de l'utilisateur (sans extension)"
                    }
                  ]}
                >
                  <Input
                    name="number"
                    disabled={true}
                    placeholder={number}
                    onChange={this.handleChange}
                    value={number}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="account_type"
                  label="Type de compte"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez selectionner le pays de l'utilisateur"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Type de compte"
                    defaultValue={account_type}
                    onChange={(data) => {
                      return this.setState({ account_type: data });
                    }}
                  >
                    {[
                      {
                        text: "Individuel",
                        value: "normal"
                      },
                      {
                        text: "Business",
                        value: "business"
                      }
                    ].map((item, i) => (
                      <Option key={item.value}>
                        <span>{item.text}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tag"
                  label="Nom d'utilisateur"
                  rules={[
                    {
                      required: true,
                      role: "Créer un tag"
                    }
                  ]}
                >
                  <Input
                    addonAfter={
                      existingTag || tag.length === 0 ? (
                        <AiFillMinusCircle color="red" />
                      ) : (
                        <MdVerified color="green" />
                      )
                    }
                    name="tag"
                    placeholder="Créer un tag"
                    onChange={(e) => {
                      this.handleChange(e);
                      this.checkTag(e.target.value);
                    }}
                    value={tag}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="country_code"
                  label="Selectionner le pays"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez selectionner le pays de l'utilisateur"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Selectionner parmis le pays"
                    defaultValue={country_code}
                    onChange={(data) => {
                      return this.setState({ country_code: data });
                    }}
                  >
                    {list.map((item, i) => (
                      <Option key={item.code}>
                        <span>{item.name}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="card_id"
                  label="Selectionner la carte affiliée au compte"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez selectionner la carte affiliée au compte"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Selectionner la carte affiliée au compte"
                    defaultValue={card_id}
                    onChange={(data) => {
                      // console.log(data.split(" ")[1]);
                      let value = data.split(" ");
                      return this.setState({
                        card_id: value[0],
                        number: value[1]
                      });
                    }}
                  >
                    {list2.map((item, i) => (
                      <Option key={item._id + " " + item.phone}>
                        <span>{item.phone}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="pic"
                  label="Photo profile"
                  rules={[
                    {
                      required: true,
                      message: "Upload is required"
                    }
                  ]}
                >
                  <Input
                    type="file"
                    // multiple={true}
                    accept="image/x-png,image/jpeg,image/jpg"
                    placeholder="Upload picture"
                    onChange={this.handleImage}
                    value={pic}
                    name="pic"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default User_new;
