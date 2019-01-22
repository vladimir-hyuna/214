$(function () {
    var url = "https://members." + getAddress.site + "/ajax/getCorpData?corp_id=" + getAddress.corp_id + "&country_code=" + getAddress.country_code;
    $.getJSON(url, function (data) {
        if (data.addressUS !== null && data.corpName !== null) {
            getAddress.addressContainer.empty().html(function () {
                var corp_name = data.corpName;
                var address = data.addressUS.replace(data.corpName + ',', '').replace(/, /g, '<br />');
                return corp_name + '<br />' + address;
            });
        }
    });
});