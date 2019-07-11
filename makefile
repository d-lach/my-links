install:
	[ ! -f ./my-links-src/.env ] && cp ./my-links-src/.env.example ./my-links-src/.env 2>/dev/null; true
	[ ! -f ./my-links-src/.test.env ] && cp ./my-links-src/.env.example ./my-links-src/.test.env 2>/dev/null; true
	docker volume create nodemodules
	docker-compose -f docker-compose.builder.yml run --rm install

dev:
	docker-compose up

shell:
	docker-compose exec server bash

test:
	docker-compose exec server npm run test

clean:
	docker-compose down
	sudo rm -rf ./data
	rm ./my-links-src/package-lock.json
	docker volume rm nodemodules

