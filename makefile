.PHONY: install test shell clean

include ./docker/.env
export

install:
	[ ! -f ./.env ] && cp ./.env.example ./.env 2>/dev/null; true
	[ ! -f ./.test.env ] && cp ./.env.example ./.test.env 2>/dev/null; true
	docker volume create nodemodules
	docker-compose -f docker-compose.builder.yml run --rm install

dev:
	docker-compose up

shell:
	docker-compose exec server bash 2>/dev/null; true

test:
	docker-compose exec server npm run test

clean:
	docker-compose down
	docker volume rm nodemodules
	sudo rm -rf ./docker/data
	rm ./package-lock.json
	
