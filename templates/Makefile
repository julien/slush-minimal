# vim: ts=4 sw=4 noexpandtab
SHELL    = /bin/bash
HTML_SRC = src/index.html
HTML_DST = build/index.html
CSS_SRC  = $(shell find src/css -type f -name '*.css')
CSS_DST  = build/style.css
JS_SRC   = $(shell find src/js -type f -name '*.js')
JS_DST   = build/bundle.js 

all: clean lint $(JS_DST) $(HTML_DST) $(CSS_DST)

$(JS_DST): $(JS_SRC)
	@echo + Minifying JavaScript
	@mkdir -p $(@D)
	@node ./node_modules/uglify-js/bin/uglifyjs $(JS_SRC) -o $@ -c 'warnings=false' -m --screw-ie8

$(HTML_DST): $(HTML_SRC)
	@echo + Processing HTML
	@node -e "require('./node_modules/htmlprocessor/index')({src:['$(HTML_SRC)'],dest:'$@.tmp'});"
	@sleep 1.0
	@node minify $@.tmp $@
	@sleep 0.5
	@rm -f $@.tmp

$(CSS_DST): $(CSS_SRC)
	@echo + Minifying CSS
	@node minify $(CSS_SRC) $@

lint:
	@echo + Linting JavaScript
	@node ./node_modules/eslint/bin/eslint.js src/js/*.js

server:
	@cd src && node ../node_modules/sencisho/bin/sencisho -l -w js/*.js

clean:
	@echo + Removing build directory
	@rm -rf build

.PHONY: clean lint server

