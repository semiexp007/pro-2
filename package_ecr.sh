#!/bin/bash

set -euo pipefail

echo -e "--- Terraform ECR repo :terraform:"

# TERRAFORM STEP, get the ecr url
cd deploy/ecr
terraform init 
terraform validate 
terraform apply -auto-approve -var-file=config/dev.tfvars
terraform_vars=$(terraform output --json)
REPOSITORY_URL=$(echo $terraform_vars  | jq -r .ecr_url.value)
REPOSITORY_NAME=$(echo $terraform_vars  | jq -r .ecr_name.value)
#Below is test
echo ${REPOSITORY_NAME}
echo ${REPOSITORY_URL}


cd ../..

echo -e "--- Building Docker Image :docker: and pushing to ECR"

# Build
sudo docker build -t ${REPOSITORY_URL}:${BUILDKITE_BUILD_NUMBER} .
wait

# Publish
sudo docker push ${REPOSITORY_URL}:${BUILDKITE_BUILD_NUMBER} || \
  ( echo "Login expired. Relogging in..." && \
    eval $(aws ecr get-login --no-include-email --region ${AWS_DEFAULT_REGION}) && \
    docker push ${REPOSITORY_URL}:${BUILDKITE_BUILD_NUMBER} )

# Pass REPOSITORY_URL to downstream buildkite steps
buildkite-agent meta-data set "REPOSITORY_URL" "${REPOSITORY_URL}"
buildkite-agent meta-data set "REPOSITORY_NAME" "${REPOSITORY_NAME}"

echo "Successfully pushed docker image to ${REPOSITORY_URL}:${BUILDKITE_BUILD_NUMBER}"
