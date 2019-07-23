.PHONY: install test shell clean dev

CWD := $(abspath $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST))))))
NODEMODULES_VOLUME_UP=$(shell docker volume ls | grep nodemodules | wc -l)

include $(CWD)/docker/.env
export

install:
	mkdir -p $(CWD)/node_modules
	mkdir -p $(CWD)/.config
	ssh-keygen -t rsa -b 4096 -m PEM -f $(CWD)/.config/jwt.key
	openssl rsa -in $(CWD)/.config/jwt.key -pubout -outform PEM -out $(CWD)/.config/jwt.key.pub
	[ ! -f $(CWD)/server/.env ] && cp $(CWD)/server/.env.example $(CWD)/server/.env 2>/dev/null; true
	[ ! -f $(CWD)/server/.test.env ] && cp $(CWD)/server/.env.example $(CWD)/server/.test.env 2>/dev/null; true
	docker volume create -d local -o type=none -o o=bind -o device=$(CWD)/node_modules nodemodules
	docker-compose -f docker-compose.builder.yml run --rm install

dev:
	docker-compose up -d
	${MAKE} inspect

test:
	docker-compose exec server npm run test

shell:
	docker-compose exec server bash 2>/dev/null; true

inspect:
	docker-compose logs -f --tail=250 server 2>/dev/null; true

logs:
	docker-compose logs -f --tail=500

close:
	docker-compose down --remove-orphans

clean:
	${MAKE} close
	@if [ $(NODEMODULES_VOLUME_UP) -gt 0 ]; then\
		docker volume rm nodemodules;\
	fi
	sudo rm -rf $(CWD)/docker/data
	sudo rm -rf $(CWD)/node_modules
	sudo rm -rf $(CWD)/.config
	@if [ -f $(CWD)/package-lock.json ]; then\
    	rm $(CWD)/package-lock.json;\
    fi
