bundle.js: index.js node_modules/*
	@echo "Building $@ `date`"
	./node_modules/.bin/browserify index.js -o $@