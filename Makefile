.PHONY: default
default: build

.ONESHELL:

.PHONY: get_node_modules_if_necessary
get_node_modules_if_necessary:
	if [ ! -d ./node_modules/ ]; then npm install; fi

.PHONY: add_test_data_if_necessary
add_test_data_if_necessary:
	if [ ! -f ./src/assets/testData.json ]; then
		echo "{\"TestData\":[]}" > ./src/assets/testData.json
	fi

.PHONY: do_checks
do_checks: get_node_modules_if_necessary add_test_data_if_necessary

.PHONY: build
build: do_checks 
	ng build --prod

.PHONY: run
run: do_checks 
	ng serve

.PHONY: clean
clean:
	rm dist/ -rf || true

.PHONY: clean_modules
clean_modules:
	rm node_modules/ -rf || true

.PHONY: deep_clean
deep_clean: clean clean_modules

.PHONY: update_memories
update_memories:
	memories=$$(brain --json);
	asset="{\"TestData\":$${memories}}";
	echo $$asset > ./src/assets/testData.json
