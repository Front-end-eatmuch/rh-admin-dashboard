import React, { Component } from "react";
import {
  Drawer,
  Button,
  Col,
  Row,
  Typography,
  Form,
  Input,
  Select,
  Switch,
  message,
  Modal,
  DatePicker
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/general.css";
import { POST, GET } from "../constants/request-type";
import { service_api } from "../constants/url";
import { activity, create_activity, category, get_all_category } from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import moment from 'moment';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class Activity_new extends Component {
  state = {
    visible: false,
    loading: false,
    previewImage: null,
    previewVisible: false,
    selectedFile: null,
    categories: []
  };

  componentDidMount() {
    this.getCategories();
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
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      previewImage: null,
      selectedFile: null
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
      } else {
        formData.append(key, values[key]);
      }
    });

    // Ajout de l'adminId (récupéré depuis le token ou les props)
    // const adminId = sessionStorage.getItem("admin_id") || "defaultAdminId"; // À adapter selon votre logique
    // formData.append('adminId', adminId);

    // Ajout du fichier image si sélectionné
    if (this.state.selectedFile) {
      formData.append('media', this.state.selectedFile);
    }

    // console.log('Form values:', values);

    const request_details = {
      type: POST,
      url: service_api,
      contentType: "multipart/form-data",
      route: activity + "/admin/" + create_activity,
      data: formData,
      token: sessionStorage.getItem("auth_token")
    };

    try {
      const response = await MakeRequestAsync(request_details);
      openNotificationWithIcon("success", "Activité créée avec succès");
      this.onClose();
      console.log(response);
       window.location.reload();
    } catch (err) {
      openNotificationWithIcon("error", err?.response?.data?.message || "Erreur lors de la création");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, categories } = this.state;

    return (
      <>
        <Button type="primary" onClick={this.showDrawer} icon={<PlusOutlined />}>
          Nouvelle Activité
        </Button>
        <Drawer
          title="Créer une nouvelle activité"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div style={{ textAlign: "right" }}>
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Annuler
              </Button>
              <Button 
                type="primary" 
                form="activityNewForm" 
                htmlType="submit"
                loading={loading}
              >
                Créer l'activité
              </Button>
            </div>
          }
        >
          <Form
            id="activityNewForm"
            layout="vertical"
            initialValues={{
              accessible: true,
              paid: false,
              progress: "À venir",
              status: true,
              starting: moment(),
              ending: moment().add(1, 'hour')
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
                  <Input placeholder="Titre de l'activité" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Veuillez entrer une description' }]}
                >
                  <TextArea rows={4} placeholder="Description de l'activité" />
                </Form.Item>
              </Col>

              <Col span={24}>
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
              </Col>

              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Catégorie"
                  rules={[{ required: true, message: 'Veuillez sélectionner une catégorie' }]}
                >
                  <Select placeholder="Sélectionner une catégorie" loading={categories.length === 0}>
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
                  <Switch />
                </Form.Item>
              </Col>

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

              <Col span={8}>
                <div style={{ paddingTop: 30 }}>
                  {/* Espace pour l'alignement */}
                </div>
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

export default Activity_new; 