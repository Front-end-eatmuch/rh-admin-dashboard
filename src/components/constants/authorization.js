import { PieChartOutlined } from "@ant-design/icons";
import { IoNewspaperSharp } from "react-icons/io5";
// import UserUser from "../menus/user";
import { GrBike, GrNotification } from "react-icons/gr";
import { GiCook } from "react-icons/gi";
import { FaUsers, FaListAlt, FaHubspot } from "react-icons/fa";
import { AiFillShop, AiFillSetting } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BiFoodMenu, BiStats } from "react-icons/bi";
import { BiHelpCircle } from "react-icons/bi";
import { MdHub } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";

import AdminAdmin from "../menus/admin_admin";
import AdminPermission from "../menus/admin_permission";
import AdminRole from "../menus/admin_role";
import AdminCategory from "../menus/admin_category";
// import notification_notification from "../menus/notification_support";

// import SupportSupport from "../menus/notification_support";
// import NotificationAds from "../menus/notification_ads";
// import CompanyRole from "../menus/comp_role";
// import CompanyCompany from "../menus/comp_comp";
// import CompanyPermission from "../menus/comp_permission";
// import SettingSetting from "../menus/setting_setting";
// import SettingCity from "../menus/setting_city";
// import SectionLink from "../menus/section_link";
// import SectionLinkSpecial from "../menus/section_link_special";
// import SectionTitle from "../menus/section_title";
import Support from "../menus/support";
// import Session from "../menus/session";
// import Booking from "../menus/booking";
// import Template from "../menus/template";
import NotificationPush from "../menus/notification_push";
// import Discount from "../menus/discount";
// import Zip from "../menus/zip";
import CountryCountry from "../menus/country_country";
import Permission from "../menus/Permission";
// import Allergens from "../menus/allergens";
// import Dietary from "../menus/dietary";
// import Geographical from "../menus/geographical";
// import Ingredient from "../menus/ingredient";
// import Speciality from "../menus/speciality";
// import Spicy from "../menus/spicy";
// import Template from "../menus/template";
// import FoodType from "../menus/food-type";
// import Order from "../menus/order";
// import Deliverman from "../menus/deliverman";
import Profil from "../menus/profil";
import City from "../menus/city";
import Province from "../menus/province";
import User from "../menus/user";
// import Chef from "../menus/chef";
// import FoodArticle from "../menus/food-article";
import Dashboard from "../menus/dashboard";
// import GloceryPartner from "../menus/GloceryPartner";
// import GloceryArticle from "../menus/glocery-article";
// import OrderGlocery from "../menus/order-glocery";
// import HelpOrder from "../menus/help-order";
// import WithdrawalChef from "../menus/withdrawal-chef";
// import WithdrawalPartner from "../menus/withdrawal-partner";
// import HubHub from "../menus/hub";
// import NotificationEmail from "../menus/notification_email";
// import gloceryCategory from "../menus/glocery-category";
import Actuality from "../menus/Actuality";
import Activity from "../menus/Activity";
import Comment from "../menus/Comment";
import Role from "../menus/Role";
import Rang from "../menus/Rang";
// import CountryGlobal from "../menus/country_global";

// import Dashboard from "../menus/dashboard";

// import Transaction from "../menus/transaction";

const list_menu = [
  {
    value: "dashboard",
    icon: <PieChartOutlined />,
    title: "Dashboard",
    url: "/main",
    component: Dashboard
  },
  {
    value: "admin",
    icon: <MdOutlineAdminPanelSettings />,
    title: "Administrateurs",
    url: "/main/admin",
    children: [
      // {
      //   value: "admin-role",
      //   title: "Roles",
      //   url: "/main/admin/role",
      //   component: AdminRole
      // },
      // {
      //   value: "admin-permission",
      //   title: "Permissions",
      //   url: "/main/admin/permission",
      //   component: AdminPermission
      // },
      {
        value: "admin-admin",
        title: "Administrateurs",
        url: "/main/admin/list",
        component: AdminAdmin
      },
      {
        value: "admin-category",
        title: "Catégories",
        url: "/main/admin/category",
        component: AdminCategory
      }
    ]
  },
  // {
  //   value: "hub",
  //   icon: <FaHubspot />,
  //   title: "Hub",
  //   url: "/main/hub",
  //   component: HubHub
  // },
  // {
  //   value: "glocery",
  //   icon: <AiFillShop />,
  //   title: "Épicéries",
  //   url: "/main/glocery",
  //   children: [
  //     {
  //       value: "glocery-partner",
  //       title: "Partenaires",
  //       url: "/main/glocery/partner",
  //       component: GloceryPartner
  //     },
  //     {
  //       value: "glocery-category",
  //       title: "Catégories",
  //       url: "/main/glocery/category",
  //       component: gloceryCategory
  //     },
  //     {
  //       value: "glocery-item",
  //       title: "Articles",
  //       url: "/main/glocery/item",
  //       component: GloceryArticle
  //     },
  //     {
  //       value: "glocery-order",
  //       title: "Commandes",
  //       url: "/main/glocery/list",
  //       component: OrderGlocery
  //     },
  //     {
  //       value: "glocery-withdrawal",
  //       title: "Retraits & Paiements",
  //       url: "/main/glocery/withdrawal",
  //       component: WithdrawalPartner
  //     }
  //   ]
  // },
  // {
  //   value: "chef",
  //   icon: <GiCook />,
  //   title: "Chefs & Foods",
  //   url: "/main/chef",
  //   children: [
  //     {
  //       value: "chef-chef",
  //       title: "Chefs",
  //       url: "/main/chef/list",
  //       component: Chef
  //     },
  //     {
  //       value: "chef-food",
  //       title: "Plats",
  //       url: "/main/chef/food",
  //       component: FoodArticle
  //     },
  //     {
  //       value: "chef-withdrawal",
  //       title: "Retraits & Paiements",
  //       url: "/main/chef/withdrawal",
  //       component: WithdrawalChef
  //     }
  //   ]
  // },
  {
    value: "user",
    icon: <FaUsers />,
    title: "Utilisateurs",
    url: "/main/user",
    component: User
  },
  {
    value: "rang",
    icon: <FaUsers />,
    title: "Rangs",
    url: "/main/rang",
    component: Rang
  },
  {
    value: "user",
    icon: <IoNewspaperSharp />,
    title: "Actualités",
    url: "/main/actuality",
    component: Actuality
  },
  {
    value: "user",
    icon: <BsCalendarEvent />,
    title: "Activités",
    url: "/main/activity",
    component: Activity
  },
  // {
  //   value: "user",
  //   icon: <FaUsers />,
  //   title: "Activités",
  //   url: "/main/user",
  //   component: User
  // },
  // {
  //   value: "deliverman",
  //   icon: <GrBike />,
  //   title: "Livreurs",
  //   url: "/main/deliverman",
  //   children: [
  //     {
  //       value: "deliverman-deliverman",
  //       title: "Livreurs",
  //       url: "/main/deliverman/list",
  //       component: Deliverman
  //     },
  //     {
  //       value: "deliverman-withdrawal",
  //       title: "Retraits & Paiements",
  //       url: "/main/deliverman/withdrawal",
  //       component: () => <>Retrait et paiement</>
  //     }
  //   ]
  // },
  // {
  //   value: "order",
  //   icon: <BiFoodMenu />,
  //   title: "Commandes",
  //   url: "/main/order",
  //   children: [
  //     {
  //       value: "order-waiting",
  //       title: "En attente",
  //       url: "/main/order/waiting",
  //       component: () => <Order status={0} />
  //     },
  //     {
  //       value: "order-accepted",
  //       title: "Accepter",
  //       url: "/main/order/accepted",
  //       component: () => <Order status={1} />
  //     },
  //     {
  //       value: "order-onway",
  //       title: "En chemin",
  //       url: "/main/order/onway",
  //       component: () => <Order status={2} />
  //     },
  //     {
  //       value: "order-delivered",
  //       title: "Livrer",
  //       url: "/main/order/delivered",
  //       component: () => <Order status={3} />
  //     },
  //     {
  //       value: "order-canceled",
  //       title: "Annuler",
  //       url: "/main/order/canceled",
  //       component: () => <Order status={4} />
  //     },
  //     {
  //       value: "waiting-refund",
  //       title: "Attente de Remoursement",
  //       url: "/main/order/waiting-refund",
  //       component: () => <Order status={5} />
  //     },
  //     {
  //       value: "order-refunded",
  //       title: "Rembourser",
  //       url: "/main/order/refunded",
  //       component: () => <Order status={6} />
  //     }
  //   ]
  // },
  // {
  //   value: "content",
  //   icon: <FaListAlt />,
  //   title: "Contenus",
  //   url: "/main/content",
  //   children: [
  //     {
  //       value: "content-allergens",
  //       title: "Allergies",
  //       url: "/main/content/allergens",
  //       component: Allergens
  //     },
  //     {
  //       value: "content-dietary",
  //       title: "Régime",
  //       url: "/main/content/dietary",
  //       component: Dietary
  //     },
  //     {
  //       value: "content-food-type",
  //       title: "Menus",
  //       url: "/main/content/food-type",
  //       component: FoodType
  //     },
  //     {
  //       value: "content-geographical",
  //       title: "Pays ",
  //       url: "/main/content/geographical",
  //       component: Geographical
  //     },
  //     {
  //       value: "content-ingredient",
  //       title: "Ingrédients",
  //       url: "/main/content/ingredient",
  //       component: Ingredient
  //     },
  //     {
  //       value: "content-speciality",
  //       title: "Les spécialités",
  //       url: "/main/content/speciality",
  //       component: Speciality
  //     },
  //     {
  //       value: "content-spicy",
  //       title: "Niveau d'épice",
  //       url: "/main/content/spicy",
  //       component: Spicy
  //     },
  //     {
  //       value: "content-template",
  //       title: "Template",
  //       url: "/main/content/template",
  //       component: Template
  //     },
  //     {
  //       value: "content-tips",
  //       title: "Tips",
  //       url: "/main/content/help-order",
  //       component: HelpOrder
  //     }
  //   ]
  // },
  {
    value: "support",
    icon: <BiHelpCircle />,
    title: "Support",
    url: "/main/support",
    children: [
      {
        value: "support-comment",
        title: "Commentaires",
        url: "/main/support/comment",
        component: () => <Comment />
      },
      // {
      //   value: "support-chef",
      //   title: "Chefs",
      //   url: "/main/support/chef",
      //   component: () => <Support type="chef" />
      // },
      // {
      //   value: "support-deliverman",
      //   title: "Livreurs",
      //   url: "/main/support/deliverman",
      //   component: () => <Support type="deliverman" />
      // },
      // {
      //   value: "support-deliverman",
      //   title: "Épiceries",
      //   url: "/main/support/partner",
      //   component: () => <Support type="partner" />
      // }
    ]
  },
  {
    value: "notification",
    icon: <GrNotification />,
    title: "Notifications",
    url: "/main/notification",
    children: [
      // {
      //   value: "notification-discount",
      //   title: "Promotions",
      //   url: "/main/notification/discount",
      //   component: Discount
      // },
      // {
      //   value: "notification-email",
      //   title: "Push Email",
      //   url: "/main/notification/email",
      //   component: NotificationEmail
      // },
      // {
      //   value: "notification-ads",
      //   title: "Annonces",
      //   url: "/main/notification/ads",
      //   component: NotificationAds
      // },
      {
        value: "notification-push",
        title: "Push Message",
        url: "/main/notification/push",
        component: NotificationPush
      }
    ]
  },
  {
    value: "setting",
    icon: <AiFillSetting />,
    title: "Paramètres",
    url: "/main/setting",
    children: [
      {
        value: "setting-country",
        title: "Pays",
        url: "/main/setting/country",
        component: CountryCountry
      },
      {
        value: "permission",
        title: "Permissions",
        url: "/main/setting/permission",
        component: Permission
      },
      {
        value: "role",
        title: "Rôles",
        url: "/main/setting/role",
        component: Role
      },
      // {
      //   value: "setting-province",
      //   title: "Province",
      //   url: "/main/setting/province",
      //   component: Province
      // },
      // {
      //   value: "setting-city",
      //   title: "Ville",
      //   url: "/main/setting/city",
      //   component: City
      // },
      // {
      //   value: "setting-zip",
      //   title: "Postal code",
      //   url: "/main/setting/zip",
      //   component: Zip
      // },
      {
        value: "setting-profil",
        title: "Mon profil",
        url: "/main/setting/profil",
        component: Profil
      }
    ]
  }
];

export { list_menu };
