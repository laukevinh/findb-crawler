from django.db import models

# Create your models here.
from sqlalchemy import create_engine
from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Date
from sqlalchemy import DateTime
from sqlalchemy import String
from sqlalchemy.sql.expression import null
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.engine import Engine
from sqlalchemy import insert
from sqlalchemy import select
from sqlalchemy import delete
from .settings import CONNECTION

metadata_obj = MetaData()
house_zip_url = Table('house_zip_urls', metadata_obj,
                      Column('id', Integer, primary_key=True),
                      Column('year', String(60), nullable=False),
                      Column('url', String(2000), nullable=False),
                      Column('url_crawled_on', DateTime()),
                      Column('created_on', DateTime(),
                              server_default=current_timestamp()),
                      Column('modified_on', DateTime(), onupdate=current_timestamp()),
                      )

house_fd = Table('house_fd', metadata_obj,
                 Column('id', Integer, primary_key=True),
                 Column('prefix', String(60)),
                 Column('last', String(60), nullable=False),
                 Column('first', String(60), nullable=False),
                 Column('suffix', String(60)),
                 Column('filing_type', String(60), key='filingtype'),
                 Column('state_district', String(60), key='statedst'),
                 Column('year', String(60)),
                 Column('filing_date', Date(), key='filingdate'),
                 Column('doc_id', String(60), key='docid'),
                 Column('created_on', DateTime(),
                         server_default=current_timestamp()),
                 Column('modified_on', DateTime(), onupdate=current_timestamp()),
                )


def create_tables():
    engine = create_engine(CONNECTION, future=True)
    house_zip_url.create(engine, checkfirst=True)
    house_fd.create(engine, checkfirst=True)


def destroy_tables():
    engine = create_engine(CONNECTION, future=True)
    house_zip_url.drop(engine)
    house_fd.drop(engine)


def insert_data(engine: Engine, table: Table, data):
    with engine.begin() as connection:
        connection.execute(table.select())
        stmt = insert(table).returning(table.c.id)
        results = connection.execute(stmt, data)
        return results.all()

def get_all_data(engine: Engine, table: Table):
    with engine.begin() as connection:
        results = connection.execute(table.select())
        return results.all()

def get_data_by_year(engine: Engine, table: Table, year: str):
    with engine.begin() as connection:
        connection.execute(table.select())
        stmt = select(table).where(table.c.year == year)
        results = connection.execute(stmt)
        return results.all()

def delete_data(engine: Engine, table: Table):
    with engine.begin() as connection:
        connection.execute(table.select())
        stmt = delete(table).returning(table.c.id)
        results = connection.execute(stmt)
        return results.all()

def delete_data_by_year(engine: Engine, table: Table, year: str):
    with engine.begin() as connection:
        connection.execute(table.select())
        stmt = delete(table).where(table.c.year == year).returning(table.c.id)
        results = connection.execute(stmt)
        return results.all()


if __name__ == '__main__':
    import sys
    if 'create' in sys.argv:
        create_tables()
    if 'drop' in sys.argv:
        destroy_tables()