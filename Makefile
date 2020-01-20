BUILD_DIR         = ./build
JEST_CONFIG       = ./config/jest/index.js
TYPESCRIPT_CONFIG = ./tsconfig.json
WEBPACK_CONFIG    = ./config/webpack/index.js

.PHONY: analyze build build-profile check-scripts check-scripts-hook check-styles check-styles-hook check-types clean prettier-hook start test

analyze:
	yarn cross-env NODE_ENV=production ANALYZE=true yarn webpack --config $(WEBPACK_CONFIG)

build: clean check-types
	yarn cross-env NODE_ENV=production yarn webpack --config $(WEBPACK_CONFIG)

build-profile: clean check-types
	yarn cross-env NODE_ENV=production PROFILE=true yarn webpack --config $(WEBPACK_CONFIG)

check-scripts:
	yarn eslint --ext .tsx,.ts,.js . src

check-scripts-hook:
	yarn eslint $(filter-out $@,$(MAKECMDGOALS))

check-styles:
	yarn stylelint src/**/*.css src/**/*.pcss

check-styles-hook:
	yarn stylelint $(filter-out $@,$(MAKECMDGOALS))

check-types:
	yarn tsc --project $(TYPESCRIPT_CONFIG) --noEmit

clean:
	rm -rf $(BUILD_DIR)

prettier-hook:
	yarn prettier $(filter-out $@,$(MAKECMDGOALS))

start:
	yarn cross-env NODE_ENV=development yarn webpack-dev-server --config $(WEBPACK_CONFIG)

test:
	yarn cross-env NODE_ENV=test jest --config $(JEST_CONFIG) $(filter-out $@,$(MAKECMDGOALS))

%:
	@true
