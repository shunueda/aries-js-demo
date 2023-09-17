docker_build:
	docker build --platform linux/amd64 -t aries-frontend-demo .

docker_start:
	docker run --privileged --rm --platform linux/amd64 \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v ~/dev/lehigh/cse/281/aries-frontend-demo:/root \
		--name aries-frontend-demo-dev \
		-it aries-frontend-demo

docker_stop:
	docker stop aries-frontend-demo-dev
	docker rmi aries-frontend-demo:latest

docker_init: docker_build docker_start

docker_restart: docker_stop docker_init