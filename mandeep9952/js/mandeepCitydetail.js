jQuery(function () {
    jQuery("#city_name").autocomplete({
        source: function (request, response) {
            jQuery.getJSON(
                "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
                function (data) {
                    response(data);
                }
            );
        },
        minLength: 3,
        select: function (event, ui) {
            var selectedObj = ui.item;
            jQuery("#city_name").val(selectedObj.value);
            getcitydetails(selectedObj.value);
            return false;
        },
        open: function () {
            jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
    jQuery("#city_name").autocomplete("option", "delay", 100);
});

function getcitydetails(fqcn) {
 
    if (typeof fqcn == "undefined") 
    
    fqcn = jQuery("#city_name").val();
 
    cityfqcn = fqcn;

    if (cityfqcn) {
 
	    jQuery.getJSON(
	                "http://gd.geobytes.com/GetCityDetails?callback=?&fqcn="+cityfqcn,
                     function (data) {
	            jQuery("#country_code").val(data.geobytesinternet);
	            jQuery("#country").val(data.geobytescountry);
	            jQuery("#region_code").val(data.geobytesregionlocationcode);
	            jQuery("#region").val(data.geobytesregion);
	            jQuery("#city_code").val(data.geobyteslocationcode);
	            jQuery("#city").val(data.geobytescity);
	            jQuery("#city_id").val(data.geobytescityid);
	            jQuery("#fully_qualified_name").val(data.geobytesfqcn);
	            jQuery("#latitude").val(data.geobyteslatitude);
	            jQuery("#longitude").val(data.geobyteslongitude);
	            jQuery("#capital_city").val(data.geobytescapital);
	            jQuery("#time_zone").val(data.geobytestimezone);
	            jQuery("#nationality_singular").val(data.geobytesnationalitysingular);
	            jQuery("#population").val(data.geobytespopulation);
	            jQuery("#nationality_plural").val(data.geobytesnationalityplural);
	            jQuery("#cia_map_reference").val(data.geobytesmapreference);
	            jQuery("#currency").val(data.geobytescurrency);
	            jQuery("#currency_code").val(data.geobytescurrencycode);
	            }
	    );
	}
}