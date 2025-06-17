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
  Form,
  Input,
  Select,
  Switch,
  Upload,
  message,
  Modal,
  DatePicker,
  InputNumber
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../styles/general.css";
import { UPDATE, GET } from "../constants/request-type";
import { service_api } from "../constants/url";
import { activity, category, get_all_category } from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Fonction utilitaire pour convertir un fichier en base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

class Activity_edit extends Component {
  state = {
    visible: false,
    loading: false,
    editMode: false,
    previewImage: null,
    previewVisible: false,
    selectedFile: null,
    categories: [],
    isPaid: false
  };

  componentDidMount() {
    this.getCategories();
    this.setState({ isPaid: this.props.row.paid?.paid || false });
  }

  getCategories = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: category + "/" + get_all_category,
      data: null,
      token: sessionStorage.getItem("auth_token")
    };
    
    try {
      const response = await MakeRequestAsync(request_details);
      console.log('All Categories:', response.data);
      
      // Filtrer pour ne garder que les catégories avec relation "Activité" ou "Activité & Actualité"
      const activityCategories = (response.data.category || []).filter(
        cat => cat.relation === "Activité" || cat.relation === "Activité & Actualité"
      );
      
      console.log('Filtered Categories:', activityCategories);
      this.setState({ categories: activityCategories });
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err);
      openNotificationWithIcon("error", "Erreur lors du chargement des catégories");
    }
  };

  showDrawer = () => {
    this.setState({
      visible: true,
      previewImage: this.props.row.imageUrl,
      editMode: false
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      editMode: false,
      previewImage: null
    });
  };

  toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ 
          previewImage: e.target.result,
          selectedFile: file 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  handleSubmit = async (values) => {
    this.setState({ loading: true });
    const formData = new FormData();

    // Ajout des champs du formulaire au FormData
    Object.keys(values).forEach(key => {
      if (key === 'starting' || key === 'ending') {
        // Conversion des dates moment en ISO string
        formData.append(key, values[key].toISOString());
      } else if (key === 'paid') {
        // Structure du champ paid
        formData.append('paid[paid]', values.paid);
        formData.append('paid[amount]', values.amount || 0);
      } else {
        formData.append(key, values[key]);
      }
    });

    // Ajout du fichier image si sélectionné
    if (this.state.selectedFile) {
      formData.append('media', this.state.selectedFile);
    }

    console.log(values);

    const request_details = {
      type: UPDATE,
      url: service_api,
      contentType: "multipart/form-data",
      route: activity + "/admin/update-activity/" + this.props.row._id,
      data: formData,
      token: sessionStorage.getItem("auth_token")
    };

    try {
      const response = await MakeRequestAsync(request_details);
      openNotificationWithIcon("success", "Activité mise à jour avec succès");
      this.setState({ editMode: false });
      console.log(response);
      window.location.reload();
    } catch (err) {
      openNotificationWithIcon("error", err?.response?.data?.message || "Erreur lors de la mise à jour");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { row } = this.props;
    const { loading, editMode, categories } = this.state;

    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          {editMode ? "Modifier" : "Détails"}
        </Button>
        <Drawer
          title={editMode ? "Modifier l'activité" : "Détails de l'activité"}
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div style={{ textAlign: "right" }}>
              {!editMode ? (
                <>
                  <Button onClick={this.toggleEditMode} type="primary" style={{ marginRight: 8 }}>
                    Modifier
                  </Button>
                  <Button onClick={this.onClose}>
                    Fermer
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={this.toggleEditMode} style={{ marginRight: 8 }}>
                    Annuler
                  </Button>
                  <Button 
                    type="primary" 
                    form="activityForm" 
                    htmlType="submit"
                    loading={loading}
                  >
                    Enregistrer
                  </Button>
                </>
              )}
            </div>
          }
        >
          {!editMode ? (
            // Mode affichage
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Title level={5}>Titre</Title>
                <Paragraph>{row.title}</Paragraph>
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
                  <Tag color={row.paid?.paid ? "gold" : "green"}>
                    {row.paid?.paid ? `Payant (${row.paid.amount.toLocaleString()} CFA)` : "Gratuit"}
                  </Tag>
                  <Tag color={row.accessible ? "green" : "red"}>
                    {row.accessible ? "Accessible" : "Non accessible"}
                  </Tag>
                </Space>
              </Col>

              <Col span={24}>
                <Title level={5}>Horaires</Title>
                <Space direction="vertical">
                  <Text>Début: {moment(row.starting).format('DD/MM/YYYY HH:mm')}</Text>
                  <Text>Fin: {moment(row.ending).format('DD/MM/YYYY HH:mm')}</Text>
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
                    row.userThatPaid.map((participation, index) => (
                      <Tag key={index} style={{ marginBottom: 8 }}>
                        {participation.user.firstname} {participation.user.lastname}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">Aucun participant pour le moment</Text>
                  )}
                </div>
              </Col>

              <Col span={12}>
                <Title level={5}>Date de création</Title>
                <Text>{moment(row.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
              </Col>

              <Col span={12}>
                <Title level={5}>Dernière modification</Title>
                <Text>{moment(row.updatedAt).format('DD/MM/YYYY HH:mm')}</Text>
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
          ) : (
            // Mode édition
            <Form
              id="activityForm"
              layout="vertical"
              initialValues={{
                title: row.title,
                description: row.description,
                category: row.category?._id,
                paid: row.paid?.paid || false,
                amount: row.paid?.amount || 0,
                accessible: row.accessible,
                progress: row.progress,
                status: row.status,
                starting: moment(row.starting),
                ending: moment(row.ending)
              }}
              onFinish={this.handleSubmit}
            >
              <Row gutter={[16, 24]}>
                <Col span={24}>
                  <Form.Item
                    name="title"
                    label="Titre"
                    rules={[{ required: true, message: 'Veuillez entrer un titre' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Veuillez entrer une description' }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="image"
                    label="Image"
                  >
                    <div>
                      <div>
                        <label style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>
                          Choisissez une image :
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={this.handleChange}
                          style={{ border: '1px solid #d9d9d9', padding: '8px', borderRadius: '4px', width: '100%' }}
                        />
                      </div>
                      
                      {this.state.previewImage && (
                        <div style={{ marginTop: 16 }}>
                          <img
                            src={this.state.previewImage}
                            alt="Prévisualisation"
                            style={{ 
                              width: '256px', 
                              height: 'auto', 
                              borderRadius: '8px',
                              cursor: 'pointer',
                              border: '1px solid #d9d9d9'
                            }}
                            onClick={() => this.setState({ previewVisible: true })}
                          />
                        </div>
                      )}
                    </div>
                  </Form.Item>
                </Col>

                <Col span={12}>
                                  <Form.Item
                  name="category"
                  label="Catégorie"
                  rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
                >
                  <Select loading={categories.length === 0}>
                    {categories.map((cat) => (
                      <Option key={cat._id} value={cat._id}>
                        {cat.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="progress"
                    label="Progression"
                    rules={[{ required: true, message: 'Veuillez sélectionner une progression' }]}
                  >
                    <Select>
                      <Option value="À venir">À venir</Option>
                      <Option value="En cours">En cours</Option>
                      <Option value="Terminé">Terminé</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="paid"
                    label="Payant"
                    valuePropName="checked"
                  >
                    <Switch onChange={(e) => this.setState({ isPaid: e })} />
                  </Form.Item>
                </Col>

                {this.state.isPaid && (
                  <Col span={24}>
                    <Form.Item
                      name="amount"
                      label="Montant (CFA)"
                      rules={[
                        { required: true, message: 'Veuillez entrer un montant' },
                        { type: 'number', min: 0, message: 'Le montant doit être positif' }
                      ]}
                    >
                      <InputNumber min={0} step={1} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                )}

                <Col span={8}>
                  <Form.Item
                    name="accessible"
                    label="Accessible"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    name="status"
                    label="Statut"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="starting"
                    label="Date de début"
                    rules={[{ required: true, message: 'Veuillez sélectionner une date de début' }]}
                  >
                    <DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="ending"
                    label="Date de fin"
                    rules={[{ required: true, message: 'Veuillez sélectionner une date de fin' }]}
                  >
                    <DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </Drawer>
        <Modal
          visible={this.state.previewVisible}
          title="Prévisualisation de l'image"
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="Prévisualisation" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </>
    );
  }
}

export default Activity_edit; 