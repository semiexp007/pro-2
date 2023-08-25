variable "BUILD_NUMBER" {
}

variable "ECR_URL" {
}

variable "region" {
}

variable "env" {
}

variable "app_name" {
}


variable "internal_cidrs" {
  default = ["10.0.0.0/8", "192.168.0.0/16"]
}

variable "scheduletag" {}