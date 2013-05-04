MAKEFLAGS += --check-symlink-times

bundle.js: index.js $(shell find node_modules -name "*.js") | componentify
	@echo "Building $@ `date`"
	./node_modules/.bin/browserify index.js -o $@

componentify: $(patsubst %-component, %, $(shell find node_modules -type d -name "*-component"))

%: %-component
	ln -fs $(notdir $<) $@