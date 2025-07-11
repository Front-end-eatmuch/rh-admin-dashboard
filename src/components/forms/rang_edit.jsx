import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Space,
  Spin,
  InputNumber,
  Switch
} from "antd";
import "../styles/general.css";

import { MakeRequestAsync } from "../functions/axios";
import { UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import { rang } from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";

const token = sessionStorage.getItem("auth_token");

class Rang_edit extends Component {
  state = {
    visible: false,
    title: this.props.row.title || "",
    level: this.props.row.level || 1,
    isActive: this.props.row.isActive || false,
    load: false
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const { title, level, isActive } = this.state;

    const data = {
      title,
      level,
      isActive
    };

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: rang + "/" + "update-rang" + "/" + this.props.row._id,
      data: data,
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", err);
    });

    if (response?.data?.success === true) {
      openNotificationWithIcon("success", "Rang mis à jour avec succès");
      this.setState({ visible: false });
      window.location.reload();
    }
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      title: this.props.row.title || "",
      level: this.props.row.level || 1,
      isActive: this.props.row.isActive || false
    });
  };

  render() {
    const { title, level, isActive, load } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Modifier
        </Button>
        <Drawer
          title="Modification de rang"
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
                  label="Titre"
                  rules={[
                    { required: true, message: "Veuillez entrer le titre" },
                    { min: 3, message: "Le titre doit contenir au moins 3 caractères" }
                  ]}
                >
                  <Input
                    name="title"
                    placeholder="Ex: Président du Parti"
                    onChange={this.handleChange}
                    value={title}
                    maxLength={50}
                    showCount
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Niveau"
                  rules={[
                    { required: true, message: "Veuillez entrer le niveau" },
                    { type: 'number', min: 1, message: "Le niveau doit être supérieur à 0" }
                  ]}
                >
                  <InputNumber
                    name="level"
                    min={1}
                    max={100}
                    value={level}
                    onChange={(value) => this.setState({ level: value })}
                    style={{ width: '100%' }}
                    placeholder="Ex: 1"
                    addonBefore="Niveau"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Statut"
                  rules={[{ required: true, message: "Veuillez sélectionner le statut" }]}
                >
                  <Switch
                    name="isActive"
                    checked={isActive}
                    onChange={(checked) => this.setState({ isActive: checked })}
                    checkedChildren="Actif"
                    unCheckedChildren="Inactif"
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

export default Rang_edit; 