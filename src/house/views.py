from django.http import HttpResponse
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt

from house.house import get_page_source
from house.house import get_abs_paths
from house.house import get_years_from_url

from house.models import get_all_data
from house.models import insert_data
from house.models import delete_data
from house.models import house_zip_url
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
        response = JsonResponse({
            row.year: {'url': row.url, 'url_crawled_on': row.url_crawled_on}
            for row in results
        })
    elif request.method == 'DELETE':
        count = delete_data(engine, house_zip_url)
        response = HttpResponse(status=204)
    return response

def year(request, year: str):
    response = f"Year {year}"
    return HttpResponse(response)