terraform {
  # Versión exigida en la propuesta base
  required_version = ">= 1.6"
  
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.30"
    }
  }
  
  # Backend GCS con el bucket exacto indicado en las instrucciones
  backend "gcs" {
    bucket = "meditriage-tfstate-equipo-a"
    prefix = "k8s"
  }
}

# Provider apuntando al contexto exacto de kind
provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "kind-meditriage"
}

# Variable marcada como sensible según el prompt
variable "gemini_api_key" {
  description = "API Key para Gemini (Placeholder)"
  type        = string
  default     = "REEMPLAZAR"
  sensitive   = true
}

# Namespace con el nombre y los labels obligatorios de la Propuesta base
resource "kubernetes_namespace" "equipo" {
  metadata {
    name = "equipo-a"
    
    labels = {
      "app"        = "meditriage-api"
      "iniciativa" = "meditriage"
    }
  }
}

# Secret con el nombre exacto y los labels obligatorios de la Propuesta base
resource "kubernetes_secret" "meditriage" {
  metadata {
    name      = "meditriage-secrets"
    namespace = kubernetes_namespace.equipo.metadata[0].name
    
    labels = {
      "app"        = "meditriage-api"
      "iniciativa" = "meditriage"
    }
  }
  
  data = {
    GEMINI_API_KEY = var.gemini_api_key
  }

  type = "Opaque"
}