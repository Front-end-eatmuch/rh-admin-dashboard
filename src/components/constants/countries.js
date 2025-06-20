const countries = [
  {
    url: "/wiki/Afghanistan",
    alpha3: "AFG",
    name: "Afghanistan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/%C3%85land_Islands",
    alpha3: "ALA",
    name: "\u00c5land Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/5/52/Flag_of_%C3%85land.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Albania",
    alpha3: "ALB",
    name: "Albania",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Algeria",
    alpha3: "DZA",
    name: "Algeria",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/American_Samoa",
    alpha3: "ASM",
    name: "American Samoa",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/87/Flag_of_American_Samoa.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Andorra",
    alpha3: "AND",
    name: "Andorra",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Angola",
    alpha3: "AGO",
    name: "Angola",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Anguilla",
    alpha3: "AIA",
    name: "Anguilla",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Anguilla.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Antigua_and_Barbuda",
    alpha3: "ATG",
    name: "Antigua and Barbuda",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Antigua_and_Barbuda.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Argentina",
    alpha3: "ARG",
    name: "Argentina",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Armenia",
    alpha3: "ARM",
    name: "Armenia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Aruba",
    alpha3: "ABW",
    name: "Aruba",
    file_url: "//upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Aruba.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Australia",
    alpha3: "AUS",
    name: "Australia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Austria",
    alpha3: "AUT",
    name: "Austria",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Azerbaijan",
    alpha3: "AZE",
    name: "Azerbaijan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bahamas",
    alpha3: "BHS",
    name: "Bahamas",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/93/Flag_of_the_Bahamas.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bahrain",
    alpha3: "BHR",
    name: "Bahrain",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bangladesh",
    alpha3: "BGD",
    name: "Bangladesh",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Barbados",
    alpha3: "BRB",
    name: "Barbados",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Barbados.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Belarus",
    alpha3: "BLR",
    name: "Belarus",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Belgium",
    alpha3: "BEL",
    name: "Belgium",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Belize",
    alpha3: "BLZ",
    name: "Belize",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/e7/Flag_of_Belize.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Benin",
    alpha3: "BEN",
    name: "Benin",
    file_url: "//upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Benin.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bermuda",
    alpha3: "BMU",
    name: "Bermuda",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bermuda.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bhutan",
    alpha3: "BTN",
    name: "Bhutan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bolivia",
    alpha3: "BOL",
    name: "Bolivia (Plurinational State of)",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/b3/Bandera_de_Bolivia_%28Estado%29.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Caribbean_Netherlands",
    alpha3: "BES",
    name: "Bonaire - Sint Eustatius and Saba",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bosnia_and_Herzegovina",
    alpha3: "BIH",
    name: "Bosnia and Herzegovina",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Botswana",
    alpha3: "BWA",
    name: "Botswana",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Botswana.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Brazil",
    alpha3: "BRA",
    name: "Brazil",
    file_url: "//upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/British_Indian_Ocean_Territory",
    alpha3: "IOT",
    name: "British Indian Ocean Territory",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_the_Commissioner_of_the_British_Indian_Ocean_Territory.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Brunei_Darussalam",
    alpha3: "BRN",
    name: "Brunei Darussalam",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bulgaria",
    alpha3: "BGR",
    name: "Bulgaria",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Burkina_Faso",
    alpha3: "BFA",
    name: "Burkina Faso",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Burkina_Faso.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Burundi",
    alpha3: "BDI",
    name: "Burundi",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cabo_Verde",
    alpha3: "CPV",
    name: "Cabo Verde",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cambodia",
    alpha3: "KHM",
    name: "Cambodia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cameroon",
    alpha3: "CMR",
    name: "Cameroon",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Canada",
    alpha3: "CAN",
    name: "Canada",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cayman_Islands",
    alpha3: "CYM",
    name: "Cayman Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_the_Cayman_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Central_African_Republic",
    alpha3: "CAF",
    name: "Central African Republic",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Central_African_Republic.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Chad",
    alpha3: "TCD",
    name: "Chad",
    file_url: "//upload.wikimedia.org/wikipedia/commons/4/4b/Flag_of_Chad.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Chile",
    alpha3: "CHL",
    name: "Chile",
    file_url: "//upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/China",
    alpha3: "CHN",
    name: "China",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Christmas_Island",
    alpha3: "CXR",
    name: "Christmas Island",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/67/Flag_of_Christmas_Island.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cocos_(Keeling)_Islands",
    alpha3: "CCK",
    name: "Cocos (Keeling) Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Cocos_%28Keeling%29_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Colombia",
    alpha3: "COL",
    name: "Colombia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Comoros",
    alpha3: "COM",
    name: "Comoros",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Republic_of_the_Congo",
    alpha3: "COG",
    name: "Congo",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Democratic_Republic_of_the_Congo",
    alpha3: "COD",
    name: "Congo - Democratic Republic of the",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cook_Islands",
    alpha3: "COK",
    name: "Cook Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_the_Cook_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Costa_Rica",
    alpha3: "CRI",
    name: "Costa Rica",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Costa_Rica.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Ivory_Coast",
    alpha3: "CIV",
    name: "C\u00f4te d'Ivoire",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Croatia",
    alpha3: "HRV",
    name: "Croatia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cuba",
    alpha3: "CUB",
    name: "Cuba",
    file_url: "//upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cura%C3%A7ao",
    alpha3: "CUW",
    name: "Cura\u00e7ao",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_Cura%C3%A7ao.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Cyprus",
    alpha3: "CYP",
    name: "Cyprus",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Czech_Republic",
    alpha3: "CZE",
    name: "Czechia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Denmark",
    alpha3: "DNK",
    name: "Denmark",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Djibouti",
    alpha3: "DJI",
    name: "Djibouti",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_Djibouti.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Dominica",
    alpha3: "DMA",
    name: "Dominica",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Dominica.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Dominican_Republic",
    alpha3: "DOM",
    name: "Dominican Republic",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Ecuador",
    alpha3: "ECU",
    name: "Ecuador",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Egypt",
    alpha3: "EGY",
    name: "Egypt",
    file_url: "//upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/El_Salvador",
    alpha3: "SLV",
    name: "El Salvador",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Equatorial_Guinea",
    alpha3: "GNQ",
    name: "Equatorial Guinea",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Equatorial_Guinea.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Eritrea",
    alpha3: "ERI",
    name: "Eritrea",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/29/Flag_of_Eritrea.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Estonia",
    alpha3: "EST",
    name: "Estonia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Eswatini",
    alpha3: "SWZ",
    name: "Eswatini",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_Eswatini.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Ethiopia",
    alpha3: "ETH",
    name: "Ethiopia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Falkland_Islands",
    alpha3: "FLK",
    name: "Falkland Islands (Malvinas)",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_Falkland_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Faroe_Islands",
    alpha3: "FRO",
    name: "Faroe Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_the_Faroe_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Fiji",
    alpha3: "FJI",
    name: "Fiji",
    file_url: "//upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Finland",
    alpha3: "FIN",
    name: "Finland",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/France",
    alpha3: "FRA",
    name: "France",
    file_url: "//upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/French_Polynesia",
    alpha3: "PYF",
    name: "French Polynesia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/db/Flag_of_French_Polynesia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/French_Southern_and_Antarctic_Lands",
    alpha3: "ATF",
    name: "French Southern Territories",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/a/a7/Flag_of_the_French_Southern_and_Antarctic_Lands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Gabon",
    alpha3: "GAB",
    name: "Gabon",
    file_url: "//upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Gabon.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Gambia",
    alpha3: "GMB",
    name: "Gambia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_The_Gambia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Georgia_(country)",
    alpha3: "GEO",
    name: "Georgia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Germany",
    alpha3: "DEU",
    name: "Germany",
    file_url: "//upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Ghana",
    alpha3: "GHA",
    name: "Ghana",
    file_url: "//upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Gibraltar",
    alpha3: "GIB",
    name: "Gibraltar",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/02/Flag_of_Gibraltar.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Greece",
    alpha3: "GRC",
    name: "Greece",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Greenland",
    alpha3: "GRL",
    name: "Greenland",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_Greenland.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Grenada",
    alpha3: "GRD",
    name: "Grenada",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Grenada.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Guam",
    alpha3: "GUM",
    name: "Guam",
    file_url: "//upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Guam.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Guatemala",
    alpha3: "GTM",
    name: "Guatemala",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Bailiwick_of_Guernsey",
    alpha3: "GGY",
    name: "Guernsey",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Guernsey.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Guinea",
    alpha3: "GIN",
    name: "Guinea",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Guinea-Bissau",
    alpha3: "GNB",
    name: "Guinea-Bissau",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Guinea-Bissau.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Guyana",
    alpha3: "GUY",
    name: "Guyana",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Guyana.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Haiti",
    alpha3: "HTI",
    name: "Haiti",
    file_url: "//upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Heard_Island_and_McDonald_Islands",
    alpha3: "HMD",
    name: "Heard Island and McDonald Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/bb/Proposed_flag_of_Antarctica_%28Graham_Bartram%29.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Vatican_City",
    alpha3: "VAT",
    name: "Holy See",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_the_Vatican_City.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Honduras",
    alpha3: "HND",
    name: "Honduras",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Honduras.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Hong_Kong",
    alpha3: "HKG",
    name: "Hong Kong",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Hungary",
    alpha3: "HUN",
    name: "Hungary",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Iceland",
    alpha3: "ISL",
    name: "Iceland",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/India",
    alpha3: "IND",
    name: "India",
    file_url: "//upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Indonesia",
    alpha3: "IDN",
    name: "Indonesia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Iran",
    alpha3: "IRN",
    name: "Iran (Islamic Republic of)",
    file_url: "//upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Iraq",
    alpha3: "IRQ",
    name: "Iraq",
    file_url: "//upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Republic_of_Ireland",
    alpha3: "IRL",
    name: "Ireland",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Isle_of_Man",
    alpha3: "IMN",
    name: "Isle of Man",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_the_Isle_of_Man.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Israel",
    alpha3: "ISR",
    name: "Israel",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Italy",
    alpha3: "ITA",
    name: "Italy",
    file_url: "//upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Jamaica",
    alpha3: "JAM",
    name: "Jamaica",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Jamaica.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Japan",
    alpha3: "JPN",
    name: "Japan",
    file_url: "//upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Jersey",
    alpha3: "JEY",
    name: "Jersey",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/1c/Flag_of_Jersey.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Jordan",
    alpha3: "JOR",
    name: "Jordan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Kazakhstan",
    alpha3: "KAZ",
    name: "Kazakhstan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Kenya",
    alpha3: "KEN",
    name: "Kenya",
    file_url: "//upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Kiribati",
    alpha3: "KIR",
    name: "Kiribati",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kiribati.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/North_Korea",
    alpha3: "PRK",
    name: "Korea (Democratic People's Republic of)",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_North_Korea.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/South_Korea",
    alpha3: "KOR",
    name: "Korea - Republic of",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Kuwait",
    alpha3: "KWT",
    name: "Kuwait",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Kuwait.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Kyrgyzstan",
    alpha3: "KGZ",
    name: "Kyrgyzstan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Laos",
    alpha3: "LAO",
    name: "Lao People's Democratic Republic",
    file_url: "//upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Laos.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Latvia",
    alpha3: "LVA",
    name: "Latvia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Lebanon",
    alpha3: "LBN",
    name: "Lebanon",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Lesotho",
    alpha3: "LSO",
    name: "Lesotho",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Lesotho.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Liberia",
    alpha3: "LBR",
    name: "Liberia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Libya",
    alpha3: "LBY",
    name: "Libya",
    file_url: "//upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Libya.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Liechtenstein",
    alpha3: "LIE",
    name: "Liechtenstein",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Liechtenstein.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Lithuania",
    alpha3: "LTU",
    name: "Lithuania",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Luxembourg",
    alpha3: "LUX",
    name: "Luxembourg",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Macau",
    alpha3: "MAC",
    name: "Macao",
    file_url: "//upload.wikimedia.org/wikipedia/commons/6/63/Flag_of_Macau.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Madagascar",
    alpha3: "MDG",
    name: "Madagascar",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Malawi",
    alpha3: "MWI",
    name: "Malawi",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Malawi.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Malaysia",
    alpha3: "MYS",
    name: "Malaysia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Maldives",
    alpha3: "MDV",
    name: "Maldives",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Maldives.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Mali",
    alpha3: "MLI",
    name: "Mali",
    file_url: "//upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Malta",
    alpha3: "MLT",
    name: "Malta",
    file_url: "//upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Malta.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Marshall_Islands",
    alpha3: "MHL",
    name: "Marshall Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_Marshall_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Mauritania",
    alpha3: "MRT",
    name: "Mauritania",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/43/Flag_of_Mauritania.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Mauritius",
    alpha3: "MUS",
    name: "Mauritius",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Mauritius.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Mexico",
    alpha3: "MEX",
    name: "Mexico",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Federated_States_of_Micronesia",
    alpha3: "FSM",
    name: "Micronesia (Federated States of)",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Moldova",
    alpha3: "MDA",
    name: "Moldova - Republic of",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Moldova.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Monaco",
    alpha3: "MCO",
    name: "Monaco",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/ea/Flag_of_Monaco.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Mongolia",
    alpha3: "MNG",
    name: "Mongolia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Mongolia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Montenegro",
    alpha3: "MNE",
    name: "Montenegro",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Montserrat",
    alpha3: "MSR",
    name: "Montserrat",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Montserrat.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Morocco",
    alpha3: "MAR",
    name: "Morocco",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Mozambique",
    alpha3: "MOZ",
    name: "Mozambique",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Mozambique.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Myanmar",
    alpha3: "MMR",
    name: "Myanmar",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Myanmar.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Namibia",
    alpha3: "NAM",
    name: "Namibia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Namibia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Nauru",
    alpha3: "NRU",
    name: "Nauru",
    file_url: "//upload.wikimedia.org/wikipedia/commons/3/30/Flag_of_Nauru.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Nepal",
    alpha3: "NPL",
    name: "Nepal",
    file_url: "//upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Kingdom_of_the_Netherlands",
    alpha3: "NLD",
    name: "Netherlands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/New_Caledonia",
    alpha3: "NCL",
    name: "New Caledonia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/0c/Drapeau_de_Nouvelle-Cal%C3%A9donie.png",
    license: "Creative Commons Attribution-Share Alike 4.0 International"
  },
  {
    url: "/wiki/New_Zealand",
    alpha3: "NZL",
    name: "New Zealand",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Nicaragua",
    alpha3: "NIC",
    name: "Nicaragua",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Niger",
    alpha3: "NER",
    name: "Niger",
    file_url: "//upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_Niger.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Nigeria",
    alpha3: "NGA",
    name: "Nigeria",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Niue",
    alpha3: "NIU",
    name: "Niue",
    file_url: "//upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Niue.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Norfolk_Island",
    alpha3: "NFK",
    name: "Norfolk Island",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Norfolk_Island.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/North_Macedonia",
    alpha3: "MKD",
    name: "North Macedonia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_North_Macedonia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Northern_Mariana_Islands",
    alpha3: "MNP",
    name: "Northern Mariana Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/e0/Flag_of_the_Northern_Mariana_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Norway",
    alpha3: "NOR",
    name: "Norway",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Oman",
    alpha3: "OMN",
    name: "Oman",
    file_url: "//upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Oman.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Pakistan",
    alpha3: "PAK",
    name: "Pakistan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Palau",
    alpha3: "PLW",
    name: "Palau",
    file_url: "//upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Palau.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/State_of_Palestine",
    alpha3: "PSE",
    name: "Palestine - State of",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Panama",
    alpha3: "PAN",
    name: "Panama",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Papua_New_Guinea",
    alpha3: "PNG",
    name: "Papua New Guinea",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/e3/Flag_of_Papua_New_Guinea.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Paraguay",
    alpha3: "PRY",
    name: "Paraguay",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Peru",
    alpha3: "PER",
    name: "Peru",
    file_url: "//upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Philippines",
    alpha3: "PHL",
    name: "Philippines",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Pitcairn_Islands",
    alpha3: "PCN",
    name: "Pitcairn",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_the_Pitcairn_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Poland",
    alpha3: "POL",
    name: "Poland",
    file_url: "//upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Portugal",
    alpha3: "PRT",
    name: "Portugal",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Puerto_Rico",
    alpha3: "PRI",
    name: "Puerto Rico",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Qatar",
    alpha3: "QAT",
    name: "Qatar",
    file_url: "//upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Romania",
    alpha3: "ROU",
    name: "Romania",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Russia",
    alpha3: "RUS",
    name: "Russian Federation",
    file_url: "//upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Rwanda",
    alpha3: "RWA",
    name: "Rwanda",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Saint_Barth%C3%A9lemy",
    alpha3: "BLM",
    name: "Saint Barth\u00e9lemy",
    file_url: "//upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Saint_Helena,_Ascension_and_Tristan_da_Cunha",
    alpha3: "SHN",
    name: "Saint Helena - Ascension and Tristan da Cunha",
    file_url:
      "//upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Saint_Kitts_and_Nevis",
    alpha3: "KNA",
    name: "Saint Kitts and Nevis",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Saint_Lucia",
    alpha3: "LCA",
    name: "Saint Lucia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Saint_Lucia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Collectivity_of_Saint_Martin",
    alpha3: "MAF",
    name: "Saint Martin (French part)",
    file_url: "//upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Saint_Vincent_and_the_Grenadines",
    alpha3: "VCT",
    name: "Saint Vincent and the Grenadines",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Samoa",
    alpha3: "WSM",
    name: "Samoa",
    file_url: "//upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/San_Marino",
    alpha3: "SMR",
    name: "San Marino",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_San_Marino.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe",
    alpha3: "STP",
    name: "Sao Tome and Principe",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Sao_Tome_and_Principe.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Senegal",
    alpha3: "SEN",
    name: "Senegal",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Serbia",
    alpha3: "SRB",
    name: "Serbia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Seychelles",
    alpha3: "SYC",
    name: "Seychelles",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Seychelles.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Sierra_Leone",
    alpha3: "SLE",
    name: "Sierra Leone",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Sierra_Leone.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Singapore",
    alpha3: "SGP",
    name: "Singapore",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Sint_Maarten",
    alpha3: "SXM",
    name: "Sint Maarten (Dutch part)",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Sint_Maarten.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Slovakia",
    alpha3: "SVK",
    name: "Slovakia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Slovenia",
    alpha3: "SVN",
    name: "Slovenia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Solomon_Islands",
    alpha3: "SLB",
    name: "Solomon Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Solomon_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Somalia",
    alpha3: "SOM",
    name: "Somalia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/South_Africa",
    alpha3: "ZAF",
    name: "South Africa",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/South_Georgia_and_the_South_Sandwich_Islands",
    alpha3: "SGS",
    name: "South Georgia and the South Sandwich Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_South_Georgia_and_the_South_Sandwich_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/South_Sudan",
    alpha3: "SSD",
    name: "South Sudan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/7/7a/Flag_of_South_Sudan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Spain",
    alpha3: "ESP",
    name: "Spain",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Sri_Lanka",
    alpha3: "LKA",
    name: "Sri Lanka",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Sudan",
    alpha3: "SDN",
    name: "Sudan",
    file_url: "//upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Sudan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Suriname",
    alpha3: "SUR",
    name: "Suriname",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Svalbard_and_Jan_Mayen",
    alpha3: "SJM",
    name: "Svalbard and Jan Mayen",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Sweden",
    alpha3: "SWE",
    name: "Sweden",
    file_url: "//upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Switzerland",
    alpha3: "CHE",
    name: "Switzerland",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Syria",
    alpha3: "SYR",
    name: "Syrian Arab Republic",
    file_url: "//upload.wikimedia.org/wikipedia/commons/5/53/Flag_of_Syria.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Tajikistan",
    alpha3: "TJK",
    name: "Tajikistan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Tajikistan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Tanzania",
    alpha3: "TZA",
    name: "Tanzania - United Republic of",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Thailand",
    alpha3: "THA",
    name: "Thailand",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/East_Timor",
    alpha3: "TLS",
    name: "Timor-Leste",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/26/Flag_of_East_Timor.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Togo",
    alpha3: "TGO",
    name: "Togo",
    file_url: "//upload.wikimedia.org/wikipedia/commons/6/68/Flag_of_Togo.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Tokelau",
    alpha3: "TKL",
    name: "Tokelau",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/8e/Flag_of_Tokelau.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Tonga",
    alpha3: "TON",
    name: "Tonga",
    file_url: "//upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Tonga.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Trinidad_and_Tobago",
    alpha3: "TTO",
    name: "Trinidad and Tobago",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Trinidad_and_Tobago.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Tunisia",
    alpha3: "TUN",
    name: "Tunisia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Turkey",
    alpha3: "TUR",
    name: "T\u00fcrkiye",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Turkmenistan",
    alpha3: "TKM",
    name: "Turkmenistan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Turkmenistan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Turks_and_Caicos_Islands",
    alpha3: "TCA",
    name: "Turks and Caicos Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_the_Turks_and_Caicos_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Tuvalu",
    alpha3: "TUV",
    name: "Tuvalu",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tuvalu.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Uganda",
    alpha3: "UGA",
    name: "Uganda",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Ukraine",
    alpha3: "UKR",
    name: "Ukraine",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/United_Arab_Emirates",
    alpha3: "ARE",
    name: "United Arab Emirates",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/United_Kingdom",
    alpha3: "GBR",
    name: "United Kingdom of Great Britain and Northern Ireland",
    file_url:
      "//upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/United_States",
    alpha3: "USA",
    name: "United States of America",
    file_url:
      "//upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/United_States_Minor_Outlying_Islands",
    alpha3: "UMI",
    name: "United States Minor Outlying Islands",
    file_url:
      "//upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Uruguay",
    alpha3: "URY",
    name: "Uruguay",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Uzbekistan",
    alpha3: "UZB",
    name: "Uzbekistan",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Vanuatu",
    alpha3: "VUT",
    name: "Vanuatu",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/6e/Flag_of_Vanuatu_%28official%29.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Venezuela",
    alpha3: "VEN",
    name: "Venezuela (Bolivarian Republic of)",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Venezuela.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Vietnam",
    alpha3: "VNM",
    name: "Viet Nam",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/British_Virgin_Islands",
    alpha3: "VGB",
    name: "Virgin Islands (British)",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_British_Virgin_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/United_States_Virgin_Islands",
    alpha3: "VIR",
    name: "Virgin Islands (U.S.)",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_the_United_States_Virgin_Islands.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Wallis_and_Futuna",
    alpha3: "WLF",
    name: "Wallis and Futuna",
    file_url: "//upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Yemen",
    alpha3: "YEM",
    name: "Yemen",
    file_url: "//upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Zambia",
    alpha3: "ZMB",
    name: "Zambia",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Zambia.svg",
    license: "Public domain"
  },
  {
    url: "/wiki/Zimbabwe",
    alpha3: "ZWE",
    name: "Zimbabwe",
    file_url:
      "//upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg",
    license: "Public domain"
  }
];

export { countries };
