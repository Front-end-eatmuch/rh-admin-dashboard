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
import { POST, GET, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  country,
  get_all_country,
  user,
  create_user,
  update_user,
  document,
  update_document_user
  // update_password_user
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";

import { uploadFile } from "../functions/upload-file";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class User_doc extends Component {
  state = {
    visible: false,
    cni_number: "",
    pic_front_cni: null,
    pic_back_cni: null,
    company_reg_number: "",
    company_reg_pic: null,
    expiry_date_cni: "",
    account_type: this.props.row.account_type,
    load: false
  };

  componentDidMount() {}
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleImage = (e, name) => {
    e.preventDefault();
    return this.setState({ [name]: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { account_type } = this.state;
    this.setState({ load: true });

    const {
      cni_number,
      pic_front_cni,
      pic_back_cni,
      company_reg_number,
      company_reg_pic,
      expiry_date_cni
    } = this.state;

    const data = {
      cni_number,
      pic_front_cni,
      pic_back_cni,
      company_reg_number,
      company_reg_pic,
      expiry_date_cni
    };

    if (
      account_type === "business" &&
      (cni_number === null ||
        pic_front_cni === null ||
        pic_back_cni === null ||
        company_reg_number === null ||
        company_reg_pic === null ||
        expiry_date_cni === null)
    ) {
      this.setState({ load: false });
      openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs présent dans le formulaire"
      );
    }

    if (
      account_type === "normal" &&
      (cni_number === null ||
        pic_front_cni === null ||
        pic_back_cni === null ||
        expiry_date_cni === null)
    ) {
      this.setState({ load: false });
      openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs présent dans le formulaire"
      );
    }

    let pic_front_cni_url, pic_back_cni_url, company_reg_pic_url;

    pic_front_cni_url = await uploadFile(pic_front_cni);
    if (!pic_front_cni_url.data.success) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Une erreur est survenue lors de l'upload des documents"
      );
    }

    pic_back_cni_url = await uploadFile(pic_back_cni);
    if (!pic_back_cni_url.data.success) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Une erreur est survenue lors de l'upload des documents"
      );
    }

    if (company_reg_pic !== null) {
      company_reg_pic_url = await uploadFile(company_reg_pic);
      if (!company_reg_pic_url.data.success) {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          "Une erreur est survenue lors de l'upload des documents"
        );
      }
    }

    let finalData;

    if (account_type === "business") {
      finalData = {
        ...data,
        pic_front_cni: pic_front_cni_url.data.url,
        pic_back_cni: pic_back_cni_url.data.url,
        company_reg_pic: company_reg_pic_url.data.url
      };
    }
    if (account_type === "normal") {
      finalData = {
        ...data,
        company_reg_number: null,
        pic_front_cni: pic_front_cni_url.data.url,
        pic_back_cni: pic_back_cni_url.data.url
      };
    }

    const request_details = {
      type: UPDATE,
      url: service_api,
      route:
        document +
        "/" +
        update_document_user +
        "/" +
        this.props.row.document_id._id,
      data: finalData,
      token: token
    };

    console.log(request_details);

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
      cni_number,
      pic_front_cni,
      pic_back_cni,
      company_reg_number,
      company_reg_pic,
      expiry_date_cni,
      account_type,
      load
    } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Documents
        </Button>
        <Drawer
          title="Modification des documents"
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
                  label="CNI/PASSPORT NUMÉRO"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le numéro de votre CNI/PASSPORT"
                    }
                  ]}
                >
                  <Input
                    name="cni_number"
                    placeholder="Veuillez entrer le numéro de votre CNI/PASSPORT"
                    onChange={this.handleChange}
                    value={cni_number}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="EXPIRATION CNI/PASSPORT"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer la date d'expiration de votre CNI/PASSPORT"
                    }
                  ]}
                >
                  <Input
                    name="expiry_date_cni"
                    placeholder="Veuillez entrer la date d'expiration de votre CNI/PASSPORT"
                    onChange={this.handleChange}
                    value={expiry_date_cni}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="pic_front_cni"
                  label="Photo AVANT CNI/PASSPORT"
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
                    onChange={(e) => this.handleImage(e, "pic_front_cni")}
                    value={pic_front_cni}
                    name="pic_front_cni"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="pic_back_cni"
                  label="Photo ARRIÈRE CNI/PASSPORT"
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
                    onChange={(e) => this.handleImage(e, "pic_back_cni")}
                    value={pic_back_cni}
                    name="pic_back_cni"
                  />
                </Form.Item>
              </Col>
            </Row>
            {account_type === "business" && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="REGISTRE D'IMMATRICULATION ENTREPRISE"
                    rules={[
                      {
                        required: true,
                        role: "Veuillez entrer le numéro du registre de commerce"
                      }
                    ]}
                  >
                    <Input
                      name="company_reg_number"
                      placeholder="Veuillez entrer le numéro du registre de commerce"
                      onChange={this.handleChange}
                      value={company_reg_number}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="company_reg_pic"
                    label="Photo REGISTRE D'IMMATRICULATION ENTREPRISE"
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
                      onChange={(e) => this.handleImage(e, "company_reg_pic")}
                      value={company_reg_pic}
                      name="company_reg_pic"
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
          </Form>
        </Drawer>
      </>
    );
  }
}

export default User_doc;
