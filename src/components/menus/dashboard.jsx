import React, { Component } from "react";
import { Row, Col, Slider, Divider, DatePicker, Spin } from "antd";
import ColumnChart from "../elements/columnChart";
import "../styles/general.css";

import PieChart from "../elements/pieChart";
import GaugeChart from "../elements/gauge";
import { RingProgress } from "@ant-design/charts";
import { MakeRequestAsync } from "../functions/axios";
import { GET } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  deliverman,
  food,
  get_all_chef,
  // get_all_deliverman,
  get_all_food,
  get_all_order,
  get_all_user,
  order,
  user
} from "../constants/routes";
// import chef from "./chef";
import { decryptSingleData } from "../functions/cryptojs";

import Clock from "react-clock";
import { formatDateTime } from "../functions/dateFunctions";

const { RangePicker } = DatePicker;

const token = sessionStorage.getItem("auth_token");

const style2 = { background: "inherit", padding: "", height: 400 };

class Dashboard extends Component {
  state = {
    load: true,
    users: [],
    orders: [],
    support: [],
    delivermen: [],
    articles: [],
    resto: [],
    start: null,
    end: null,
    val: 0
  };

  componentDidMount() {
    this.getData();
    this.refreshClock();
  }

  refreshClock = () => {
    setInterval(() => this.setState({ val: new Date() }), 1000);
  };

  timeClosing = (opening, closing, receiving) => {
    const date = new Date();
    var time = date.getHours();
    console.log(time);

    if (
      time >= parseInt(opening) &&
      time < parseInt(closing) &&
      receiving === 0
    )
      return false;
    else return true;
  };

  getData = async () => {
    const request_details_user = {
      type: GET,
      url: service_api,
      route: user + "/" + get_all_user,
      data: null,
      token: token
    };

    // const request_details_resto = {
    //   type: GET,
    //   url: service_api,
    //   route: "user" + "/" + get_all_user,
    //   data: null,
    //   token: token
    // };

    const request_details_article = {
      type: GET,
      url: service_api,
      route: food + "/" + get_all_food,
      data: null,
      token: token
    };

    // const request_details_del = {
    //   type: GET,
    //   url: service_api,
    //   route: deliverman + "/" + get_all_deliverman,
    //   data: null,
    //   token: token
    // };

    const request_details_order = {
      type: GET,
      url: service_api,
      route: order + "/" + get_all_order,
      data: null,
      token: token
    };

    const response_user = await MakeRequestAsync(request_details_user)
      .then((res) => {
        this.setState({
          users: decryptSingleData(res.data.user)
        });
      })
      .catch((err) => {
        //   openNotificationWithIcon(
        //   "error",
        //   `${err.response.data.message}`
        // );
        return this.setState({ load: false });
      });

    // const response_resto = await MakeRequestAsync(request_details_resto)
    //   .then((res) => {
    //     this.setState({
    //       resto: decryptSingleData(res?.data?.chef)
    //     });
    //   })
    //   .catch((err) => {
    //     // openNotificationWithIcon("error", `${err.response.data}`);
    //     return this.setState({ load: false });
    //   });

    const response_article = await MakeRequestAsync(request_details_article)
      .then((res) => {
        this.setState({
          articles: decryptSingleData(res.data?.food)
        });
      })
      .catch((err) => {
        // openNotificationWithIcon(
        //   "error",
        //   `${err?.response?.data?.message}`
        // );
        return this.setState({ load: false });
      });

    // const response_del = await MakeRequestAsync(request_details_del)
    //   .then((res) => {
    //     this.setState({
    //       delivermen: decryptSingleData(res?.data?.deliverman)
    //     });
    //   })
    //   .catch((err) => {
    //     // openNotificationWithIcon("error", `${err.response.data}`);
    //     return this.setState({ load: false });
    //   });

    const response_order = await MakeRequestAsync(request_details_order)
      .then((res) => {
        this.setState({
          orders: decryptSingleData(res?.data?.order)
        });
      })
      .catch((err) => {
        // openNotificationWithIcon(
        //   "error",
        //   `${err?.response?.data?.message}`
        // );
        return this.setState({ load: false });
      });

    // const response_help = await MakeRequestAsync(request_details_help)
    //   .then((res) => {
    //     this.setState({
    //       support: res?.data
    //     });
    //   })
    //   .catch((err) => {
    //     // openNotificationWithIcon(
    //     //   "error",
    //     //   `${err?.response?.data?.message}`
    //     // );
    //     return this.setState({ load: false });
    //   });

    // console.log(decryptSingleData(response.data.branch));

    // console.log(response.data);
    this.setState({ load: false });
  };

  render() {
    const {
      load,
      users,
      resto,
      delivermen,
      orders,
      articles,
      support,
      start,
      end
    } = this.state;

    return load ? (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Spin size="large" />
      </div>
    ) : (
      <div style={{ width: "100%" }}>
        <Divider orientation="left" style={{}}>
          Horloge
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            // backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          <div className="block-stat-one">
            <p
              style={{
                color: "#000",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 5
              }}
            >
              {formatDateTime(this.state.val)}
            </p>
          </div>
          <div
            className="block-stat-one"
            style={{
              padding: 5
            }}
          >
            <Clock value={this.state.val} size={200} style={{}} />
          </div>
        </div>
        <Divider orientation="left" style={{}}>
          Filtre par intervale de date
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            // backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          <RangePicker
            showTime
            onChange={(data) => {
              console.log(data);
              if (data === null) {
                return this.setState({
                  start: null,
                  end: null
                });
              }
              let d1 = data[0].format("YYYY-MM-DDTHH:mm:ss");
              let d2 = data[1].format("YYYY-MM-DDTHH:mm:ss");

              this.setState({ start: d1, end: d2 });
            }}
          />
        </div>
        <Divider orientation="left" style={{}}>
          Statistiques
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          {[
            {
              name: "Utilisateurs",
              key: "users",
              data: users,
              color: "#A8D5BA" // Soft green
            },
            {
              name: "Chefs",
              key: "resto",
              data: users.filter((res) => res.chef === true),
              color: "#FFD8A8" // Soft orange
            },
            {
              name: "Chefs actifs",
              key: "resto-online",
              data: users?.filter(
                (res) => res.status && res.visible && res.chef
              ),
              color: "#C3E6CB" // Light pastel green
            },
            {
              name: "Livreurs",
              key: "delivermen",
              data: delivermen,
              color: "#A7C7E7" // Soft blue
            },
            {
              name: "Livreurs actifs",
              key: "delivermen-online",
              data: delivermen?.filter((res) => res.status === true),
              color: "#B3D9FF" // Light blue
            },
            {
              name: "Plats",
              key: "articles",
              data: articles,
              color: "#DAB6FC" // Soft purple
            },
            {
              name: "Plats actifs",
              key: "articles-available",
              data: articles?.filter((res) => res.status && res.visible),
              color: "#E0C3FC" // Light purple
            },
            {
              name: "Commandes",
              key: "orders",
              data: orders,
              color: "#FFCCB3" // Soft peach
            },
            {
              name: "Commandes en attente",
              key: "orders-waiting",
              data: orders?.filter((res) => res.status === 0),
              color: "#FFE0B2" // Light pastel orange
            },
            {
              name: "Commandes acceptées",
              key: "orders-accepted",
              data: orders?.filter((res) => res.status === 1),
              color: "#FFD8B1" // Soft warm orange
            },
            {
              name: "Commandes acceptées ayant livreur",
              key: "orders-accepted-deliverman",
              data: orders?.filter((res) => res.deliverman_id !== null),
              color: "#FFC4A3" // Soft coral
            },
            {
              name: "Commandes en chemin de livraison",
              key: "orders-onway",
              data: orders?.filter((res) => res.status === 2),
              color: "#BFD8D2" // Soft teal
            },
            {
              name: "Commandes livrées",
              key: "orders-delivered",
              data: orders?.filter((res) => res.status === 3),
              color: "#A3E4DB" // Light turquoise
            },
            {
              name: "Commandes annulées",
              key: "orders-canceled",
              data: orders?.filter((res) => res.status === 4),
              color: "#FFB6C1" // Soft pink
            }
          ].map((e) => (
            <div
              className="block-stat-one"
              key={e.key}
              style={{
                backgroundColor: e.color,
                padding: 15,
                borderRadius: 10 // Optional: Make it look even softer
              }}
            >
              <p
                style={{
                  color: "#333", // Darker text for better contrast
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                {e?.name}
                <br />
                {
                  e.data?.filter((item) => {
                    if (start === null || end === null) {
                      return item;
                    }
                    return item.createdAt >= start && item.createdAt <= end;
                  })?.length
                }
              </p>
            </div>
          ))}
        </div>

        <Divider orientation="left" style={{}}>
          Gains en procédure (Commandes en cours)
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          {[
            {
              name: "Chiffre d'affaire",
              key: "order-ca-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status !== 3 && item.status !== 4;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status !== 3 &&
                    item.status !== 4
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return accumulator + currentObject?.billing_details?.amount;
                }, 0)
            },
            {
              name: "Gains (Chefs)",
              key: "order-g-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status !== 3 && item.status !== 4;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status !== 3 &&
                    item.status !== 4
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.earned_chef
                  );
                }, 0)
            },
            {
              name: "Gains (Livreurs)",
              key: "order-g-l",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status !== 3 && item.status !== 4;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status !== 3 &&
                    item.status !== 4
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.delivery_price
                  );
                }, 0)
            },
            {
              name: "Gain (Pani)",
              key: "order-net-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status !== 3 && item.status !== 4;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status !== 3 &&
                    item.status !== 4
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.earned_pani
                  );
                }, 0)
            }
          ].map((e) => (
            <div
              className="block-stat-one"
              key={e.key}
              style={{
                backgroundColor: "#FFE0B2", // Soft light orange
                padding: 15,
                borderRadius: 10 // Optional: For a softer look
              }}
            >
              <p
                style={{
                  color: "#333", // Darker text for better contrast
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                {e?.name}
                <br />${e?.data?.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Divider orientation="left" style={{}}>
          Gains Obtenus
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          {[
            {
              name: "Chiffre d'affaire",
              key: "order-ca-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status === 3;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status === 3
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return accumulator + currentObject?.billing_details?.amount;
                }, 0)
            },
            {
              name: "Gains (Chefs)",
              key: "order-g-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status === 3;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status === 3
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.earned_chef
                  );
                }, 0)
            },
            {
              name: "Gains (Livreurs)",
              key: "order-g-l",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status === 3;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status === 3
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.delivery_price
                  );
                }, 0)
            },
            {
              name: "Gain (Pani)",
              key: "order-net-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status === 3;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status === 3
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.earned_pani
                  );
                }, 0)
            }
          ].map((e) => (
            <div
              className="block-stat-one"
              key={e.key}
              style={{
                backgroundColor: "#E8F5E9", // Soft pastel green
                padding: 15,
                borderRadius: 10 // Optional: For a softer look
              }}
            >
              <p
                style={{
                  color: "#333", // Darker text for better contrast
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                {e?.name}
                <br />${e?.data?.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Divider orientation="left" style={{}}>
          Pertes (Commandes annulées)
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            // backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          {[
            {
              name: "Chiffre d'affaire",
              key: "order-ca-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status === 4;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status === 4
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return accumulator + currentObject?.billing_details?.amount;
                }, 0)
            },
            {
              name: "Gains (Chefs)",
              key: "order-g-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status === 4;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status === 4
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.earned_chef
                  );
                }, 0)
            },
            {
              name: "Gains (Livreurs)",
              key: "order-g-l",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status === 4;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status === 4
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.delivery_price
                  );
                }, 0)
            },
            {
              name: "Gain (Pani)",
              key: "order-net-r",
              data: orders
                ?.filter((item) => {
                  if (start === null || end === null) {
                    return item.status === 4;
                  }
                  return (
                    item.createdAt >= start &&
                    item.createdAt <= end &&
                    item.status === 4
                  );
                })
                ?.reduce((accumulator, currentObject) => {
                  return (
                    accumulator + currentObject?.billing_details?.earned_pani
                  );
                }, 0)
            }
          ].map((e) => (
            <div
              className="block-stat-one"
              key={e.key}
              style={{
                backgroundColor: "#FFB6C1",
                padding: 15,
                borderRadius: 10 // Optional: For a softer look
              }}
            >
              <p
                style={{
                  color: "#000",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 5
                }}
              >
                {e?.name}
                <br />${e?.data?.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Divider orientation="left" style={{}}>
          Commandes (12 derniers mois)
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            // backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          <div className="block-stat-graph">
            <ColumnChart
              data={[
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12"
              ].map((item, index, array) => {
                // get current year
                const year = new Date().getFullYear();
                // filter by month
                const filtered = orders?.filter((data) => {
                  return data?.createdAt?.slice(0, 7) === year + "-" + item;
                });

                return {
                  days: year + "-" + item,
                  order: filtered?.length
                };
              })}
            />
          </div>
        </div>

        <Divider orientation="left" style={{}}>
          Utilisateurs (12 derniers mois)
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            // backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          <div className="block-stat-graph">
            <ColumnChart
              data={[
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12"
              ].map((item, index, array) => {
                // get current year
                const year = new Date().getFullYear();
                // filter by month
                const filtered = users?.filter((data) => {
                  return data?.createdAt?.slice(0, 7) === year + "-" + item;
                });

                return {
                  days: year + "-" + item,
                  order: filtered?.length
                };
              })}
            />
          </div>
        </div>

        <Divider orientation="left" style={{}}>
          Chefs (12 derniers mois)
        </Divider>
        {/* <div
          style={{
            width: "100%",
            padding: 15,
            // backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          <div className="block-stat-graph">
            <ColumnChart
              data={[
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12"
              ].map((item, index, array) => {
                // get current year
                const year = new Date().getFullYear();
                // filter by month
                const filtered = users?.filter((data) => {
                  return (
                    data?.createdAt?.slice(0, 7) === year + "-" + item &&
                    chef === true
                  );
                });

                return {
                  days: year + "-" + item,
                  order: filtered?.length
                };
              })}
            />
          </div>
        </div> */}

        <Divider orientation="left" style={{}}>
          Livreurs (12 derniers mois)
        </Divider>
        <div
          style={{
            width: "100%",
            padding: 15,
            // backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 10
          }}
        >
          <div className="block-stat-graph">
            <ColumnChart
              data={[
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12"
              ].map((item, index, array) => {
                // get current year
                const year = new Date().getFullYear();
                // filter by month
                const filtered = delivermen?.filter((data) => {
                  return data?.createdAt?.slice(0, 7) === year + "-" + item;
                });

                return {
                  days: year + "-" + item,
                  order: filtered?.length
                };
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
