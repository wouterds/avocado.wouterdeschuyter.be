all: tag

DOCKER_REPO = docker.wouterdeschuyter.be

PWD = $(shell pwd)
VERSION = $(shell cat package.json | grep "\"version\"" | sed -e 's/^.*: "\(.*\)".*/\1/')
PROJECT = $(shell cat package.json | grep "\"name\"" | sed -e 's/^.*: "\(.*\)".*/\1/')

TAG_NGINX = $(DOCKER_REPO)/$(PROJECT)-nginx
DOCKERFILE_NGINX = ./.docker/nginx/Dockerfile

clean:
	-rm -rf ./node_modules
	-rm -rf ./package-lock.json
	-rm -rf ./public
	-rm -rf ./.build-*

node_modules: package.json
	docker run --rm -v $(PWD):/code -v ~/.ssh:/root/.ssh:ro -w /code node:8 npm install

.build-app: node_modules
	docker run --rm -v $(PWD):/code -w /code node:8 npm run build
	touch .build-app

.build-nginx: $(DOCKERFILE_NGINX)
	docker build -f $(DOCKERFILE_NGINX) -t $(TAG_NGINX) .
	touch .build-nginx

build: .build-app .build-nginx

tag: build
	docker tag $(TAG_NGINX) $(TAG_NGINX):$(VERSION)

push: tag
	docker push $(TAG_NGINX):$(VERSION)

push-latest: push
	docker push $(TAG_NGINX):latest
