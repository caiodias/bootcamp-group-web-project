 function currency(){
        var a = document.getElementById("sd").value;
        var b = 0;

        var url = 'http://data.fixer.io/api/latest?access_key=d2c9f40765a97b7a1f9913cdd12a8260';
        $.getJSON(url,function(data){
        var cad = data.rates.CAD;
        var b = (a*cad).toFixed(2);
        $('#cad').html('CAD value is '+ b);
        
         } );
        }