all: tag

DOCKER_REPO = docker.wouterdeschuyter.be

PWD = $(shell pwd)
VERSION = $(shell cat package.json | grep "\"version\"" | sed -e 's/^.*: "\(.*\)".*/\1/')
PROJECT = $(shell cat package.json | grep "\"name\"" | sed -e 's/^.*: "\(.*\)".*/\1/')

TAG_NGINX = $(DOCKER_REPO)/$(PROJECT)-nginx
DOCKERFILE_NGINX = ./.docker/nginx/Dockerfile

TAG_NODE = $(DOCKER_REPO)/$(PROJECT)-node
DOCKERFILE_NODE = ./.docker/node/Dockerfile

clean:
	-rm -rf ./node_modules
	-rm -rf ./public
	-rm -rf ./images/**
	-rm -rf ./videos/**
	-rm -rf ./.build-*

node_modules: package.json
	docker run --rm -v $(PWD):/code -v ~/.ssh:/root/.ssh:ro -w /code node:9 npm install

.build-app: node_modules
	docker run --rm -v $(PWD):/code -w /code node:9 npm run build
	touch .build-app

.build-nginx: $(DOCKERFILE_NGINX)
	docker build -f $(DOCKERFILE_NGINX) -t $(TAG_NGINX) .
	touch .build-nginx

.build-node: $(DOCKERFILE_NODE)
	docker build -f $(DOCKERFILE_NODE) -t $(TAG_NODE) .
	touch .build-node

build: .build-app .build-nginx .build-node

tag: build
	docker tag $(TAG_NGINX) $(TAG_NGINX):$(VERSION)
	docker tag $(TAG_NODE) $(TAG_NODE):$(VERSION)

push: tag
	docker push $(TAG_NGINX):$(VERSION)
	docker push $(TAG_NODE):$(VERSION)

push-latest: push
	docker push $(TAG_NGINX):latest
	docker push $(TAG_NODE):latest
