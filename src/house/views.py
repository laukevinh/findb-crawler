from django.http import HttpResponse
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from house.house import extract_zip_url_as_list
from house.house import get_page_source
from house.house import get_abs_paths
from house.house import get_years_from_url

from house.models import get_all_data, get_data_by_year
from house.models import insert_data
from house.models import delete_data
from house.models import house_zip_url
from house.models import house_fd
from house.settings import CONNECTION

from sqlalchemy import create_engine
# Create your views here.

@csrf_exempt
def index(request):
    response = HttpResponse(status=400)
    engine = create_engine(CONNECTION, future=True)
    if request.method == 'POST':
        base_url = "https://disclosures-clerk.house.gov/PublicDisclosure/FinancialDisclosure"
        page_source = get_page_source(base_url)
        abs_paths = get_abs_paths(page_source, base_url)
        years = get_years_from_url(abs_paths)
        data = [{'year': year, 'url': url} for year, url in zip(years, abs_paths)]
        count = insert_data(engine, house_zip_url, data)
        response = HttpResponse(status=204)
    elif request.method == 'GET':
        results = get_all_data(engine, house_zip_url)
        response = JsonResponse(
            [
                {
                    "year": row.year,
                    'url': row.url, 
                    'url_crawled_on': row.url_crawled_on
                }
                for row in results
            ],
            safe=False
        )
    elif request.method == 'DELETE':
        count = delete_data(engine, house_zip_url)
        response = HttpResponse(status=204)
    return response

@csrf_exempt
def year(request, year: str):
    response = HttpResponse(status=400)
    engine = create_engine(CONNECTION, future=True)
    if request.method == 'POST':
        rows = get_data_by_year(engine, house_zip_url, year)
        if len(rows) == 0:
            response = HttpResponse(status=404)
        else:
            data = extract_zip_url_as_list(rows[0].url)
            rows = insert_data(engine, house_fd, data)
            response = HttpResponse(status=200)
    elif request.method == 'GET':
        results = get_data_by_year(engine, house_fd, year)
        response = JsonResponse(
            [
                {
                    'prefix': row.prefix,
                    'last': row.last,
                    'first': row.first,
                    'suffix': row.suffix,
                    'filingtype': row.filing_type,
                    'statedst': row.state_district,
                    'year': row.year,
                    'filingdate': row.filing_date,
                    'docid': row.doc_id,
                    'created_on': row.created_on,
                }
                for row in results
            ],
            safe=False
        )
    elif request.method == 'DELETE':
        pass
    return response