import React, { Component } from "react";
import {
  PageHeader,
  Tag,
  Button,
  Statistic,
  Row,
  Col,
  Dropdown,
  Menu,
  Table,
  Input,
  Space,
  Spin,
  DatePicker,
  Typography,
  Switch
} from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { GET, DELETE, UPDATE } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  comment,
  get_all_comment,
  report,
  get_all_report,
  update_report
} from "../constants/routes";
import { MakeRequestAsync } from "../functions/axios";
import { openNotificationWithIcon } from "../functions/notification";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import Comment_edit from "../forms/Comment_edit";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const token = sessionStorage.getItem("auth_token");

class Comment extends Component {
  state = {
    selectedRowKeys: [],
    searchText: "",
    searchedColumn: "",
    load: true,
    data: [],
    start: null,
    end: null,
    isReportedView: false,
    content: "",
    user: {
      _id: "",
      firstname: "",
      userImg: ""
    },
    post: "",
    postType: "",
    parentComment: null,
    isActive: true,
    likesCount: {
      like: 0
    },
    replies: [],
    createdAt: "",
    updatedAt: ""
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: this.state.isReportedView ? report +'/'+ get_all_report : comment + "/admin/" + get_all_comment,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      this.setState({ load: false });
      return openNotificationWithIcon("error", `${err.response.data}`);
    });
    
    if (this.state.isReportedView) {
      // Transformer les données des commentaires signalés
      const reportedComments = response.data.reports.map(report => ({
        _id: report.comment._id,
        content: report.comment.content,
        postType: report.comment.postType,
        post: report.comment.post,
        replies: report.comment.replies,
        user: {
          _id: report.reportedBy._id,
          firstname: report.reportedBy.firstname,
          lastname: report.reportedBy.lastname,
          userImg: report.reportedBy.userImg
        },
        reportInfo: {
          status: report.status,
          reportId: report._id,
          reportedBy: {
            name: `${report.reportedBy.firstname} ${report.reportedBy.lastname}`,
            id: report.reportedBy._id
          },
          reason: report.reason,
          description: report.description,
          createdAt: report.createdAt
        }
      }));
      // console.log("Données de l'API:", response.data);
      // console.log("Commentaires transformés:", reportedComments);
      this.setState({ load: false, data: reportedComments });
    } else {
      this.setState({ load: false, data: response.data.comments });
    }
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleStatus = async (id, status) => {
    const data = {
      isActive: status
    };

    const request_details = {
      type: UPDATE,
      url: service_api,
      route: comment + "/admin/update-comment/" + id,
      data: data,
      token: token
    };
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon(
        "error",
        `${err?.response?.data?.message}`
      );
    });
    // console.log(response);
    return setTimeout(() => window.location.reload(), 1000);
  };

  handleDelete = async (id) => {
    const request_details = {
      type: DELETE,
      url: service_api,
      route: comment + "/admin/delete-comment/" + id,
      token: token
    };
    // console.log(token);
    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err.response.data}`);
    });

    return setTimeout(() => window.location.reload(), 1000);
  };

  handleViewToggle = (checked) => {
    this.setState({ isReportedView: checked, load: true }, () => {
      this.getData();
    });
  };

  handleReportStatus = async (reportId, status) => {
    const request_details = {
      type: UPDATE,
      url: service_api,
      route: report + '/admin/update-status/' + reportId,
      data: { status },
      token: token
    };

    const response = await MakeRequestAsync(request_details).catch((err) => {
      return openNotificationWithIcon("error", `${err?.response?.data?.message || "Erreur lors de la mise à jour du statut"}`);
    });

    if (response?.data?.status === 'success') {
      openNotificationWithIcon("success", "Statut mis à jour avec succès");
      this.getData(); // Rafraîchir les données
    }
  };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "_id",
        ...this.getColumnSearchProps("_id"),
        width: "15%",
        render: (text) => (
          <Space direction="vertical">
            <Text copyable>{text}</Text>
          </Space>
        )
      },
      {
        title: "Contenu",
        dataIndex: "content",
        ...this.getColumnSearchProps("content"),
        width: "30%",
        render: (text, record) => (
          <div>
            {record.parentComment && (
              <Tag color="orange" style={{ marginBottom: 4 }}>Réponse</Tag>
            )}
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {text?.length > 50 ? text.substring(0, 50) + "..." : text}
            </div>
          </div>
        )
      },
      {
        title: "Type",
        dataIndex: "postType",
        render: (type) => (
          <Tag color={type === "actuality" ? "blue" : "cyan"}>
            {type === "actuality" ? "Actualité" : "Activité"}
          </Tag>
        )
      },
      {
        title: "Utilisateur",
        dataIndex: "user",
        render: (user) => (
          <Space align="center">
            {/* {user?.userImg && (
              <img
                src={user.userImg}
                alt="user"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  marginRight: '8px'
                }}
              />
            )} */}
            <Tag color="blue">{user?.firstname}</Tag>
          </Space>
        )
      },
      {
        title: "J'aimes",
        dataIndex: "likesCount",
        render: (counts) => (
          <Tag color="blue">Like: {counts?.like || 0}</Tag>
        )
      },
      {
        title: "Réponses",
        dataIndex: "replies",
        render: (replies) => (
          <Tag color="purple">{replies?.length || 0}</Tag>
        )
      },
      {
        title: "Date",
        dataIndex: !this.state.isReportedView ? "createdAt" : "reportInfo",
        render: (text) => (
          <Text>{new Date(!this.state.isReportedView ? text : text.createdAt).toLocaleString('fr-FR')} </Text>
        )
      },
      {
        title: "Statut",
        dataIndex: "status",
        render: (status, record) => {
          if (record.reportInfo) {
            // Pour les commentaires signalés
            switch (record.reportInfo.status) {
              case 'pending':
                return <Tag color="orange">En attente</Tag>;
              case 'reviewed':
                return <Tag color="blue">Examiné</Tag>;
              case 'resolved':
                return <Tag color="green">Résolu</Tag>;
              default:
                return <Tag color="default">Inconnu</Tag>;
            }
          } else {
            // Pour les commentaires normaux
            return record?.isActive ? (
              <Tag color="green">Visible</Tag>
            ) : (
              <Tag color="volcano">Masqué</Tag>
            );
          }
        }
      },
      {
        title: "Signalement",
        dataIndex: "reportInfo",
        width: "20%",
        render: (reportInfo) => {
          if (!reportInfo) return null;

          const formatDate = (dateString) => {
            if (!dateString) return "Date inconnue";
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Date invalide";
            return date.toLocaleString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          };

          return (
            <Space direction="vertical">
              <Tag color="red">Signalé</Tag>
              {/* <Text type="secondary">Raison: {reportInfo.reason}</Text>
              <Text type="secondary">Par: {reportInfo.reportedBy.name}</Text>
              <Text type="secondary">Le: {formatDate(reportInfo.createdAt)}</Text>
              <Text type="secondary">Description: {reportInfo.description}</Text> */}
            </Space>
          );
        }
      },
      {
        title: "Actions",
        fixed: "right",
        render: (text, record) => (
          <div>
            <Dropdown
              overlay={MenuButton(record)}
              placement="bottomCenter"
              arrow
            >
              <Button>Options</Button>
            </Dropdown>
          </div>
        )
      }
    ];

    const MenuButton = (record) => (
      <Menu>
        <Menu.Item>
          <Comment_edit row={record} />
        </Menu.Item>
        {record.reportInfo ? (
          // Menu pour les commentaires signalés
          <>
            <Menu.SubMenu title="Changer le statut">
              <Menu.Item>
                <Link onClick={() => this.handleReportStatus(record.reportInfo.reportId, 'pending')}>
                  Marquer comme en attente
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link onClick={() => this.handleReportStatus(record.reportInfo.reportId, 'reviewed')}>
                  Marquer comme examiné
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link onClick={() => this.handleReportStatus(record.reportInfo.reportId, 'resolved')}>
                  Marquer comme résolu
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
          </>
        ) : (
          // Menu pour les commentaires normaux
          <>
            {record.isActive === false ? (
              <Menu.Item>
                <Link onClick={() => this.handleStatus(record._id, true)}>
                  Afficher
                </Link>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <Link onClick={() => this.handleStatus(record._id, false)}>
                  Masquer
                </Link>
              </Menu.Item>
            )}
          </>
        )}
        <Menu.Item>
          <Link onClick={() => this.handleDelete(record._id)}>Supprimer</Link>
        </Menu.Item>
      </Menu>
    );

    const { load, data, start, end, isReportedView } = this.state;
    
    return (
      <>
        <PageHeader
          title="Commentaires"
          tags={<Tag color="blue">Liste des commentaires</Tag>}
          subTitle=""
          extra={[
            <Switch
              key="view-toggle"
              checkedChildren="Commentaires signalés"
              unCheckedChildren="Tous les commentaires"
              checked={isReportedView}
              onChange={this.handleViewToggle}
            />,
            <RangePicker
              showTime
              onChange={(data) => {
                if (data === null) {
                  this.setState({
                    start: null,
                    end: null
                  });
                } else {
                  let d1 = data[0].format("YYYY-MM-DDTHH:mm:ss");
                  let d2 = data[1].format("YYYY-MM-DDTHH:mm:ss");
                  this.setState({ start: d1, end: d2 });
                }
              }}
            />,
            <CSVLink data={data}>Exporter CSV/Excel</CSVLink>
          ]}
        >
          <Row>
            <Statistic
              title="Total"
              value={
                data?.filter((item) => {
                  if (start === null && end === null) {
                    return item;
                  }
                  return item.createdAt >= start && item.createdAt <= end;
                }).length
              }
            />
          </Row>
          <Row>
            {load ? (
              <Space size="middle" style={{ marginTop: 20 }}>
                <Spin size="large" />
              </Space>
            ) : (
              <Col span={24} style={{ marginTop: 20 }}>
                <Table
                  columns={columns}
                  dataSource={data.filter((item) => {
                    if (start === null && end === null) {
                      return item;
                    }
                    return item.createdAt >= start && item.createdAt <= end;
                  })}
                />
              </Col>
            )}
          </Row>
        </PageHeader>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admin: state.admin
  };
};

const mapDispatchStoreToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchStoreToProps)(Comment); 