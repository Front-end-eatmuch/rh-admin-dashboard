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
import { POST } from "../constants/request-type";
import { service_api } from "../constants/url";
import { food_type, create_food_type } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import { uploadFile } from "../functions/upload-file";
import TextArea from "antd/lib/input/TextArea";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class Category_new extends Component {
  state = {
    visible: false,
    name: "",
    // icon: null,
    locked: false,
    indexation: "",
    relation: "",
    status: true,
    load: false
  };

  componentDidMount() {}
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImageChange = (e) => {
    e.preventDefault();
    return this.setState({ icon: e.target.files[0] });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { name, icon, indexation, relation, status } = this.state;

    const data = {
      name: name.toLowerCase(),
      indexation,
      relation,
      status
    };

    // if (icon === null) {
    //   this.setState({ load: false });
    //   return openNotificationWithIcon("error", "Veuillez upload l'icon");
    // }

    // const icon_url = await uploadFile(icon);

    // if (!icon_url.data.success) {
    //   this.setState({ load: false });
    //   return openNotificationWithIcon(
    //     "error",
    //     "Une erreur est survenue lors de l'envoie de l'image, veuillez ressayer"
    //   );
    // }

    const request_details = {
      type: POST,
      url: service_api,
      route: "category" + "/" + "create-category",
      data: {
        ...data,
        // icon: icon_url.data.url
      },
      token: token
    };

    if (name === "" || indexation === "" || relation === "" || status === "") {
      console.log(name, indexation, relation, status);
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs obligatoires"
      );
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
    const { name, icon, indexation, relation, status, load } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> Ajouter
        </Button>
        <Drawer
          title="Ajouter une catégorie"
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
                  name="name"
                  label="Nom"
                  rules={[
                    {
                      required: true,
                      title: "name"
                    }
                  ]}
                >
                  <Input
                    name="name"
                    placeholder="nom"
                    onChange={this.handleChange}
                    value={name}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Indexation">
                  <Input
                    name="indexation"
                    type="number"
                    placeholder="Indexation"
                    onChange={this.handleChange}
                    value={indexation}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="relation"
                  label="Relation"
                  rules={[
                    {
                      required: true,
                      message: "Relation is required"
                    }
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a relation"
                    onChange={(value) => this.setState({ relation: value })}
                    value={relation}
                    options={[
                      { value: 'Activité', label: 'Activité' },
                      { value: 'Actualité', label: 'Actualité' },
                      { value: 'Activité & Actualité', label: 'Activité & Actualité' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Statut">
                  <Select
                    name="status"
                    placeholder="Sélectionner le statut"
                    onChange={(value) => this.setState({ status: value })}
                    value={status}
                  >
                    <Option value={true}>Actif</Option>
                    <Option value={false}>Inactif</Option>
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  name="icon"
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
                    value={icon}
                    name="icon"
                  />
                </Form.Item>
              </Col> */}
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default Category_new;
