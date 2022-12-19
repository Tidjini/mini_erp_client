import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";

//achat
import { ArticleConfig } from "app/main/app_stock/article/ArticleConfig";
import { DemandeAchatConfig } from "app/main/app_achat/demande_achats/DemandeAchatConfig";
import { DevisAchatConfig } from "app/main/app_achat/devis_achats/DevisAchatConfig";
import { CommandeAchatConfig } from "app/main/app_achat/commande_achat/CommandeAchatConfig";

//production
import { ProductionConfig } from "app/main/app_production/promag/ProductionConfig";
import { ProduitConfig as ProductionProduitConfig } from "app/main/app_production/produit/ProduitConfig";
import { EmployeConfig as ProductionEmployeConfig } from "app/main/app_production/employe/EmployeConfig";
import { EtatConfig } from "app/main/app_production/reports/EtatConfig";
import { ArretConfig } from "app/main/app_production/arret/ArretConfig";
import { EntreSortieConfig } from "app/main/app_production/entreSortie/EntreSortieConfig";
import { ExpeditionConfig } from "app/main/app_production/expedition/ExpeditionConfig";
import { CasseConfig } from "app/main/app_production/casse/CasseConfig";
import { ProductionProdConfig } from "app/main/app_production/production/ProductionConfig";
import { PosteConfig } from "app/main/app_production/poste/PosteConfig";
import { WagonConfig } from "app/main/app_production/wagon/WagonConfig";
import { ProduitConfig } from "app/main/product/ProduitConfig";
import { EmployeConfig } from "app/main/employe/EmployeConfig";

//compta
import { DashboardConfig } from "app/main/comptabilite/dashboard/DashboardConfig";
import { EcritureConfig } from "app/main/comptabilite/ecriture/EcritureConfig";
import { LoginConfig } from "app/main/Login/LoginConfig";
import { ConmptaConfigurationConfig } from "app/main/comptabilite/configurations/ConfigurationConfig";
import { ConsultationConfig } from "app/main/comptabilite/consultation/configurations";
import { TransitConfig } from "app/main/transit/TransitConfig";
import { AppDashboardConfig } from "app/main/app_dashboard/Config";
import { ProductionOperationConfig } from "app/main/app_production/operations/OperationConfig";

//grh
import { GestionResourceHumaineConfig } from "app/main/app_grh/Config";
import { StockConfig } from "app/stock/Config";

import { TacheConfig } from "app/main/app_tache/TacheConfig";
import { TaskConfig } from "app/tasks/Config";

const routeConfigs = [
  StockConfig,
  ArticleConfig,
  DemandeAchatConfig,
  DevisAchatConfig,
  CommandeAchatConfig,
  ProductionConfig,
  ProductionProduitConfig,
  ProductionEmployeConfig,
  PosteConfig,
  WagonConfig,
  ArretConfig,
  EntreSortieConfig,
  CasseConfig,
  ExpeditionConfig,
  ProductionProdConfig,
  EtatConfig,
  ProduitConfig,
  EmployeConfig,
  DashboardConfig,
  EcritureConfig,
  ConmptaConfigurationConfig,
  ConsultationConfig,
  TransitConfig,
  LoginConfig,
  ProductionOperationConfig,
  GestionResourceHumaineConfig,
  TacheConfig,
  AppDashboardConfig,
  TaskConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/demande_achat_collection/" />,
  },
];

export default routes;
