// ####################### ADMIN ROUTES

const category = "category";
const role = "role";
const permission = "permission";
const admin = "admin";

// --------------------------Request Route Admin--------------------------






// role
const create_role = "create";
const update_role = "update-role";
const get_all_role = "get-all";
const get_one_role = "get-one";
const delete_role = "delete";

// permission
const create_permission = "create-permission";
const update_permission = "update-permission";
const get_all_permission = "get-all";
const get_one_permission = "get-one";
const delete_permission = "delete";

// admin
const create_admin = "create-admin";
const login_admin = "login-admin";
const update_admin = "update-admin";
const update_password_admin = "update-password";
const get_all_admin = "get-all";
const get_one_admin = "get-one";
const check_admin = "check-admin";
const count_admin = "count-admin";
const delete_admin = "delete";





// --------------------------Request Route Admin--------------------------
// category
const create_category = "create-category";
const update_category = "update-category";
const get_all_category = "get-all";
const get_one_category = "get-one";
const delete_category = "delete";

// --------------------------Request Actuality--------------------------
const actuality = "actuality";
const create_actuality = "create-actuality";
const update_actuality = "update-actuality";
const get_all_actuality = "get-all";
const get_one_actuality = "get-one";
const delete_actuality = "delete";

// --------------------------Request Activity--------------------------
const activity = "activity";
const create_activity = "create-activity";
const update_activity = "update-activity";
const get_all_activity = "get-all";
const get_one_activity = "get-one";
const delete_activity = "delete";

// --------------------------Request Comment--------------------------
const comment = "comment";
const create_comment = "create-comment";
const update_comment = "update-comment";
const get_all_comment = "get-all-comments";
const get_one_comment = "get-one";
const delete_comment = "delete";

// --------------------------Request Report--------------------------
const report = "report";
const create_report = "create-report";
const update_report = "admin/update-status";
const get_all_report = "admin/all";
const delete_report = "delete";

// --------------------------Request Report--------------------------
const rang = "rang";
const create_rang = "create-rang";
const update_rang = "admin/update-status";
const get_all_rang = "all-rang";
const toggle_rang_status = "toggle";
const delete_rang = "delete";

// --------------------------Request Bill--------------------------
const bill = "bill";
// const create_bill = "create-bill";
// const update_bill = "update-bill";
const get_all_bill = "admin/all";
const get_user_bill = "admin/user/:userId";
const get_one_bill = "get-one";
// const delete_bill = "delete";

// --------------------------Request Notification--------------------------
const notification = "notification";
const create_notification = "create";
const update_notification = "update-notification";
const get_all_notifications = "admin/all";
const get_all_orphan_notifications = "admin/orphans";
const get_user_notifications = "user";
// const mark_read_notification = "mark-read";
const delete_notification = "delete";






// ####################### GLOCERY ROUTES

const glocery_partner = "glocery-partner";
const glocery_item = "glocery-item";

// --------------------------Request Route Glocery--------------------------

// item
const create_glocery_item = "create-glocery-item";
const update_glocery_item = "update-gloccery-item";
const get_all_glocery_item = "get-all-admin";
const get_all_company_glocery_item = "get-all-company";
const get_one_glocery_item = "get-one";
const delete_glocery_item = "delete";

// glocery-partner
const create_glocery_partner = "create-glocery-partner";
const login_glocery_partner = "login-glocery-partner";
const update_glocery_partner = "update-glocery-partner";
const update_password_glocery_partner = "update-password";
const get_all_glocery_partner = "get-all";
const get_one_glocery_partner = "get-one";
const check_glocery_partner = "check-glocery-partner";
const count_glocery_partner = "count-glocery-partner";
const delete_glocery_partner = "delete";

// ####################### DELIVERMAN ROUTES

const deliverman = "deliverman";

// deliverman
const create_deliverman = "create-deliverman";
const create_deliverman_admin = "create-deliverman-admin";
const login_deliverman = "login-deliverman";
const update_deliverman = "update-deliverman-admin";
const update_deliverman_admin = "update-deliverman-admin";
const update_password_deliverman = "update-password";
const update_password_deliverman_admin = "update-password-admin";
const get_all_deliverman = "get-all";
const get_one_deliverman = "get-one";
const check_deliverman = "check-deliverman";
const count_deliverman = "count-deliverman";
const delete_deliverman = "delete-admin";

// ####################### USER & CHEF ROUTES
const user = "user";

// user
const create_user = "create-user";
const create_chef = "create-user";
// const create_user_admin = "create-user-admin";
const login_user = "login-user";
const update_user = "update-user";
const update_user_admin = "update-user-admin";
const update_chef_admin = "update-user-admin";
// const update_password_user = "update-password";
// const update_password_user_admin = "update-password-admin";
const get_all_user = "get-all";
const get_all_total_user = "count-user";



const get_all_chef = "get-all-chef";





const get_one_user = "get-one";
const get_one_chef = "get-one";
const check_user = "check-user";
const check_chef = "check-user";
const count_user = "count-user";
const delete_chef = "delete";
const delete_user = "delete";

// ####################### NOTIFICATION ROUTES

const ads = "ads";
const push = "push";
const mailing = "mailing";
const discount = "discount";

// --------------------------Request Route Notification--------------------------

// discount
const create_discount = "create-discount";
const update_discount = "update-discount";
const get_all_discount = "get-all";
const get_one_discount = "get-one";
const get_actif_discount = "get-actif";
const count_discount = "count-discount";
const delete_discount = "delete";

// ad
const create_ads = "create-ad";
const update_ads = "update-ad";
const get_all_ads = "get-all";
const get_one_ads = "get-one";
const get_actif_ads = "get-actif";
const count_ads = "count-ad";
const delete_ads = "delete";

//mailing
const send_mail = "send-mail";

//push
const send_push = "send-push";
const create_push = "create-push";
const update_push = "update-push";
const get_all_push = "get-all";
const get_one_push = "get-one";
const count_push = "count-push";
const delete_push = "delete";

// ####################### CONTENT ROUTES

const allergens = "allergens";
const dietary = "dietary";
const food_type = "food-type";
const geographical = "geographical";
const ingredient = "ingredient";
const speciality = "speciality";
const template = "template";
const spicy = "spicy";

//allergens
const create_allergens = "create-allergen";
const update_allergens = "update-allergen";
const get_all_allergens = "get-all";
const get_one_allergens = "get-one";
const get_actif_allergens = "get-actif";
const count_allergens = "count-allergen";
const delete_allergens = "delete";

//dietary
const create_dietary = "create-dietary";
const update_dietary = "update-dietary";
const get_all_dietary = "get-all";
const get_one_dietary = "get-one";
const get_actif_dietary = "get-actif";
const count_dietary = "count-dietary";
const delete_dietary = "delete";

//food_type
const create_food_type = "create-food-type";
const update_food_type = "update-food-type";
const get_all_food_type = "get-all";
const get_one_food_type = "get-one";
const get_actif_food_type = "get-actif";
const count_food_type = "count-food-type";
const delete_food_type = "delete";

//geographical
const create_geographical = "create-geographical";
const update_geographical = "update-geographical";
const get_all_geographical = "get-all";
const get_one_geographical = "get-one";
const get_actif_geographical = "get-actif";
const count_geographical = "count-geographical";
const delete_geographical = "delete";

//ingredient
const create_ingredient = "create-ingredient";
const update_ingredient = "update-ingredient";
const get_all_ingredient = "get-all";
const get_one_ingredient = "get-one";
const get_actif_ingredient = "get-actif";
const count_ingredient = "count-ingredient";
const delete_ingredient = "delete";

//speciality
const create_speciality = "create-speciality";
const update_speciality = "update-speciality";
const get_all_speciality = "get-all";
const get_one_speciality = "get-one";
const get_actif_speciality = "get-actif";
const count_speciality = "count-speciality";
const delete_speciality = "delete";

//template
const create_template = "create-template";
const update_template = "update-template";
const get_all_template = "get-all";
const get_one_template = "get-one";
const get_actif_template = "get-actif";
const count_template = "count-template";
const delete_template = "delete";

//spicy
const create_spicy = "create-spicy";
const update_spicy = "update-spicy";
const get_all_spicy = "get-all";
const get_one_spicy = "get-one";
const get_actif_spicy = "get-actif";
const count_spicy = "count-spicy";
const delete_spicy = "delete";

// ####################### ORDER ROUTES
const order = "order";
//Order
const create_order = "create-order";
const update_order = "update-order";
const get_all_order = "get-all";
const get_one_order = "get-one";
const get_actif_order = "get-actif";
const get_user_orders = "get-user-orders";
const get_chef_orders = "get-chef-orders";
const count_order = "count-order";
const delete_order = "delete";

// ####################### FOOD ROUTES
const food = "food";
//food
const create_food = "create-food";
const update_food = "update-food";
const get_all_food = "get-all";
const get_all_food_company = "get-all-company";
const get_one_food = "get-one";
const get_actif_food = "get-actif";
const get_actif_food_chef = "get-actif-chef";
const count_food = "count-food";
const delete_food = "delete";

// ####################### SETTING ROUTES

const country = "country";
const province = "province";
const city = "city";
const zip = "zip";
const hub = "hub";

// --------------------------Request Route Country & Zip--------------------------
//country
const create_country = "create-country";
const update_country = "update-country";
const get_all_country = "get-all";
const get_one_country = "get-one";
const get_one_by_country = "get-one-by-country";
const delete_country = "delete";

//zip
const create_zip = "create-zip";
const update_zip = "update-zip";
const get_all_zip = "get-all";
const get_one_zip = "get-one";
const get_actif_zip = "get-actif";
const count_zip = "count_zip";
const delete_zip = "delete";

//hub
const create_hub = "create-hub";
const update_hub = "update-hub";
const get_all_hub = "get-all";
const get_one_hub = "get-one";
const get_actif_hub = "get-actif";
const count_hub = "count_hub";
const delete_hub = "delete";

//province
const create_province = "create-province";
const update_province = "update-province";
const get_all_province = "get-all";
const get_one_province = "get-one";
const get_actif_province = "get-actif";
const count_province = "count_province";
const delete_province = "delete";

//city
const create_city = "create-city";
const update_city = "update-city";
const get_all_city = "get-all";
const get_one_city = "get-one";
const get_actif_city = "get-actif";
const count_city = "count_city";
const delete_city = "delete";

// ####################### UPLOAD ROUTES

const upload = "upload";

// --------------------------Request Route Upload--------------------------

//upload
const create_upload_web = "create-url-web";
const create_upload_mobile = "create-url-mobile";
const delete_upload = "delete";

// ####################### SUPPORT ROUTES
const support = "support";

//Support
const create_support = "create-support";
const update_support = "update-support";
const get_all_support = "get-all";
const get_one_support = "get-one";
const get_all_support_booking = "get-all-support-booking";
const count_support = "count-support";
const delete_support = "delete";

export {
  // --------------------------Request Admin--------------------------
  admin,
  create_admin,
  login_admin,
  update_admin,
  update_password_admin,
  get_all_admin,
  get_one_admin,
  count_admin,
  check_admin,
  delete_admin,
  // --------------------------Request Category--------------------------
  category,
  create_category,
  update_category,
  get_all_category,
  get_one_category,
  delete_category,
  // --------------------------Request Actuality--------------------------
  actuality,
  create_actuality,
  update_actuality,
  get_all_actuality,
  get_one_actuality,
  delete_actuality,
  // --------------------------Request Activity--------------------------
  activity,
  create_activity,
  update_activity,
  get_all_activity,
  get_one_activity,
  delete_activity,
  // --------------------------Request Comment--------------------------
  comment,
  create_comment,
  update_comment,
  get_all_comment,
  get_one_comment,
  delete_comment,
  // --------------------------Request Report--------------------------
  report,
  create_report,
  update_report,
  get_all_report,
  delete_report,
  // --------------------------Request Permission--------------------------
  permission,
  create_permission,
  update_permission,
  get_all_permission,
  get_one_permission,
  delete_permission,
  // --------------------------Request Rang--------------------------
  rang,
  create_rang,
  update_rang,
  get_all_rang,
  toggle_rang_status,
  delete_rang,
  // --------------------------Request Bill--------------------------
  bill,
  get_all_bill,
  get_user_bill,
  // --------------------------Request Notification--------------------------
  notification,
  create_notification,
  update_notification,
  get_all_notifications,
  get_all_orphan_notifications,
  get_user_notifications,
  delete_notification,  





  // --------------------------Request Role--------------------------
  role,
  create_role,
  update_role,
  get_all_role,
  get_one_role,
  delete_role,
  // // --------------------------Request Permission--------------------------
  // permission,
  // create_permission,
  // update_permission,
  // get_all_permission,
  // get_one_permission,
  // delete_permission,

  // --------------------------Request Glocery Partner--------------------------
  glocery_partner,
  create_glocery_partner,
  login_glocery_partner,
  update_glocery_partner,
  update_password_glocery_partner,
  get_all_glocery_partner,
  get_one_glocery_partner,
  count_glocery_partner,
  check_glocery_partner,
  delete_glocery_partner,

  // --------------------------Request Glocery item--------------------------
  glocery_item,
  create_glocery_item,
  update_glocery_item,
  get_all_glocery_item,
  get_all_company_glocery_item,
  get_one_glocery_item,
  delete_glocery_item,

  // --------------------------Request User--------------------------
  user,
  create_user,
  login_user,
  create_chef,
  update_user,
  update_user_admin,
  update_chef_admin,
  get_all_user,
  get_all_total_user,
  get_all_chef,
  get_one_user,
  get_one_chef,
  check_chef,
  check_user,
  delete_chef,
  delete_user,
  count_user,
  // --------------------------Request Deliverman--------------------------
  deliverman,
  create_deliverman,
  create_deliverman_admin,
  login_deliverman,
  update_deliverman,
  update_deliverman_admin,
  update_password_deliverman,
  update_password_deliverman_admin,
  get_all_deliverman,
  get_one_deliverman,
  check_deliverman,
  count_deliverman,
  delete_deliverman,
  // --------------------------Request Food--------------------------
  food,
  create_food,
  update_food,
  get_all_food,
  get_all_food_company,
  get_one_food,
  get_actif_food,
  get_actif_food_chef,
  count_food,
  delete_food,
  // --------------------------Request Food Type--------------------------
  food_type,
  create_food_type,
  update_food_type,
  get_all_food_type,
  get_one_food_type,
  get_actif_food_type,
  count_food_type,
  delete_food_type,
  // --------------------------Request Support--------------------------
  support,
  create_support,
  update_support,
  get_all_support,
  get_one_support,
  get_all_support_booking,
  count_support,
  delete_support,
  // --------------------------Request Upload--------------------------
  upload,
  create_upload_web,
  create_upload_mobile,
  delete_upload,
  // --------------------------Request Setting--------------------------
  country,
  create_country,
  update_country,
  get_all_country,
  get_one_country,
  get_one_by_country,
  delete_country,
  // --------------------------Request Push--------------------------
  push,
  send_push,
  create_push,
  update_push,
  get_all_push,
  get_one_push,
  delete_push,
  count_push,
  // --------------------------Request Allergens--------------------------
  allergens,
  create_allergens,
  update_allergens,
  get_all_allergens,
  get_one_allergens,
  get_actif_allergens,
  delete_allergens,
  count_allergens,
  // --------------------------Request Speciality--------------------------
  speciality,
  create_speciality,
  update_speciality,
  get_all_speciality,
  get_one_speciality,
  get_actif_speciality,
  delete_speciality,
  count_speciality,
  // --------------------------Request Geographical--------------------------
  geographical,
  create_geographical,
  update_geographical,
  get_all_geographical,
  get_one_geographical,
  get_actif_geographical,
  delete_geographical,
  count_geographical,
  // --------------------------Request Ingredient--------------------------
  ingredient,
  create_ingredient,
  update_ingredient,
  get_all_ingredient,
  get_one_ingredient,
  get_actif_ingredient,
  delete_ingredient,
  count_ingredient,
  // --------------------------Request Spicy--------------------------
  spicy,
  create_spicy,
  update_spicy,
  get_all_spicy,
  get_one_spicy,
  get_actif_spicy,
  delete_spicy,
  count_spicy,
  // --------------------------Request template--------------------------
  template,
  create_template,
  update_template,
  get_all_template,
  get_one_template,
  get_actif_template,
  delete_template,
  count_template,
  // --------------------------Request dietary--------------------------
  dietary,
  create_dietary,
  update_dietary,
  get_all_dietary,
  get_one_dietary,
  get_actif_dietary,
  delete_dietary,
  count_dietary,
  // --------------------------Request Mailing--------------------------
  mailing,
  send_mail,

  // --------------------------Request Ads--------------------------
  ads,
  create_ads,
  update_ads,
  get_all_ads,
  get_one_ads,
  get_actif_ads,
  delete_ads,
  count_ads,
  // --------------------------Request Discount--------------------------
  discount,
  create_discount,
  update_discount,
  get_all_discount,
  get_one_discount,
  get_actif_discount,
  delete_discount,
  count_discount,

  // --------------------------Request Order--------------------------
  order,
  create_order,
  update_order,
  get_all_order,
  get_one_order,
  get_actif_order,
  get_user_orders,
  get_chef_orders,
  count_order,
  delete_order,

  // --------------------------Request Province--------------------------
  province,
  create_province,
  update_province,
  get_all_province,
  get_one_province,
  get_actif_province,
  delete_province,
  count_province,
  // --------------------------Request City--------------------------
  city,
  create_city,
  update_city,
  get_all_city,
  get_one_city,
  get_actif_city,
  delete_city,
  count_city,

  // --------------------------Request Zip--------------------------
  zip,
  create_zip,
  update_zip,
  get_all_zip,
  get_one_zip,
  get_actif_zip,
  delete_zip,
  count_zip,

  // --------------------------Request Hub--------------------------
  hub,
  create_hub,
  update_hub,
  get_all_hub,
  get_one_hub,
  get_actif_hub,
  delete_hub,
  count_hub
};
