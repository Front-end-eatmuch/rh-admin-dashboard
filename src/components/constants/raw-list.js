const raw_menu = [
  { value: "dashboard", name: "Statistiques" },

  //admin
  { value: "admin", name: "Administrateurs menu" },
  { value: "admin-role", name: "Roles" },
  { value: "admin-permission", name: "Permissions" },
  { value: "admin-admin", name: "Administrateurs" },

  //epicerie
  { value: "glocery", name: "Epiceries menu" },
  { value: "glocery-partner", name: "Epicerie partenaire" },
  { value: "glocery-item", name: "Epicerie article" },
  { value: "glocery-order", name: "Epicerie commande" },

  //chef
  { value: "chef", name: "Chefs menu" },
  { value: "chef-list", name: "Chef liste" },
  { value: "chef-item", name: "Chef food" },
  { value: "chef-withdrawal", name: "Chef Retrait & Paiement" },

  //user
  { value: "hub", name: "Hubs" },

  //user
  { value: "user", name: "Utilisateurs" },

  //livreur
  { value: "deliverman", name: "Livreurs menu" },
  { value: "deliverman-list", name: "Livreur liste" },
  { value: "deliverman-withdrawal", name: "Livreur Retrait & Paiement" },

  //order
  { value: "order", name: "Commandes menu" },
  { value: "order-waiting", name: "Commande en attente" },
  { value: "order-accepted", name: "Commande acceptée" },
  { value: "order-ready", name: "Commande prête" },
  { value: "order-onway", name: "Commande en chemin" },
  { value: "order-delivered", name: "Commande livrée" },
  { value: "order-canceled", name: "Commande annulée" },
  { value: "waiting-refund", name: "Attente de remboursement" },
  { value: "order-refunded", name: "Commande remboursée" },

  //support
  { value: "support", name: "Support" },
  { value: "support-chef", name: "suport chef" },
  { value: "support-deliverman", name: " support deliverman" },
  { value: "support-user", name: " support utilisateur" },
  { value: "support-partner", name: " support partenaire" },

  //content
  { value: "content", name: "Contenus menu" },
  { value: "content-allergens", name: "Allergie" },
  { value: "content-dietary", name: "diététique" },
  { value: "content-food-type", name: "Type de plats" },
  { value: "content-geographical", name: "Géographique" },
  { value: "content-ingredient", name: "Ingrédient" },
  { value: "content-speciality", name: "Spécialité" },
  { value: "content-spicy", name: "Epice" },
  { value: "content-template", name: "Modèle plat" },

  // notification
  { value: "notification", name: "Notifications menu" },
  { value: "notification-discount", name: "Promotion" },
  { value: "notification-ads", name: "Annonces" },
  { value: "notification-push", name: "Push Message" },

  // settings
  { value: "setting", name: "Paramètres menu" },
  { value: "setting-country", name: "Pays" },
  { value: "setting-province", name: "Province" },
  { value: "setting-city", name: "Ville" },
  { value: "setting-zip", name: "Zip code" },
  { value: "setting-profil", name: "My profil" }
];

export { raw_menu };
