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
import "../styles/general.css";

import { MakeRequestAsync } from "../functions/axios";
import { POST, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import { setting, create_setting, update_setting } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { uploadFile } from "../functions/upload-file";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Setting_edit extends Component {
  state = {
    visible: false,
    country_code: this.props.row?.country_code,
    currency_name: this.props.row?.currency?.currency_name,
    currency_code: this.props.row.currency?.currency_code,
    currency_symbol: this.props.row?.currency?.currency_symbol,
    currency_decimal: this.props.row?.currency?.currency_decimal,
    max_payment: this.props.row?.max_payment,
    ticket_limit: this.props.row?.ticket_limit,
    maintenance: this.props.row?.general.maintenance,
    version: this.props.row.general?.version,
    logo: null,
    terms: this.props.row?.general?.terms,
    about_us: this.props.row?.general?.about_us,
    contact_us: this.props.row?.general?.contact_us,
    support_contact: this.props.row?.social?.support_contact,
    support_email: this.props.row?.social?.support_email,
    support_whatsapp: this.props.row?.social?.support_whatsapp,
    support_telegram: this.props.row?.social?.support_telegram,
    url_to_app: this.props.row?.social?.url_to_app,
    url_to_web: this.props.row?.social?.url_to_web,
    url_to_facebook: this.props.row?.social?.url_to_facebook,
    url_to_instagram: this.props.row?.social?.url_to_instagram,
    url_to_twitter: this.props.row?.social?.url_to_twitter,
    url_to_youtube: this.props.row?.social?.url_to_youtube,
    url_to_linkedin: this.props.row?.social?.url_to_linkedin,
    load: false
  };

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImage = (e, name) => {
    e.preventDefault();
    return this.setState({ [name]: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const {
      country_code,
      currency_name,
      currency_code,
      currency_symbol,
      currency_decimal,
      ticket_limit,
      version,
      max_payment,
      maintenance,
      terms,
      logo,
      about_us,
      contact_us,
      support_contact,
      support_email,
      support_whatsapp,
      support_telegram,
      url_to_app,
      url_to_web,
      url_to_facebook,
      url_to_instagram,
      url_to_twitter,
      url_to_youtube,
      url_to_linkedin
    } = this.state;

    const data = {
      country_code: country_code.toLowerCase(),
      currency_name: currency_name.toLowerCase(),
      currency_code: currency_code.toLowerCase(),
      currency_symbol: currency_symbol.toLowerCase(),
      ticket_limit: ticket_limit,
      version: version.toLowerCase(),
      currency_decimal: currency_decimal,
      terms: terms.toLowerCase(),
      about_us: about_us.toLowerCase(),
      contact_us: contact_us,
      support_contact: support_contact,
      support_email: support_email.toLowerCase(),
      support_whatsapp: support_whatsapp,
      support_telegram: support_telegram,
      url_to_app: url_to_app.toLowerCase(),
      url_to_web: url_to_web.toLowerCase(),
      url_to_facebook: url_to_facebook.toLowerCase(),
      url_to_instagram: url_to_instagram.toLowerCase(),
      url_to_twitter: url_to_twitter.toLowerCase(),
      url_to_youtube: url_to_youtube.toLowerCase(),
      url_to_linkedin: url_to_linkedin.toLowerCase(),
      max_payment: max_payment,
      maintenance: maintenance
    };

    console.log(token);

    let pic;
    if (logo !== null) {
      pic = await uploadFile(logo);
      if (!pic.data.success) {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          "Une erreur est survenue lors de l'upload des documents"
        );
      }
    }

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: setting + "/" + update_setting + "/" + this.props.row._id,
      data: {
        country_code: data.country_code,
        currency: {
          currency_name: data.currency_name,
          currency_code: data.currency_code,
          currency_symbol: data.currency_symbol,
          currency_decimal: data.currency_decimal
        },
        ticket_limit,
        max_payment,
        general: {
          terms: data.terms,
          about_us: data.about_us,
          version: data.version,
          contact_us: data.contact_us,
          maintenance: data.maintenance,
          logo: logo !== null ? pic.data.url : this.props.row.logo
        },
        social: {
          support_contact: data.support_contact,
          support_email: data.support_email,
          support_whatsapp: data.support_whatsapp,
          support_telegram: data.support_telegram,
          url_to_app: data.url_to_app,
          url_to_web: data.url_to_web,
          url_to_facebook: data.url_to_facebook,
          url_to_instagram: data.url_to_instagram,
          url_to_twitter: data.url_to_twitter,
          url_to_youtube: data.url_to_youtube,
          url_to_linkedin: data.url_to_linkedin
        }
      },
      token: token
    };

    const response = await MakeRequestAsync(request_details)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          "Une erreur est survenue lors de la demande veuillez ressayer"
        );
      });

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
    const {
      country_code,
      currency_name,
      currency_code,
      currency_symbol,
      currency_decimal,
      ticket_limit,
      max_payment,
      maintenance,
      logo,
      version,
      terms,
      about_us,
      contact_us,
      support_contact,
      support_email,
      support_whatsapp,
      support_telegram,
      url_to_app,
      url_to_web,
      url_to_facebook,
      url_to_instagram,
      url_to_twitter,
      url_to_youtube,
      url_to_linkedin,
      load
    } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Modification de configuration"
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
                  // name="name"
                  label="Code pays"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le code du pays"
                    }
                  ]}
                >
                  <Input
                    name="country_code"
                    placeholder="Veuillez entrer le code du pays"
                    onChange={this.handleChange}
                    value={country_code}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  // name="code"
                  label="Nom de la monnaie"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le nom de la monnaie"
                    }
                  ]}
                >
                  <Input
                    name="currency_name"
                    placeholder="Ex: FCFA"
                    onChange={this.handleChange}
                    value={currency_name}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  // name="digit_limit"
                  label="Code de la monnaie"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le code de la monnaie"
                    }
                  ]}
                >
                  <Input
                    name="currency_code"
                    placeholder="Ex: XOF"
                    onChange={this.handleChange}
                    value={currency_code}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  // name="digit_limit"
                  label="Symbole de la monnaie"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le symbole de la monnaie"
                    }
                  ]}
                >
                  <Input
                    name="currency_symbol"
                    placeholder="Ex: $, XOF"
                    onChange={this.handleChange}
                    value={currency_symbol}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  // name="digit_limit"
                  label="Valeur decimal"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer la valeur de la monnaie"
                    }
                  ]}
                >
                  <Input
                    name="currency_decimal"
                    type="number"
                    placeholder="Ex: 655.XX"
                    onChange={this.handleChange}
                    value={currency_decimal}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  // name="verify"
                  label="Contactez nous"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le numéro Treiize"
                    }
                  ]}
                >
                  <Input
                    name="contact_us"
                    placeholder="Veuillez entrer le numéro Treiize"
                    onChange={this.handleChange}
                    value={contact_us}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  // name="verify"
                  label="Terms & Conditions"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer les conditions d'utilisation"
                    }
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    name="terms"
                    placeholder="Veuillez entrer les conditions d'utilisation"
                    onChange={this.handleChange}
                    value={terms}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  // name="verify"
                  label="À propos de nous"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer les informations sur nous"
                    }
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    name="about_us"
                    placeholder="Veuillez entrer les informations sur nous"
                    onChange={this.handleChange}
                    value={about_us}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Limite ticket"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer la limite de ticket"
                    }
                  ]}
                >
                  <Input
                    name="ticket_limit"
                    placeholder="Limit ticket"
                    onChange={this.handleChange}
                    value={ticket_limit}
                    type="number"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Paiement Maximal"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le montant maximal de paiement"
                    }
                  ]}
                >
                  <Input
                    name="max_payment"
                    placeholder="Montant maximal"
                    onChange={this.handleChange}
                    value={max_payment}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Version"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer la version"
                    }
                  ]}
                >
                  <Input
                    name="version"
                    placeholder="Version logiciel"
                    onChange={this.handleChange}
                    value={version}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  // name="maintenance"
                  label="Mode Maintenance"
                  rules={[
                    {
                      required: true,
                      role: "Mode maintenance"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Maintenance"
                    defaultValue={maintenance}
                    onChange={(data) => {
                      return this.setState({
                        maintenance: data
                      });
                    }}
                  >
                    {[
                      { label: "Oui", value: true },
                      { label: "Non", value: false }
                    ].map((item) => (
                      <Option key={item.value} value={item.value}>
                        <span>{item.label}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="logo"
                  label="Logo plateforme"
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
                    onChange={(e) => this.handleImage(e, "logo")}
                    value={logo}
                    name="logo"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Contact Support"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le contact support"
                    }
                  ]}
                >
                  <Input
                    name="support_contact"
                    placeholder="Veuillez entrer le contact support"
                    onChange={this.handleChange}
                    value={support_contact}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email Support"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le email support"
                    }
                  ]}
                >
                  <Input
                    name="support_email"
                    placeholder="Veuillez entrer le email support"
                    onChange={this.handleChange}
                    value={support_email}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Whatsapp Support"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le whatsapp support"
                    }
                  ]}
                >
                  <Input
                    name="support_whatsapp"
                    placeholder="Veuillez entrer le whatsapp support"
                    onChange={this.handleChange}
                    value={support_whatsapp}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Telegram Support"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le telegram support"
                    }
                  ]}
                >
                  <Input
                    name="support_telegram"
                    placeholder="Veuillez entrer le telegram support"
                    onChange={this.handleChange}
                    value={support_telegram}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Lien au web"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le lien au web"
                    }
                  ]}
                >
                  <Input
                    name="url_to_web"
                    placeholder="Veuillez entrer le lien au web"
                    onChange={this.handleChange}
                    value={url_to_web}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Lien aux apps"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le lien aux apps"
                    }
                  ]}
                >
                  <Input
                    name="url_to_app"
                    placeholder="Veuillez entrer le lien aux apps"
                    onChange={this.handleChange}
                    value={url_to_app}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Lien a facebook"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le lien a facebook"
                    }
                  ]}
                >
                  <Input
                    name="url_to_facebook"
                    placeholder="Veuillez entrer le lien a facebook"
                    onChange={this.handleChange}
                    value={url_to_facebook}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Lien a instagram"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le lien a instagram"
                    }
                  ]}
                >
                  <Input
                    name="url_to_instagram"
                    placeholder="Veuillez entrer le lien a instagram"
                    onChange={this.handleChange}
                    value={url_to_instagram}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Lien a twitter"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le lien a twitter"
                    }
                  ]}
                >
                  <Input
                    name="url_to_twitter"
                    placeholder="Veuillez entrer le lien a twitter"
                    onChange={this.handleChange}
                    value={url_to_twitter}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Lien a youtube"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le lien a youtube"
                    }
                  ]}
                >
                  <Input
                    name="url_to_youtube"
                    placeholder="Veuillez entrer le lien a youtube"
                    onChange={this.handleChange}
                    value={url_to_youtube}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Lien a linkedin"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le lien a linkedin"
                    }
                  ]}
                >
                  <Input
                    name="url_to_linkedin"
                    placeholder="Veuillez entrer le lien a linkedin"
                    onChange={this.handleChange}
                    value={url_to_linkedin}
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

export default Setting_edit;
