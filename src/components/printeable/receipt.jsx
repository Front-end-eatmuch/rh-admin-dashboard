import { Typography } from "antd";
import React, { Component } from "react";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import { MdAccountBox } from "react-icons/md";
import { GET } from "../constants/request-type";
import { pinEncryptor } from "../functions/pinSecure";
import { service_user } from "../constants/url";
import { MakeRequestAsync } from "../functions/axios";

const token = sessionStorage.getItem("auth_token");

export default class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkbox: false,
      dropdownValue: "dog",
      card: null
    };
  }

  changeDropdown(event) {
    this.setState({ dropdownValue: event.target.value });
  }

  componentDidMount() {
    this.getCardData();
  }

  getCardData = async () => {
    const { row } = this.props;

    const request_details_card = {
      type: GET,
      url: service_user,
      route: "user" + "/" + "get-one-card" + "/" + row?._id,
      token: token
    };

    const response_card = await MakeRequestAsync(request_details_card)
      .then((res) => {
        // setLoad(false);
        this.setState({ card: res.data.card });
      })
      .catch((err) => {
        console.log(err);
        // return Alert.alert("Oops !", "Une erreur est survenue ");
      });
  };

  render() {
    const { card } = this.state;
    return (
      <div>
        <div
          style={{
            width: 750,
            height: 1100,
            marginTop: 20,
            float: "left",
            border: "1px solid black",
            padding: 10
          }}
        >
          <h1>BIENVENUE DANS TREIIZE</h1>
          <p>
            <b>Treiize ID</b> est une communauté visant à améliorer la vie des
            personnes via la technologie. Nous vous permettons de bénéficier de
            nombreux services, des réductions, des accès gratuit, des emploies
            et de vous connecter à d'autres personnes.
          </p>
          <p>
            * Nous ne partageons aucunement vos informations avec des
            entreprises tiers
          </p>
          <p>
            * Nous utilisons aucunement vos données via les services du TREIIZE
            afin de vous servir le meilleur
          </p>
          <p>
            Grâce à votre participation, vous permettez à plusieurs personnes de
            la communauté de vivre une vie meilleure et c'est aussi valable pour
            vous.
          </p>
          <p>
            <b>
              Votre compte a bien été créé. Vous pourrez vous connecter à l'aide
              de votre numéro mobile et votre mot de passe d'activation.
            </b>
          </p>
          <p>
            <b>
              Numéro d'enregistrement:
              <i> {this.props.row?.number}</i>
            </b>
          </p>
          <p>
            <b>Mot de passe d'activation (à conserver précieusement):</b>
          </p>
          <QRCode
            value={this.props.row?.defaultPassword}
            style={{
              float: "right"
            }}
          />
        </div>
        <div
          style={{
            width: 750,
            height: 1100,
            marginTop: 20,
            float: "left",
            marginLeft: 20,
            border: "1px solid black",
            padding: 10
          }}
        >
          <h1>Récépissé</h1>
          <p>
            <b>Nom complet réprésentant</b>
            <i>
              {" "}
              {this.props.row?.firstname} {this.props.row?.lastname}
            </i>
          </p>
          <p>
            <b>Numéro de téléphone</b>
            <i> {this.props.row?.number}</i>
          </p>
          <p>
            <b>Email</b>
            <i> {this.props.row?.email}</i>
          </p>
          <p>
            <b>Type de compte</b>
            <i> {this.props.row?.account_type}</i>
          </p>
          {this.props.row?.account_type === "business" && (
            <p>
              <b>Nom entreprise</b>
              <i> {this.props.row?.company_name}</i>
            </p>
          )}
          <p>
            <b>Code pays</b>
            <i> {this.props.row?.country_code}</i>
          </p>
          <p>
            <b>Ville:</b>
            <i> {this.props.row?.city}</i>
          </p>
          <p>
            <b>Adresse:</b>
            <i> {this.props.row?.address}</i>
          </p>
          <p>
            <b>Date de naissance:</b>
            <i> {this.props.row?.birthday}</i>
          </p>
          <p>
            {this.props.row?.pic === null && <MdAccountBox size={100} />}
            {this.props.row?.pic !== null && (
              <img
                src={this.props.row?.pic}
                style={{
                  width: 100,
                  height: 100
                }}
              />
            )}
          </p>
          <p>
            <b>Code Bar Value: {this.props.row?.api_key}</b>
          </p>
          <p>
            <b>
              Card QR Value:{" "}
              {card !== null &&
                pinEncryptor(card?.cvv + card?.bin.slice(3) + card?.number)}
            </b>
          </p>
          {/* <Barcode
            value={this.props.row?.api_key}
            displayValue={false}
            // fontSize={10}
            width={1}
          /> */}
        </div>
      </div>
    );
  }
}
