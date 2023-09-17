docker_build:
	docker build --platform linux/amd64 -t aries-frontend-demo .

docker_start:
	docker run \
		--privileged \
		--rm \
		--platform linux/amd64 \
		-p 3000:3000 \
		-p 4000:4000 \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v ~/dev/lehigh/cse/281/aries-frontend-demo:/root \
		--name aries-frontend-demo-dev \
		-it aries-frontend-demo

docker_stop:
	docker stop aries-frontend-demo-dev
	sleep 1
	docker rmi -f aries-frontend-demo:latest

docker_exec:
	docker exec -it aries-frontend-demo-dev bash

docker_init: docker_build docker_start

docker_restart: docker_stop docker_init