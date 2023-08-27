variable "availibility_zones" {
  type = map(string)

  default = {
    onea = "us-east-1a"
    oneb = "us-east-1b"
  }
}

variable "subnet_cidr" {
  type = map(string)

  default = {
    public_onea  = "10.0.1.0/24"
    public_oneb  = "10.0.2.0/24"
    private_onea = "10.0.5.0/24"
    private_oneb = "10.0.6.0/24"
  }
}