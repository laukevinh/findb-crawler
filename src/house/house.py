import re
import io
from typing import List
from urllib.parse import urljoin
from datetime import datetime
from zipfile import ZipFile

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait

base_url = "https://disclosures-clerk.house.gov/PublicDisclosure/FinancialDisclosure"
PARSER = 'html.parser'
DOWNLOAD_ID = "download"
DOWNLOAD_LINK_ELEMENT = 'tag a'

MEMBER_XML_TAG = 'member'
PREFIX_NAME_XML_TAG = 'prefix'
LAST_NAME_XML_TAG = 'last'
FIRST_NAME_XML_TAG = 'first'
SUFFIX_NAME_XML_TAG = 'suffix'
FILING_TYPE_XML_TAG = 'filingtype'
STATE_DST_XML_TAG = 'statedst'
YEAR_XML_TAG = 'year'
FILING_DATE_XML_TAG = 'filingdate'
DOC_ID_XML_TAG = 'docid'

DATE_FMT = r'%m/%d/%Y'


def get_page_source(url: str):
    browser = webdriver.Firefox()
    page_source = None
    try:
        browser.get(url)
        WebDriverWait(browser, timeout=10).until(
            lambda b: b.find_element_by_tag_name(DOWNLOAD_LINK_ELEMENT))
        page_source = browser.page_source
    except:
        raise
    finally:
        browser.close()
    return page_source


def get_abs_paths(page_source: str, base_url: str) -> List[str]:
    parser = BeautifulSoup(page_source, PARSER)
    download_div = parser.find(id=DOWNLOAD_ID)
    link_elements = download_div.select(DOWNLOAD_LINK_ELEMENT)
    rel_paths = [link_ele.get('href') for link_ele in link_elements]
    abs_paths = [urljoin(base_url, rel_path) for rel_path in rel_paths]
    return abs_paths


def get_years_from_url(abs_paths: str) -> List[str]:
    str_pattern = r'(\d{4})FD.ZIP'
    pattern = re.compile(str_pattern)
    return [pattern.search(path).group(1) for path in abs_paths]


def convert_to_date(datetext: str):
    try:
        date = datetime.strptime(datetext, DATE_FMT).date()
    except:
        date = None
    return date


def get_xml_parser_from_local_path(abs_path: str) -> BeautifulSoup:
    """Returns the xml parser for a Financial Disclosures zip file local path. 

        The zip file is titled YYYYFD.zip, such as 2016FD.zip, and it 
        contains both .txt and .xml versions of the same data. While the 
        Financial Disclosures committee may change the reporting format 
        in the future, we will assume only 1 .xml file exists and it 
        contains all transactions for the year.
    """
    z = ZipFile(abs_path)
    for filename in z.namelist():
        if '.xml' in filename:
            with z.open(filename) as f:
                return BeautifulSoup(f.read(), 'lxml')
    return None


def get_xml_parser_from_zip_object(z: ZipFile) -> BeautifulSoup:
    """Returns the xml parser for a Financial Disclosures ZipFile object.

        The zip file is titled YYYYFD.zip, such as 2016FD.zip, and it
        contains both .txt and .xml versions of the same data. While the
        Financial Disclosures committee may change the reporting format
        in the future, we will assume only 1 .xml file exists and it
        contains all transactions for the year.
    """
    for filename in z.namelist():
        if '.xml' in filename:
            with z.open(filename) as f:
                return BeautifulSoup(f.read(), 'lxml')
    return None


def get_xml_parser_from_url(abs_path: str) -> BeautifulSoup:
    with requests.get(abs_path, stream=True) as r:
        with ZipFile(io.BytesIO(r.content)) as z:
            return get_xml_parser_from_zip_object(z)


def extract_zip_url_as_list(abs_path: str) -> List:
    xml_parser = get_xml_parser_from_url(abs_path)
    return [{
        PREFIX_NAME_XML_TAG: transaction.find(PREFIX_NAME_XML_TAG).text,
        LAST_NAME_XML_TAG: transaction.find(LAST_NAME_XML_TAG).text,
        FIRST_NAME_XML_TAG: transaction.find(FIRST_NAME_XML_TAG).text,
        SUFFIX_NAME_XML_TAG: transaction.find(SUFFIX_NAME_XML_TAG).text,
        FILING_TYPE_XML_TAG: transaction.find(FILING_TYPE_XML_TAG).text,
        STATE_DST_XML_TAG: transaction.find(STATE_DST_XML_TAG).text,
        YEAR_XML_TAG: transaction.find(YEAR_XML_TAG).text,
        FILING_DATE_XML_TAG: convert_to_date(transaction.find(FILING_DATE_XML_TAG).text),
        DOC_ID_XML_TAG: transaction.find(DOC_ID_XML_TAG).text,
    } for transaction in xml_parser(MEMBER_XML_TAG)]
