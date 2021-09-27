from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import JsonResponse

from house.house import get_page_source
from house.house import get_abs_paths
from house.house import get_years_from_url
def index(request):
    base_url = "https://disclosures-clerk.house.gov/PublicDisclosure/FinancialDisclosure"
    page_source = get_page_source(base_url)
    abs_paths = get_abs_paths(page_source, base_url)
    years = get_years_from_url(abs_paths)
    return JsonResponse({year: url for year, url in zip(years, abs_paths)})

def year(request, year: str):
    response = f"Year {year}"
    return HttpResponse(response)