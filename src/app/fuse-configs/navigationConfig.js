import { TaskConfig } from "app/tasks/Config";

const { navigation: tasks } = TaskConfig;

const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    type: "group",
    icon: "apps",
    children: [
      tasks,
      {
        id: "dashboard",
        title: "Tableau de Bord",
        type: "item",
        icon: "description",
        url: "/app_dashboard/",
      },
      {
        id: "app_achat",
        title: "Gestion des Achats",
        type: "group",
        children: [
          {
            id: "stock-category",
            title: "Category",
            icon: "Item",
            type: "item",
            url: "/categories/",
          },
          {
            id: "achat_stock",
            title: "Articles",
            icon: "description",
            type: "item",
            url: "/articles/",
          },
          {
            id: "demande_achat_component",
            title: "Demandes Achats",
            icon: "description",
            type: "item",
            url: "/demande_achat_collection/",
          },
          {
            id: "devis_achat_component",
            title: "Devis Achats",
            icon: "description",
            type: "item",
            url: "/devis_achat_collection/",
          },
          {
            id: "commande_achat_component",
            title: "Commande Achats",
            icon: "description",
            type: "item",
            url: "/commande_achat_collection/",
          },
        ],
      },

      {
        id: "app_grh",
        title: "Gestion Resources Humaines",
        type: "group",
        children: [
          {
            id: "grh-service-list",
            title: "Service Liste",
            icon: "settings_applications",
            type: "item",
            url: "/service-list/",
          },
          {
            id: "grh-poste-list",
            title: "Poste Liste",
            icon: "all_inbox",
            type: "item",
            url: "/poste-list/",
          },
          {
            id: "grh-statue-list",
            title: "Statue Liste",
            icon: "games",
            type: "item",
            url: "/statue-list/",
          },
          {
            id: "employe-list",
            title: "Employes Liste",
            icon: "accessibility",
            type: "item",
            url: "/employe-list/",
          },
        ],
      },

      // {
      //   id: "app_tache",
      //   title: "Gestion Tâches",
      //   type: "group",
      //   children: [
      //     {
      //       id: "tache_configurations",
      //       title: "Tache Configurations",
      //       icon: "category",
      //       type: "item",
      //       url: "/tache-configurations/",
      //     },
      //     {
      //       id: "taches",
      //       title: "Liste des Tâches",
      //       icon: "list",
      //       type: "item",
      //       url: "/tache-list/",
      //     },
      //   ],
      // },
      {
        id: "app_production",
        title: "Production",
        type: "group",
        children: [
          {
            id: "production_produit",
            title: "Produits",
            icon: "aspect_ratio",
            type: "item",
            url: "/production-produits/",
          },
          {
            id: "production_wagon",
            title: "Wagons",
            icon: "apps",
            type: "item",
            url: "/production-wagons/",
          },
          {
            id: "prod_employe",
            title: "Prod. Personnels",
            icon: "account_circle",
            type: "item",
            url: "/gestion-employees/",
          },

          {
            id: "prod_postes",
            title: "Prod. Postes",
            icon: "event_seat",
            type: "item",
            url: "/production-postes/",
          },
          {
            id: "prod_arrets",
            title: "Prod. Arrêts",
            icon: "pause_circle_outline",
            type: "item",
            url: "/production-arrets/",
          },
          {
            id: "prod_es",
            title: "Prod. Entrés / Sorties",
            icon: "pause_circle_outline",
            type: "item",
            url: "/entres-sorties/",
          },
          {
            id: "prod_expedition",
            title: "Prod. Expéditions",
            icon: "pause_circle_outline",
            type: "item",
            url: "/expeditions/",
          },
          {
            id: "prod_casse",
            title: "Prod. Casse",
            icon: "pause_circle_outline",
            type: "item",
            url: "/casses/",
          },
          {
            id: "prod_production",
            title: "Prod. Production",
            icon: "pause_circle_outline",
            type: "item",
            url: "/productions/",
          },
          {
            id: "production_operations",
            title: "Historique Operations",
            icon: "assignement_turned_in",
            type: "item",
            url: "/production-operations/",
          },
          // {
          //   id: "prod_reports",
          //   title: "Etat. Production ",
          //   icon: "pause_circle_outline",
          //   type: "item",
          //   url: "/etat-production/",
          // },
        ],
      },
      {
        id: "transit",
        title: "Transit",
        type: "group",
        children: [
          {
            id: "bitume_operation",
            title: "Bitume Opération",
            icon: "transit_enterexit",
            type: "item",
            url: "/bitume-operation-collection/",
          },
        ],
      },

      {
        id: "compta_app",
        title: "Comptabilité Général",
        type: "group",
        children: [
          {
            id: "comptabilite",
            title: "Accueil",
            icon: "all_inbox",
            type: "item",
            url: "/compta_dashboard/",
          },
          {
            id: "consultation",
            title: "Consultation",
            icon: "apps",
            type: "collapse",
            children: [
              {
                id: "consultation_general",
                title: "Général",
                icon: "all_inbox",
                type: "item",
                url: "/consultation/mouvement",
              },
              {
                id: "consultation_detail",
                title: "Détaillées",
                icon: "all_inbox",
                type: "item",
                url: "/consultation/ecriture",
              },
            ],
          },
          {
            id: "ecriture",
            title: "Saisie des Écritures",
            icon: "edit",
            type: "item",
            url: "/saisie_ecriture/_",
          },
          {
            id: "compta_configuration",
            title: "Paramétrage",
            icon: "settings",
            type: "item",
            url: "/compta_configuration/",
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
