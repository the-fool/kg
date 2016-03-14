syncdb:
	python ./manage.py makemigrations --noinput
	python ./manage.py migrate --noinput

fixtures:
	python ./manage.py create_departments
