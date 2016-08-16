NBCU.CrewRequest.BreakingNews.Where = function () {
    var FrequentBureauLocationData = [];
    var validCheck = true;

    this.bnsbureauchange = function () {
        var selectedBureauID = parseInt($(this).find('option:selected').attr('id'));
        if (selectedBureauID != "") {
            var result = $.grep(FrequentBureauLocationData, function (e) { return e.ID == selectedBureauID; });
            if (result.length == 1) {
                $('#address-text-bns').val(result[0].AddressLine1.trim());
                $('#address-text-bns2').val((result[0].AddressNotes != null) ? result[0].AddressNotes.trim() : "");
                $('#city-text-bns').val(result[0].CrewCity.trim());
                $('#state-select-bns').val(result[0].CrewState.trim());
                $('#zip-text-bns').val(result[0].Zip.trim());
                $('#country-select-bns').val(result[0].Country.trim());
                $('#bns-wherePage input').attr('disabled', 'disabled');
                $('#address-text-bns2').removeAttr('disabled');
                $('#bns-wherePage select').attr('disabled', true);
                $(this).removeAttr('disabled');
                $('#bns-wherePage .valid-msg-error').removeAttr('style');
            }
            else {
                makeFieldEmpty();
            }
        }
        else {
            makeFieldEmpty();
        }
    }

    function makeFieldEmpty() {
        $('#address-text-bns').val("");
        $('#city-text-bns').val("");
        $('#state-select-bns').val("");
        $('#zip-text-bns').val("");
        $('#country-select-bns').val("");
        $('#bns-wherePage input').removeAttr('disabled');
        $('#bns-wherePage select').removeAttr('disabled');
        $('#bns-wherePage .valid-msg-error').removeAttr('style');
    }

    function getValidate() {
        validCheck = true;
        if ($('#address-text-bns').val() == "") {
            $('#address-text-bns').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#address-text-bns').next().hide();
        }
        if ($('#city-text-bns').val() == "") {
            $('#city-text-bns').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#city-text-bns').next().hide();
        }
        if ($('#state-select-bns').val() == "") {
            $('#state-select-bns').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#state-select-bns').next().hide();
        }
        if ($('#zip-text-bns').val() == "") {
            $('#zip-text-bns').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#zip-text-bns').next().hide();
        }
        if ($('#country-select-bns').val() == "") {
            $('#country-select-bns').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#country-select-bns').next().hide();
        }
        return validCheck;
    };

    /** Save/update data **/
    this.bnsSaveUser = function () {
        validCheck = getValidate();

        if (validCheck) {
            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                BureauLocation: $('#bureaulocation-bns option:selected').text(),
                CrewAddress: $('#address-text-bns').val(),
                AddressNotes: $('#address-text-bns2').val(),
                CrewCity: $('#city-text-bns').val(),
                CrewState: $('#state-select-bns option:selected').text(),
                Zip: $('#zip-text-bns').val(),
                Country: $('#country-select-bns option:selected').text(),
                CrewStatus: 'Step3'
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.bnSaveID);
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="bns-whenPage"]').attr('title').trim() : $(this).attr('next').trim());
        }
    };

    this.AppendFrequentBureauLocation = function (FrequentBureauLocationData) {
        $('#bureaulocation-bns').find('option:not(:first)').remove();
        $.each(FrequentBureauLocationData, function (index, data) {
            $('#bureaulocation-bns').append('<option id="' + data.ID + '">' + data.FrequentLocationName.trim() + '</option>');
        });
    };

    this.AppendStates = function (StatesData) {
        $('#state-select-bns').find('option:not(:first)').remove();
        $.each(StatesData, function (index, data) {
            $('#state-select-bns').append('<option id="' + data.ID + '">' + data.Title.trim() + '</option>');
        });
    };

    this.AppendCountires = function (CountiresData) {
        $('#country-select-bns').find('option:not(:first)').remove();
        $.each(CountiresData, function (index, data) {
            $('#country-select-bns').append('<option id="' + data.ID + '">' + data.Title.trim() + '</option>');
        });
    };

    this.redirect = function () {
        if ($(this).attr('title').trim() == "bnBack") {
            $('.bnsNav li').removeClass('active-inprogress').removeClass('active');
            $('.bnsNav li:eq(0)').addClass('active');
            $('.bnsNav li:eq(1)').addClass('active-inprogress');
            $('#bns-whatPage').show();
            $('#bns-whoPage').hide();
            $('#bns-wherePage').hide();
            $('#bns-whenPage').hide();
        }
        else {
            NBCU.CrewRequest.Master.redirectPage($(this).attr('title').trim());
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {        
        if ($('#bureaulocation-bns').val() == "") {
            FrequentBureauLocationData = NBCU.CrewRequest.Helper.ReadList("", "FrequentLocation", "?select=FrequentLocationName,ID,AddressLine1,AddressNotes,Country,CrewCity,CrewState,Zip");
            StatesData = NBCU.CrewRequest.Helper.ReadList("", "States", "?select=Title,ID");
            CountiresData = NBCU.CrewRequest.Helper.ReadList("", "Countires", "?select=Title,ID&$top=200");
            this.AppendFrequentBureauLocation(FrequentBureauLocationData);
            this.AppendStates(StatesData);
            this.AppendCountires(CountiresData);
        }
        $(document).on("change", ".bureau-select-bns", this.bnsbureauchange);
        $('#bns-wherePage span[title="bnBack"]').unbind('click');
        $('#bns-wherePage span[title="bnBack"]').bind('click', this.redirect);
        $('#bns-wherePage span[title="bnNext"]').unbind('click');
        $('#bns-wherePage span[title="bnNext"]').bind('click', this.bnsSaveUser);
        
        $('#BreakingNews span[title="bns-whatPage"]').bind('click', this.redirect);
        $('#BreakingNews span[title="bns-whatPage"]').css('cursor', 'pointer');
        $('#BreakingNews span[title="bns-whenPage"]').unbind('click');
        $('#BreakingNews span[title="bns-whenPage"]').bind('click', this.bnsSaveUser);
        $('#BreakingNews span[title="bns-whenPage"]').css('cursor', 'pointer');
        $('#BreakingNews span[title="bns-whoPage"]').css('cursor', '');
        $('#BreakingNews span[title="bns-whoPage"]').unbind('click');
    }
}

NBCU.CrewRequest.BreakingNews.Where.prototype.PostBack = false;