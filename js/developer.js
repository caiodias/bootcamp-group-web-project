 function loadCurriencies(){
        var from = document.getElementById("from");
        var to = document.getElementById("to");
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange=function(){
        if(xHttp.readyState==4 && xHttp.status==200){
            var obj=JSON.parse(this.responseText);
            var options='';
            for(key in obj.rates){
            options=options+'<option>'+key+'</option>';
        }
        from.innerHTML=options;
        to.innerHTML=options;
    }
}
    xHttp.open('Get','https://exchangeratesapi.io/api/latest',true)
    xHttp.send();
    }
    function convertCurrency(){
        var from = document.getElementById("from").value;
        var to = document.getElementById("to").value;
        var amount = document.getElementById("amount").value;
        var result = document.getElementById("result");
        if(from.length>0 && to.length>0 && amount.length>0){
            var xHttp=new XMLHttpRequest();
            xHttp.onreadystatechange=function(){
                if(xHttp.readyState==4 && xHttp.status==200){
                    var obj=JSON.parse(this.responseText);
                    var fact=obj.rates[to];
                    if(fact!=undefined){
                        result.innerHTML=parseFloat(amount)*parseFloat(fact);
                    }
                }
            }
            xHttp.open('Get','https://exchangeratesapi.io/api/latest?base='+from+'&symbols='+to,true)
            xHttp.send();
        }
    }

    // function currency(){
    //     var a = document.getElementById("sd").value;
    //     var c = document.getElementById("drop").value;
    //     var b = 0;

    //     var url = 'http://data.fixer.io/api/latest?access_key=d2c9f40765a97b7a1f9913cdd12a8260';
    //    if(c.$value == 1){
    //     $.getJSON(url,function(data){
    //     var cad = data.rates.CAD;
    //     var b = (a*cad).toFixed(2);
    //     $('#cad').html('CAD value is '+ b);
        
    //      } );
    //     }
    // }