check:
	isort --recursive --check-only
	black -S -l 79 --check .
	pylint **/*.py

format:
	isort -rc -y
	black -S -l 79 .

test:
	python -m pytest

coverage:
	python -m pytest --cov $(PROJECT_DIR) --cov-report term

htmlcov:
	python -m pytest --cov $(PROJECT_DIR) --cov-report html
	rm -rf /tmp/htmlcov && mv htmlcov /tmp/
	open /tmp/htmlcov/index.html
