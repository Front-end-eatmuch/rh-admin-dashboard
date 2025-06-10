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

class Activity_edit extends Component {
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
          title="Détails de l'activité"
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
              <Title level={5}>Titre</Title>
              <Paragraph>
                {row.title}
              </Paragraph>
            </Col>

            <Col span={24}>
              <Title level={5}>Description</Title>
              <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
                {row.description}
              </Paragraph>
            </Col>

            {row.imageUrl && (
              <Col span={24}>
                <Title level={5}>Image</Title>
                <img
                  src={row.imageUrl}
                  alt="Activité"
                  style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
                />
              </Col>
            )}

            <Divider />

            <Col span={12}>
              <Title level={5}>Catégorie</Title>
              <Tag color="cyan">{row.category?.name}</Tag>
            </Col>

            <Col span={12}>
              <Title level={5}>Type d'accès</Title>
              <Space>
                <Tag color={row.paid ? "gold" : "green"}>
                  {row.paid ? "Payant" : "Gratuit"}
                </Tag>
                <Tag color={row.accessible ? "green" : "red"}>
                  {row.accessible ? "Accessible" : "Non accessible"}
                </Tag>
              </Space>
            </Col>

            <Col span={24}>
              <Title level={5}>Horaires</Title>
              <Space direction="vertical">
                <Text>Début: {new Date(row.starting).toLocaleString('fr-FR')}</Text>
                <Text>Fin: {new Date(row.ending).toLocaleString('fr-FR')}</Text>
              </Space>
            </Col>

            <Col span={12}>
              <Title level={5}>Progression</Title>
              <Tag color={
                row.progress === "À venir" ? "blue" :
                row.progress === "En cours" ? "green" :
                "orange"
              }>
                {row.progress}
              </Tag>
            </Col>

            <Col span={12}>
              <Title level={5}>Statut</Title>
              <Tag color={row.status ? "green" : "red"}>
                {row.status ? "Active" : "Inactive"}
              </Tag>
            </Col>

            <Divider />

            <Col span={24}>
              <Title level={5}>Administrateur</Title>
              <Tag color="geekblue">
                {row.adminId?.firstname} {row.adminId?.lastname}
              </Tag>
            </Col>

            <Col span={24}>
              <Title level={5}>Participants ({row.userThatPaid?.length || 0})</Title>
              <div style={{ marginTop: 8 }}>
                {row.userThatPaid?.length > 0 ? (
                  row.userThatPaid.map((user, index) => (
                    <Tag key={index} style={{ marginBottom: 8 }}>
                      {user.firstname} {user.lastname}
                    </Tag>
                  ))
                ) : (
                  <Text type="secondary">Aucun participant pour le moment</Text>
                )}
              </div>
            </Col>

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

            {row.media && (
              <Col span={24}>
                <Title level={5}>ID du média</Title>
                <Text copyable>{row.media}</Text>
              </Col>
            )}
          </Row>
        </Drawer>
      </>
    );
  }
}

export default Activity_edit; 