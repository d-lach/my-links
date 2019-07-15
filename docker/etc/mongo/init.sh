#!/bin/bash
set -e;

if [ -n "${DB_TEST_USERNAME:-}" ] && [ -n "${DB_TEST_PASSWORD:-}" ]; then
	"${mongo[@]}" "$DB_TEST_NAME" <<-EOJS
		db.createUser({
			user: $(_js_escape "${DB_TEST_USERNAME}"),
			pwd: $(_js_escape "${DB_TEST_PASSWORD}"),
			roles: [ { role: $(_js_escape "readWrite"), db: $(_js_escape "$DB_TEST_NAME") } ]
			})
	EOJS
fi

if [ -n "${DB_USERNAME:-}" ] && [ -n "${DB_PASSWORD:-}" ]; then
	"${mongo[@]}" "$DB_NAME" <<-EOJS
		db.createUser({
			user: $(_js_escape "${DB_USERNAME}"),
			pwd: $(_js_escape "${DB_PASSWORD}"),
			roles: [ { role: $(_js_escape "readWrite"), db: $(_js_escape "$DB_NAME") } ]
			})
	EOJS
else
  exit 1
fi
