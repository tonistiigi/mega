bundle.js: index.js node_modules/*
	@echo "Building $@ `date`"
	browserify index.js -o $@