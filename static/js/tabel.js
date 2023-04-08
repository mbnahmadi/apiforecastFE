
const customBorder = {
    id: 'customBorder',
    beforeDraw(chart, args, options) {
        const {ctx, chartArea: {left, top, width, height} } = chart;
        ctx.save();
        ctx.strokeStyle = options.borderColor;
        ctx.lineWidth = options.borderWidth;
        //ctx.setLineDash(options.borderDash || []);
        //ctx.lineDashOffset = options.borderDashOffset;
        ctx.strokeRect(left, top, width, height);
        ctx.restore();
    }
};
const customVerticalLine = {
    id: 'customVerticalLine',
    beforDraw(cahrt,args,options) {
        const{ctx, data, chartArea : {top , bottom , left , right , width , height},scales : {x,y} } = chart;
        ctx.save();

        data.labels.forEach((labe,index) => {
            console.log(label)
        ctx.beginPath();
        ctx.fillStyle = 'rgba(10,50,0,0.8)';
        ctx.roundRect(x.getPixelForValue(index),top + height/2 - 50, 30 , 100 , 20);
        ctx.fill();
        })
    } 
};
const arbitraryline = {
    id: 'arbitraryline',
    beforeDraw(chart , args , options) {
        const{ctx , chartArea: {left, top , width , height} , scales:
        {x,y} } = chart;
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.strokeRect(x.getPixelForValue(options.xPosition), top, 0 , height);
        ctx.restore();
    }
    };  {% endcomment %}
    
const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [{%for time in times%} "{{time}}",{% endfor %}],
        datasets: [{
            label: 'Wind Speed',
            //fill : true,
        //	yAxisID : 'v4',
            data: [{% for data in v4 %} {{data}}, {% endfor %}],
            borderColor : 'rgb(0,0,139)',
            //backgroundColor : 'rgb(0,0,139)',
        }],
    },
    options: {
        plugins: {
            customBorder: {
                borderColor: 'black',           //'rgb(105,105,105)',
                borderWidth: 1,
                borderDash: [1, 5],
                borderDashOffset: 10,
                },
            
            //[customBorder] ,
            title: {
                display: true,
                text: 'Wind Speed',
                font: {
                    size: 16
                }
                
            },
            legend: {
                display : false,
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 16
                    }
                }
            }
        },
        //responsive : false,
        lineTension : 0.6,
        //radius : 1,
        pointHoverRadius : 5,
        borderWidth : 2,
        animation : false,
        pointRadius : 2,
        //pointStyle : 'rectRot',
        pointStyle : 'circle ch',
        backgroundColor : 'rgb(	100, 149, 237)',
        pointBorderColor : 'rgb(25, 25, 112)',
        //delay : 100,
        
        scales: {
            x: {
                
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 45,
                    color: 'black',
                    beginAtZero: true ,
                },
                drowBorder: false,
                //type: 'timeseries',
                border: {
                    display: true,
                },
                grid: {
                    borderDash: [3, 3],
                    borderDashOffset: 2,
                    tickMarkLength: 2 ,
                    //color : "red",
                    color: 'rgba(0,0,0,0.1)',
                    display: true,
                },
            },
                y: {
                drowBorder: false,
                ticks: { color: 'black', beginAtZero: true }, //change number of color
                border: {
                    display: true,
                    //backgroundColor:'rgb(0,0,0)'
                    },
                title: {
                    display: true,
                    text: 'time(hour)',
                    font: {
                    size: 14
                }
                },
                grid: {
                    tickMarkLength: 2 ,
                    borderDash: [3, 3],
                    borderDashOffset: 2,
                    color: 'rgba(0,0,0,0.1)',
                    //borderColor: 'black' ,
                //	drawOnChartArea: false,
                    display: true,
                    //color:'rgb(0,0,0)',
                    zeroLineColor: "#fff",
                    
                    
                    },
                }
            }
        },
        
        //plugins : [customBorder],
        plugins : [customVerticalLine],
    });

const ssx = document.getElementById('chart2').getContext('2d');
const chart2 = new Chart(ssx, {
    type: 'line',
    data: {
        labels: [{%for time in times%}"{{time}}",{% endfor %}],
        datasets: [{
            label: 'Direction',
            fill : true,
            fillColor : 'blue',
        //	yAxisID : 'V5',
            data: [{% for data in v5 %} {{data}}, {% endfor %}],
            borderColor : 'rgb(255, 87, 51)',
            backgroundColor : 'rgb(255, 173, 126)',
        }]
    },
    options: {
        //responsive : false,
        lineTension : 0.6,
        radius : 0,
        borderWidth : 2,
        animation : true,
        //delay : 100,				
        scales: {
            x: {
                grid: {
                    display: false,
                }
                }, 
            y: {
                title: {
                    display: true,
                    text: 'time(hour)'
                },
                grid: {
                    display: false
                    },
                }
            
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Direction',
                    font: {
                        size: 18
                    }
                    
                },
                legend: {
                    display : false,
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 14
                        }
                    }
                }
            },
        }
    });
