import React, { Component } from "react";
import {
  Drawer,
  Button,
  Col,
  Row,
  Space,
  Tag,
  Typography,
  Divider,
  Card
} from "antd";
import "../styles/general.css";

const { Title, Text, Paragraph } = Typography;

class Comment_edit extends Component {
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({ visible: true });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { row } = this.props;

    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          Détails
        </Button>
        <Drawer
          title={
            <Space>
              Détails du commentaire
              {row.parentComment && (
                <Tag color="orange">Réponse</Tag>
              )}
            </Space>
          }
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
            {row.parentComment && (
              <Col span={24}>
                <Card
                  title={
                    <Space>
                      <Title level={5} style={{ margin: 0 }}>Commentaire parent ID: </Title>
                      <Text type="secondary" copyable>{row.parentComment}</Text>
                    </Space>
                  }
                  size="small"
                  style={{ marginBottom: 16 }}
                >
                  <Text>Ce commentaire est une réponse à un autre commentaire</Text>
                </Card>
              </Col>
            )}

            <Col span={24}>
              <Title level={5}>Contenu</Title>
              <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
                {row.content}
              </Paragraph>
            </Col>

            <Divider />

            <Col span={24}>
              <Title level={5}>Post concerné</Title>
              <Space direction="vertical">
                <Tag color={row.postType === "actuality" ? "blue" : "cyan"}>
                  {row.postType === "actuality" ? "Actualité" : "Activité"}
                </Tag>
                <Text type="secondary" copyable>ID: {row.post}</Text>
              </Space>
            </Col>

            <Col span={24}>
              <Title level={5}>Auteur</Title>
              <Space align="center">
                {row.user?.userImg && (
                  <img
                    src={row.user.userImg}
                    alt="user"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '8px'
                    }}
                  />
                )}
                <Tag color="blue">{row.user?.firstname}</Tag>
                <Text type="secondary" copyable>ID: {row.user?._id}</Text>
              </Space>
            </Col>

            <Col span={12}>
              <Title level={5}>J'aimes</Title>
              <Tag color="blue">Like: {row.likesCount?.like || 0}</Tag>
            </Col>

            <Col span={12}>
              <Title level={5}>Statut</Title>
              <Tag color={row.isActive ? "green" : "red"}>
                {row.isActive ? "Visible" : "Masqué"}
              </Tag>
            </Col>

            {row.replies?.length > 0 && (
              <Col span={24}>
                <Title level={5}>Réponses ({row.replies.length})</Title>
                <Card size="small">
                  {row.replies.map((reply, index) => (
                    <div key={index} style={{ marginBottom: index < row.replies.length - 1 ? 16 : 0 }}>
                      <Space align="start">
                        {reply.user?.userImg && (
                          <img
                            src={reply.user.userImg}
                            alt="user"
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%'
                            }}
                          />
                        )}
                        <div>
                          <Text>{reply.content}</Text>
                          <br />
                          <Text type="secondary">
                            par {reply.user?.firstname} le {new Date(reply.createdAt).toLocaleString('fr-FR')}
                          </Text>
                        </div>
                      </Space>
                    </div>
                  ))}
                </Card>
              </Col>
            )}

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

export default Comment_edit; 