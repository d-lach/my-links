.PHONY: install test shell clean

CWD := $(abspath $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST))))))
NODEMODULES_VOLUME_UP=$(shell docker volume ls | grep nodemodules | wc -l)

include $(CWD)/docker/.env
export

install:
	mkdir -p $(CWD)/node_modules
	mkdir -p $(CWD)/.config
	ssh-keygen -t rsa -f $(CWD)/.config/jwt-key
	[ ! -f $(CWD)/server/.env ] && cp $(CWD)/server/.env.example $(CWD)/server/.env 2>/dev/null; true
	[ ! -f $(CWD)/server/.test.env ] && cp $(CWD)/server/.env.example $(CWD)/server/.test.env 2>/dev/null; true
	docker volume create -d local -o type=none -o o=bind -o device=$(CWD)/node_modules nodemodules
	docker-compose -f docker-compose.builder.yml run --rm install

dev:
	docker-compose up

shell:
	docker-compose exec server bash 2>/dev/null; true

test:
	docker-compose exec server npm run test

clean:
	docker-compose down --remove-orphans
	@if [ $(NODEMODULES_VOLUME_UP) -gt 0 ]; then\
		docker volume rm nodemodules;\
	fi
	sudo rm -rf $(CWD)/docker/data
	sudo rm -rf $(CWD)/node_modules
	sudo rm -rf $(CWD)/.config
	@if [ -f $(CWD)/package-lock.json ]; then\
    	rm $(CWD)/package-lock.json;\
    fi
