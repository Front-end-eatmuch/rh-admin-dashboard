import React, { Component } from "react";
import {
  Drawer,
  Button,
  Col,
  Row,
  Space,
  Tag,
  Typography,
  Divider
} from "antd";
import "../styles/general.css";

const { Title, Text, Paragraph } = Typography;

class Actuality_edit extends Component {
  state = {
    visible: false
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
    const { row } = this.props;
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Détails
        </Button>
        <Drawer
          title="Détails de l'actualité"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div style={{ textAlign: "right" }}>
              <Button onClick={this.onClose}>
                Fermer
              </Button>
            </div>
          }
        >
          <Row gutter={[16, 24]}>
            <Col span={24}>
              <Title level={5}>Contenu</Title>
              <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
                {row.content}
              </Paragraph>
            </Col>

            {row.imageUrl && (
              <Col span={24}>
                <Title level={5}>Image</Title>
                <img
                  src={row.imageUrl}
                  alt="Actualité"
                  style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
                />
              </Col>
            )}

            <Divider />

            <Col span={12}>
              <Title level={5}>Catégorie</Title>
              <Text>{row.category?.name || "Aucune catégorie"}</Text>
            </Col>

            <Col span={12}>
              <Title level={5}>Statut</Title>
              <Tag color={row.status ? "green" : "red"}>
                {row.status ? "Actif" : "Inactif"}
              </Tag>
            </Col>

            <Col span={12}>
              <Title level={5}>J'aimes</Title>
              <Space>
                <Tag color="blue">Like: {row.likesCount?.like || 0}</Tag>
                <Tag color="red">Love: {row.likesCount?.love || 0}</Tag>
              </Space>
            </Col>

            <Col span={12}>
              <Title level={5}>Auteur</Title>
              <Tag color="purple">
                {row.user?.firstname} {row.user?.lastname}
              </Tag>
            </Col>

            <Divider />

            <Col span={12}>
              <Title level={5}>Date de création</Title>
              <Text>{new Date(row.createdAt).toLocaleString('fr-FR')}</Text>
            </Col>

            <Col span={12}>
              <Title level={5}>Dernière modification</Title>
              <Text>{new Date(row.updatedAt).toLocaleString('fr-FR')}</Text>
            </Col>

            <Col span={24}>
              <Title level={5}>Identifiant</Title>
              <Text copyable>{row._id}</Text>
            </Col>
          </Row>
        </Drawer>
      </>
    );
  }
}

export default Actuality_edit; 