docker_build:
	docker build --platform linux/amd64 -t aries-frontend-demo .

docker_start:
	docker run --privileged --rm --platform linux/amd64 -v ~/dev/lehigh/cse/281/aries-frontend-demo:/root --name aries-frontend-demo-dev -it aries-frontend-demo

docker_stop:
	docker stop aries-frontend-demo
	docker rm aries-frontend-demo