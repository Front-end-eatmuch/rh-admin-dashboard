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
  admin,
  create_admin,
  permission,
  get_all_permission
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import {
  EmailValidation,
  PasswordValidation
} from "../functions/validateEmailPassword";
import { decryptSingleData } from "../functions/cryptojs";
import { todayDate } from "../functions/dateFunctions";
import { uploadFile } from "../functions/upload-file";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Admin_new extends Component {
  state = {
    visible: false,
    firstname: "",
    lastname: "",
    number: "",
    email: "",
    password: "",
    c_password: "",
    list: [],
    permission: null,
    gender: "male",
    birthdate: todayDate(),
    pic: null,
    status: 1,
    load: true
  };

  componentDidMount() {
    this.getData();
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    e.preventDefault();
    return this.setState({ pic: e.target.files[0] });
  };

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: permission + "/" + get_all_permission,
      data: null,
      token: token
    };

    const response = await MakeRequestAsync(request_details)
      .then(async (res) => {
        this.setState({
          list: decryptSingleData(res.data.permission),
          load: false
        });
      })
      .catch((err) => {
        this.setState({ load: false });
        console.log(err);
        return openNotificationWithIcon("error", err);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const {
      firstname,
      lastname,
      email,
      number,
      password,
      c_password,
      permission,
      gender,
      birthdate,
      pic
    } = this.state;

    const data = {
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      number,
      password,
      c_password,
      permission,
      gender,
      birthdate
    };

    if (!EmailValidation(email))
      return openNotificationWithIcon(
        "error",
        "Veuillez entrer un email valide"
      );
    if (!PasswordValidation(password))
      return openNotificationWithIcon(
        "error",
        "Veuillez entrer un mot de passe (fort) A-a-z0-9"
      );
    if (password !== c_password)
      return openNotificationWithIcon(
        "error",
        "Veuillez entrer le même mot de passe"
      );

    if (
      firstname === "" ||
      lastname === "" ||
      number === "" ||
      permission === "" ||
      !gender ||
      !birthdate ||
      !pic
    ) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs et ajouter une image"
      );
    }

    const pic_url = await uploadFile(pic);

    if (!pic_url.data.success) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Nous n'avons pas pu télécharger votre image"
      );
    }

    const request_details = {
      type: POST,
      url: service_api,
      route: admin + "/" + create_admin,
      data: {
        ...data,
        pic: pic_url.data.url
      },
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
      firstname,
      lastname,
      email,
      number,
      permission,
      password,
      c_password,
      pic,
      gender,
      birthdate,
      list,
      load
    } = this.state;

    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> Créer administrateur
        </Button>
        <Drawer
          title="Creation d'administrateur"
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
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  label="Nom"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le nom de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="firstname"
                    placeholder="Veuillez entrer le nom"
                    onChange={this.handleChange}
                    value={firstname}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  label="Prénom"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le prénom de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="lastname"
                    placeholder="Veuillez entrer le prénom"
                    onChange={this.handleChange}
                    value={lastname}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer l'email de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="email"
                    placeholder="Veuillez entrer l'email"
                    onChange={this.handleChange}
                    value={email}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="number"
                  label="Contact"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le contact de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="number"
                    placeholder="Veuillez entrer le contact"
                    onChange={this.handleChange}
                    value={number}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="birthdate"
                  label="Date de naissance"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer la date de naissance"
                    }
                  ]}
                >
                  <input
                    style={{
                      width: "100%",
                      border: "1px solid #cecece"
                    }}
                    type="date"
                    name="birthdate"
                    placeholder="Veuillez entrer la date de naissance"
                    onChange={this.handleChange}
                    value={birthdate}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Genre"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez selectionner le genre"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Selectionner parmis les options"
                    defaultValue={gender}
                    onChange={(data) => {
                      return this.setState({ gender: data });
                    }}
                  >
                    {[
                      {
                        _id: "male",
                        name: "Homme"
                      },
                      {
                        _id: "female",
                        name: "Femme"
                      },
                      {
                        _id: "other",
                        name: "Autre"
                      }
                    ].map((item, i) => (
                      <Option key={item?._id}>
                        <span>{item?.name}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Mot de passe"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le mot de passe de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="password"
                    type="password"
                    placeholder="Veuillez entrer le mot de passe"
                    onChange={this.handleChange}
                    value={password}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="c_password"
                  label="Confirmer Mot de passe"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez confimer le mot de passe de l'administrateur"
                    }
                  ]}
                >
                  <Input
                    name="c_password"
                    type="password"
                    placeholder="Veuillez confirmer le mot de passe"
                    onChange={this.handleChange}
                    value={c_password}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
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
                    onChange={this.handleImageChange}
                    value={pic}
                    name="pic"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="permission"
                  label="Permission"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez selectionner le genre"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Selectionner parmis les options"
                    defaultValue={permission}
                    onChange={(data) => {
                      return this.setState({ permission: data });
                    }}
                  >
                    {list.map((item, i) => (
                      <Option key={item._id}>
                        <span>{item.name}</span>
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

export default Admin_new;
