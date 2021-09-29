import os

# Connection params

CONNECTION = '{dialect}+{driver}://{username}:{password}@{host}:{port}/{database}'.format(
    dialect='postgresql',
    driver='psycopg2',
    username='postgres',
    password=os.environ.get('PGPASS', ''),
    host='localhost',
    port='5432',
    database='findb'
)
