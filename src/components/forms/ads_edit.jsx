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
// import { PlusOutlined } from "@ant-design/covers";
import "../styles/general.css";

import { MakeRequestAsync } from "../functions/axios";
import { UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import { ads, update_ads } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { uploadFile } from "../functions/upload-file";
import { todayDate } from "../functions/dateFunctions";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Ads_edit extends Component {
  state = {
    visible: false,
    title: this.props.row.title,
    description: this.props.row.description,
    link: this.props.row.link,
    type: this.props.row.ads_type,
    period_end: this.props.row.period_end,
    period_start: this.props.row.period_start,
    cover: null,
    load: false
  };

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    e.preventDefault();
    return this.setState({ cover: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const today = todayDate();

    const { title, description, link, type, period_end, period_start, cover } =
      this.state;

    const data = {
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      link: link === null || link.length === 0 ? null : link,
      ads_type: type,
      period_end,
      period_start
    };

    console.log(token);

    if (
      data.title.length === 0 ||
      data.description.length === 0 ||
      data.ads_type.length === 0 ||
      data.period_end.length === 0 ||
      data.period_start.length === 0
    ) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir les champs obligatoirement"
      );
    }

    if (data.period_start < today) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "La date de début doit être supérieure ou egale à la date d'aujourd'hui"
      );
    }

    if (data.period_end < data.period_start) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "La date de fin doit être supérieure à la date de début"
      );
    }

    let cover_url;

    if (cover !== null) {
      cover_url = await uploadFile(cover);
      if (!cover_url.data.success) {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          "Une erreur est survenue lors de l'envoie de l'image, veuillez ressayer"
        );
      }
    }

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: ads + "/" + update_ads + "/" + this.props.row._id,
      data: {
        ...data,
        cover:
          cover === null || !cover_url.data.success
            ? this.props.row.cover
            : cover_url.data.url
      },
      token: token
    };

    const response = await MakeRequestAsync(request_details)
      .then((res) => {
        console.log("Done");
        this.setState({ load: false });
        return setTimeout(() => window.location.reload(), 1000);
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
    const { title, description, link, type, cover, load } = this.state;
    return (
      <>
        <Button type="danger" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Modification de bannière"
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
                  // name="title"
                  label="Titre"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer le titre de l'annonce"
                    }
                  ]}
                >
                  <Input
                    name="title"
                    placeholder="Veuillez entrer le titre de l'annonce"
                    onChange={this.handleChange}
                    value={title}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  // name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez entrer la description de l'annonce"
                    }
                  ]}
                >
                  <Input.TextArea
                    name="description"
                    rows={4}
                    placeholder="Veuillez entrer la description de l'annonce"
                    onChange={this.handleChange}
                    value={description}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="date_start_end"
                  label="Periode de depart et fin"
                  rules={[
                    {
                      required: true,
                      role: "Veuillez selectionner la periode de départ et fin"
                    }
                  ]}
                >
                  <Input.Group compact>
                    <DatePicker.RangePicker
                      onCalendarChange={(v1, v2) => {
                        console.log(v1, v2);
                        this.setState({
                          period_start: v2[0],
                          period_end: v2[1]
                        });
                      }}
                    />
                  </Input.Group>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  // name="type"
                  label="Type"
                  rules={[
                    { required: true, message: "Please choose the type" }
                  ]}
                >
                  <Select
                    placeholder="Please choose the type"
                    name="type"
                    onChange={(text) => this.setState({ type: text })}
                    value={type}
                  >
                    <Option value="click">Click</Option>
                    <Option value="link">Link</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="cover"
                  label="Icon"
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
                    value={cover}
                    name="cover"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              {type === "click" ? null : (
                <Col span={24}>
                  <Form.Item
                    // name="link"
                    label="Link"
                    rules={[
                      {
                        required: false,
                        message: "Please enter link value"
                      }
                    ]}
                  >
                    <Input
                      placeholder="Enter link"
                      name="link"
                      onChange={this.handleChange}
                      value={link}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Ads_edit;
