#!/bin/bash

PROJECT_ID=apigee-csa-meetup
ZONE=europe-west2-a
MYSQL_ROOT_PASSWORD=MXNgmdQZfuWkDNjgYS3A

gcloud container clusters create istio \
  --cluster-version=1.10.6-gke.2 \
  --zone ${ZONE} \
  --project ${PROJECT_ID}

gcloud container clusters get-credentials istio \
--zone ${ZONE} \
--project ${PROJECT_ID}

kubectl create clusterrolebinding cluster-admin-binding \
    --clusterrole=cluster-admin \
    --user=$(gcloud config get-value core/account)

curl -L https://git.io/getLatestIstio | sh -

pushd istio-*

kubectl apply -f install/kubernetes/istio-demo-auth.yaml

kubectl label namespace default istio-injection=enabled

popd

kubectl create secret generic mysql-pass --from-literal=password=${MYSQL_ROOT_PASSWORD}

kubectl apply -f mysql.yaml
