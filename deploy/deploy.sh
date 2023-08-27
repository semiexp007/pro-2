echo "------------Remove docker image--------------"
docker system prune -a -f
docker system df
echo "---------------------------------------------"

export TF_VAR_BUILD_NUMBER=${BUILD_NUMBER}
export TF_VAR_ECR_URL=$(buildkite-agent meta-data get "REPOSITORY_URL" --job ${TRIGGER_ID})
cd "$(dirname "$0")"


./init.sh

#debug
terraform validate

terraform apply --var-file=config/$ENVIRONMENT.tfvars --auto-approve