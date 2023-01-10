import json
# from multiprocessing import context
from urllib import response
from django.shortcuts import render
# from pyparsing import line_end
import requests
from django.http import HttpResponse
# import pandas as pd
# import csv
import datetime
import pathlib
# import json
# Create your views here.




def show(request):
    response = requests.get('http://127.0.0.1:5000/api/a')
    r = response.json()
    context = {"api" : r,
               }
    # html = '<html><body>%s</body></html>' %r
    return render(request , "test.html" , context)



def source(request):
    # response = requests.get('http://127.0.0.1:8001/api/0')
    # r = response.json()
    # context = {"api" : r,
    #            }
    # # html = '<html><body>%s</body></html>' %r
    return render(request , "source.html" , {})
    

def TableView(request, name):
    response = requests.get(f'http://127.0.0.1:5000/api/{name}')
    r = response.json()
    # html = '<html><body>%s</body></html>' %r
    keys = r[0].keys()
    val = []
    for i, item in enumerate(r):
        val.append([])
        for key in keys:
            val[i].append(item[key])
    # print(val)
    
    #chart
    list_a = []
    list_b = []
    # list_c = []
    for i in r:
        list_a.append(i['v4'])
        list_b.append(i['v5'])
        # list_c.append(i['v7'])
        
    #counting hours of the day   
    start = datetime.time(0,0) # 10:00
    end = datetime.time(23,0) # 10:05
    TIME_FORMAT = "%H:%M" # Format for hours and minutes
    time = [] # List of times 
    while start <= end:
        time.append(start)
        if start.hour == 23:
            break
        start = start.replace(hour=start.hour + 1)
    time = [x.strftime(TIME_FORMAT) for x in time] 
    times = time * 10
    context={
        "api" : r,
        "keys": keys,
        "val": val,
        "v4" : list_a ,
        "v5" : list_b ,
        # "v7" : list_c ,
        "times" : times,
    }
    return render(request, "table.html", context)


def ListView(request):
    list_api = requests.get('http://127.0.0.1:5000/api/')
    list_api = list_api.json()
    lists = []
    
    exts = {'.mean','.csv'}
    for i in list_api:
        fpath = pathlib.Path(i)
        # # j = str(i)
        j = fpath.stem
        # k = fpath.suffix
        # lists.update(
        #     {'name':j , 'suffix' : k}
        # )
        # # i.splitext()
        # # print (i[1])
        # # print (i)
        # print (lists)
        lists.append(j)   #.removesuffix('.mean'),i.removesuffix('.csv') 
      #  lists.append(j.removesuffix('.csv'))
    context={
        "list_api": lists,
    }
    return render(request, "list.html", context)



def CSVTableView(request, name):
    response = requests.get(f'http://127.0.0.1:5000/api/waveforecast/{name}')
    r = response.json()
    # html = '<html><body>%s</body></html>' %r
    keys = r[0].keys()
    csvval = []
    for i, item in enumerate(r):
        csvval.append([])
        for key in keys:
            csvval[i].append(item[key])
    # print(val)
    
    # #chart
    list_a = []
    list_b = []
    list_c = []
    list_d = []
    for i in r:
        list_a.append(i['a2'])
        list_b.append(i['a3'])
        list_c.append(i['a4'])
        list_d.append(i['a5'])
        
    #counting hours of the day   
    start = datetime.time(0,0) # 10:00
    end = datetime.time(23,0) # 10:05
    TIME_FORMAT = "%H:%M" # Format for hours and minutes
    time = [] # List of times 
    while start <= end:
        time.append(start)
        if start.hour == 23:
            break
        start = start.replace(hour=start.hour + 1)
    time = [x.strftime(TIME_FORMAT) for x in time] 
    times = time * 6
    context={
        "api" : r,
        "keys": keys,
        "csvval": csvval,
        "a2" : list_a ,
        "a3" : list_b ,
        "a4" : list_c ,
        "a5" : list_d,
        "times" : times,
    }
    return render(request, "csvtable.html", context)


def index(request):
    return render(request,"index.html",{})



def button(request):
    return render(request,"button.html",{})








