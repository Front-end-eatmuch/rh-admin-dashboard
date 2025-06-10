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
import { country, create_country, update_country } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { uploadFile } from "../functions/upload-file";
import ReactQuill from "react-quill";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Country_edit extends Component {
  state = {
    visible: false,
    country_name: this.props.row?.country?.country_name,
    country_code: this.props.row?.country?.country_code,
    digit_limit: this.props.row?.country?.digit_limit,
    currency_name: this.props.row?.currency?.currency_name,
    currency_code: this.props.row.currency?.currency_code,
    currency_symbol: this.props.row?.currency?.currency_symbol,
    currency_decimal: this.props.row?.currency?.currency_decimal,
    max_payment: this.props.row?.max_payment,
    food_limit: this.props.row?.food_limit,
    max_dish: this.props.row?.max_dish,
    maintenance: this.props.row?.general.maintenance,
    version: this.props.row.general?.version,
    fee: this.props.row.fee,
    delivery_fee: this.props.row.delivery_fee,
    earn_delivery_pani: this.props.row.earn_delivery_pani,
    min_payment: this.props.row.min_payment,
    max_cancellation_waiting_time: this.props.row.max_cancellation_waiting_time,
    deduction_charges_type: this.props.row.deduction_charges_type,
    deduction_charges_value: this.props.row.deduction_charges_value,
    logo: null,
    flag: null,
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
    url_to_tiktok: this.props.row?.social?.url_to_tiktok,
    load: false
  };

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    e.preventDefault();
    return this.setState({ flag: e.target.files[0] });
  };

  handleImage = (e) => {
    e.preventDefault();
    return this.setState({ logo: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const {
      country_name,
      country_code,
      digit_limit,
      flag,
      currency_name,
      currency_code,
      currency_symbol,
      currency_decimal,
      fee,
      delivery_fee,
      max_cancellation_waiting_time,
      deduction_charges_type,
      deduction_charges_value,
      earn_delivery_pani,
      min_payment,
      food_limit,
      max_dish,
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
      country_name: country_name.toLowerCase(),
      country_code: country_code.toLowerCase(),
      digit_limit: digit_limit,
      currency_name: currency_name.toLowerCase(),
      currency_code: currency_code.toLowerCase(),
      currency_symbol: currency_symbol.toLowerCase(),
      food_limit: food_limit,
      max_dish: max_dish,
      max_payment: max_payment,
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
      maintenance: maintenance,
      earn_delivery_pani,
      min_payment,
      fee: fee,
      delivery_fee: delivery_fee,
      max_cancellation_waiting_time: max_cancellation_waiting_time,
      deduction_charges_type: deduction_charges_type,
      deduction_charges_value: deduction_charges_value
    };

    // console.log(token);

    let pic, flag_url;
    if (logo !== null) {
      pic = await uploadFile(logo);
      if (!pic.data.success) {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          "Une erreur est survenue lors de l'upload du logo"
        );
      }
    }

    if (flag !== null) {
      flag_url = await uploadFile(flag);
      if (!flag_url.data.success) {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          "Une erreur est survenue lors de l'upload du drapeau"
        );
      }
    }

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: country + "/" + update_country + "/" + this.props.row._id,
      data: {
        country: {
          country_code: data.country_code,
          country_name: data.country_name,
          digit_limit: data.digit_limit,
          flag:
            flag !== null ? flag_url.data.url : this.props.row?.country?.flag
        },
        currency: {
          currency_name: data.currency_name,
          currency_code: data.currency_code,
          currency_symbol: data.currency_symbol,
          currency_decimal: data.currency_decimal
        },
        food_limit,
        max_payment,
        max_dish,
        fee,
        delivery_fee,
        max_cancellation_waiting_time,
        deduction_charges_type,
        deduction_charges_value,
        earn_delivery_pani,
        min_payment,
        general: {
          terms: data.terms,
          about_us: data.about_us,
          version: data.version,
          contact_us: data.contact_us,
          maintenance: data.maintenance,
          logo: logo !== null ? pic.data.url : this.props.row.general.logo
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
          url_to_linkedin: data.url_to_linkedin,
          url_to_tiktok: data.url_to_tiktok
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
      country_name,
      country_code,
      digit_limit,
      flag,
      fee,
      delivery_fee,
      max_cancellation_waiting_time,
      earn_delivery_pani,
      min_payment,
      deduction_charges_type,
      deduction_charges_value,
      currency_name,
      currency_code,
      currency_symbol,
      currency_decimal,
      max_dish,
      food_limit,
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
      url_to_tiktok,
      load
    } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Modification de pays"
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
                  label="Nom du pays"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le code du pays"
                    }
                  ]}
                >
                  <Input
                    name="country_name"
                    placeholder="Veuillez entrer le nom du pays"
                    onChange={this.handleChange}
                    value={country_name}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  // name="digit_limit"
                  label="Nombre max numéro de téléphone"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le code du pays"
                    }
                  ]}
                >
                  <Input
                    name="digit_limit"
                    type="number"
                    placeholder="Nombre max numéro de téléphone"
                    onChange={this.handleChange}
                    value={digit_limit}
                  />
                </Form.Item>
              </Col>
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
                      role: "Veuillez entrer le numéro"
                    }
                  ]}
                >
                  <Input
                    name="contact_us"
                    placeholder="Veuillez entrer le numéro"
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
                  <ReactQuill
                    theme="snow"
                    value={terms}
                    onChange={(e) => {
                      this.setState({
                        terms: e
                      });
                    }}
                  />
                  {/* <Input.TextArea
                    rows={4}
                    name="terms"
                    placeholder="Veuillez entrer les conditions d'utilisation"
                    onChange={this.handleChange}
                    value={terms}
                  /> */}
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
                  <ReactQuill
                    theme="snow"
                    value={about_us}
                    onChange={(e) => {
                      this.setState({
                        about_us: e
                      });
                    }}
                  />

                  {/* <Input.TextArea
                    rows={4}
                    name="about_us"
                    placeholder="Veuillez entrer les informations sur nous"
                    onChange={this.handleChange}
                    value={about_us}
                  /> */}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Comission sur commande (%)"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer la commission sur commande"
                    }
                  ]}
                >
                  <Input
                    name="fee"
                    placeholder="Commission sur commande"
                    onChange={this.handleChange}
                    value={fee}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Frais de livraison / km ($)"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer les frais de livraison"
                    }
                  ]}
                >
                  <Input
                    name="delivery_fee"
                    placeholder="frais de livraison"
                    onChange={this.handleChange}
                    value={delivery_fee}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Gain Pani sur livraison (%)"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer les gain de livraison"
                    }
                  ]}
                >
                  <Input
                    name="earn_delivery_pani"
                    placeholder="Gain Pani sur livraison"
                    onChange={this.handleChange}
                    value={earn_delivery_pani}
                    type="number"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  // name="gender"
                  label="Type de valeur sur annulation"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez selectionner le type"
                    }
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Selectionner parmis les options"
                    defaultValue={deduction_charges_type}
                    onChange={(data) => {
                      return this.setState({ deduction_charges_type: data });
                    }}
                  >
                    {[
                      {
                        _id: "flat",
                        name: "valeur"
                      },
                      {
                        _id: "per",
                        name: "pourcentage"
                      }
                    ].map((item, i) => (
                      <Option key={item?._id}>
                        <span>{item?.name}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Valeur à deduire sur annulation"
                  rules={[
                    {
                      required: true,
                      role: "Valeur de déduction sur anulation"
                    }
                  ]}
                >
                  <Input
                    name="deduction_charges_value"
                    placeholder="Valeur à deduire sur annulation"
                    onChange={this.handleChange}
                    value={deduction_charges_value}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Durée maximale d'annulation (en minute)"
                  rules={[
                    {
                      required: true,
                      role: "Durée maximale d'annulation"
                    }
                  ]}
                >
                  <Input
                    name="max_cancellation_waiting_time"
                    placeholder="Durée maximale d'annulation (en minute)"
                    onChange={this.handleChange}
                    value={max_cancellation_waiting_time}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Maximum de plats (chef)"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le maxium de plat"
                    }
                  ]}
                >
                  <Input
                    name="max_dish"
                    placeholder="Maximum de plats"
                    onChange={this.handleChange}
                    value={max_dish}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Limite de plats (client)"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer la limite de plat"
                    }
                  ]}
                >
                  <Input
                    name="food_limit"
                    placeholder="Limit de plats"
                    onChange={this.handleChange}
                    value={food_limit}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Paiement Minimal"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le paiement minimal"
                    }
                  ]}
                >
                  <Input
                    name="min_payment"
                    placeholder="Paiement minimal"
                    onChange={this.handleChange}
                    value={min_payment}
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
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
              <Col span={12}>
                <Form.Item
                  name="drapeau"
                  label="Drapeau pays"
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
                    onChange={(e) => this.handleImageChange(e, "flag")}
                    value={flag}
                    name="flag"
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
              <Col span={12}>
                <Form.Item
                  label="Lien a tiktok"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le lien a tiktok"
                    }
                  ]}
                >
                  <Input
                    name="url_to_tiktok"
                    placeholder="Veuillez entrer le lien a tiktok"
                    onChange={this.handleChange}
                    value={url_to_tiktok}
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

export default Country_edit;
