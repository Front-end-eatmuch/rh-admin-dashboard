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
import { POST, GET } from "../constants/request-type";
import { service_api } from "../constants/url";
import {
  country,
  get_all_country,
  user,
  create_user,
  check_tag
} from "../constants/routes";
import { openNotificationWithIcon } from "../functions/notification";
import { raw_menu } from "../constants/raw-list";
import {
  EmailValidation,
  PasswordValidation
} from "../functions/validateEmailPassword";
import { uploadFile } from "../functions/upload-file";
import { AiFillMinusCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { pinEncryptor } from "../functions/pinSecure";
import ComponentToPrint from "../printeable/receipt";
import ReactToPrint from "react-to-print";

const token = sessionStorage.getItem("auth_token");

const { Option } = Select;

class User_info_print extends Component {
  state = {
    visible: false,
    firstname: "",
    lastname: "",
    company_name: "",
    address: "",
    account_type: "",
    // tag: "",
    birthday: "",
    city: "",
    number: "",
    email: "",
    list: [],
    country_code: "",
    existingTag: false,
    pic: null,
    load: true
  };

  componentDidMount() {
    this.getData();
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleImage = (e) => {
    e.preventDefault();
    return this.setState({ pic: e.target.files[0] });
  };

  getData = async () => {
    const request_details = {
      type: GET,
      url: service_api,
      route: country + "/" + get_all_country,
      data: null,
      token: token
    };
    const response = await MakeRequestAsync(request_details)
      .then((res) => {
        this.setState({ list: res.data.country, load: false });
      })
      .catch((err) => {
        this.setState({ load: false });
        console.log(err);
        return openNotificationWithIcon("error", err);
      });
  };

  // checkTag = async (tag) => {
  //   // const { tag } = this.state;
  //   if (tag < 6) {
  //     return this.setState({ existingTag: false });
  //   }

  //   const request_details = {
  //     type: GET,
  //     url: service_api,
  //     route: user + "/" + check_tag + "/" + tag
  //   };

  //   const response = await MakeRequestAsync(request_details).catch((err) => {
  //     console.log(err);
  //     this.setState({ existingTag: false });
  //     return openNotificationWithIcon("error", "Une erreur est survenue");
  //   });
  //   return this.setState({ existingTag: response.data.exist });
  // };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ load: true });

    const {
      firstname,
      lastname,
      email,
      number,
      country_code,
      pic,
      company_name,
      address,
      city,
      // tag,
      birthday,
      account_type
    } = this.state;

    const data = {
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      company_name: company_name.toLowerCase(),
      address: address.toLowerCase(),
      city: city.toLowerCase(),
      birthday: birthday.toLowerCase(),
      // tag: tag.toLowerCase(),
      account_type: account_type,
      number: country_code + number,
      country_code
    };

    if (!EmailValidation(email)) {
      this.setState({
        load: false
      });
      return openNotificationWithIcon(
        "error",
        "Veuillez entrer un email valide"
      );
    }

    if (
      firstname === "" ||
      lastname === "" ||
      number === "" ||
      country_code === "" ||
      birthday === "" ||
      account_type === "" ||
      address === ""
    ) {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Vous devez remplir tous les champs"
      );
    }

    if (account_type === "business" && company_name === "") {
      this.setState({ load: false });
      return openNotificationWithIcon(
        "error",
        "Si vous êtes un compte business, veuillez entrer le nom de votre entreprise"
      );
    }
    // var format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    // if (format.test(tag) === true) {
    //   this.setState({ load: false });
    //   return openNotificationWithIcon(
    //     "error",
    //     "Votre tag ne doit pas contenir de caractères spéciaux ou d'espaces"
    //   );
    // }
    // if (tag.length < 6) {
    //   this.setState({ load: false });
    //   return openNotificationWithIcon(
    //     "error",
    //     "Votre tag doit contenir au moins 6 caractères"
    //   );
    // }

    let pic_url;

    if (pic !== null) {
      pic_url = await uploadFile(pic);
      if (!pic_url.data.success) {
        this.setState({ load: false });
        return openNotificationWithIcon(
          "error",
          "Une erreur est survenue lors de l'upload de la photo"
        );
      }
    }

    const request_details = {
      type: POST,
      url: service_api,
      route: user + "/" + create_user,
      data: { ...data, pic: pic === null ? null : pic_url.data.url },
      token: token
    };

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
    const {
      firstname,
      lastname,
      email,
      number,
      country_code,
      pic,
      company_name,
      address,
      city,
      tag,
      birthday,
      account_type,
      existingTag,
      list,
      load
    } = this.state;
    return (
      <>
        <Button type="success" onClick={this.showDrawer}>
          Impression
        </Button>
        <Drawer
          title="Impression de la pré-affiche"
          width={"100%"}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <ReactToPrint
            trigger={() => (
              <Button type="danger">IMPRIMER LE DOCUMENT MAINTENANT</Button>
            )}
            content={() => this.componentRef}
          />
          <ComponentToPrint
            ref={(el) => (this.componentRef = el)}
            row={this.props.row}
          />
        </Drawer>
      </>
    );
  }
}

export default User_info_print;
