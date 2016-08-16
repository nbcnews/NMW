NBCU.CrewRequest.Correspondent.Where = function () {
    var FrequentBureauLocationData = [];
    var validCheck = true;

    this.bnsbureauchange = function () {
        var selectedBureauID = parseInt($(this).find('option:selected').attr('id'));
        if (selectedBureauID != "") {
            var result = $.grep(FrequentBureauLocationData, function (e) { return e.ID == selectedBureauID; });
            if (result.length == 1) {
                $('#address-text-cls').val(result[0].AddressLine1.trim());
                $('#address-text-cls2').val((result[0].AddressNotes != null) ? result[0].AddressNotes.trim() : "");
                $('#city-text-cls').val(result[0].CrewCity.trim());
                $('#state-select-cls').val(result[0].CrewState.trim());
                $('#zip-text-cls').val(result[0].Zip.trim());
                $('#country-select-cls').val(result[0].Country.trim());
                $('#CLSwherePage input').attr('disabled', 'disabled');
                $('#address-text-cls2').removeAttr('disabled');
                $('#CLSwherePage select').attr('disabled', true);
                $(this).removeAttr('disabled');
                $('#CLSwherePage .valid-msg-error').removeAttr('style');
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
        $('#address-text-cls').val("");
        $('#address-text-cls2').val("");
        $('#city-text-cls').val("");
        $('#state-select-cls').val("");
        $('#zip-text-cls').val("");
        $('#country-select-cls').val("");
        $('#CLSwherePage input').removeAttr('disabled');
        $('#CLSwherePage select').removeAttr('disabled');
        $('#CLSwherePage.valid-msg-error').removeAttr('style');
    }

    function getValidate() {
        validCheck = true;
        if ($('#address-text-cls').val() == "") {
            $('#address-text-cls').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#address-text-cls').next().hide();
        }
        if ($('#city-text-cls').val() == "") {
            $('#city-text-cls').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#city-text-cls').next().hide();
        }
        if ($('#state-select-cls').val() == "") {
            $('#state-select-cls').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#state-select-cls').next().hide();
        }
        if ($('#zip-text-cls').val() == "") {
            $('#zip-text-cls').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#zip-text-cls').next().hide();
        }
        if ($('#country-select-cls').val() == "") {
            $('#country-select-cls').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#country-select-cls').next().hide();
        }
        return validCheck;
    };

    /** Save/update data **/
    this.clsSaveUser = function () {
        validCheck = getValidate();

        if (validCheck) {
            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                BureauLocation: $('#bureaulocation-cls option:selected').text(),
                CrewAddress: $('#address-text-cls').val(),
                AddressNotes: $('#address-text-cls2').val(),
                CrewCity: $('#city-text-cls').val(),
                CrewState: $('#state-select-cls option:selected').text(),
                Zip: $('#zip-text-cls').val(),
                Country: $('#country-select-cls option:selected').text(),
                CrewStatus: 'Step3'
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.clsSaveID);
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="CLSwhenPage"]').attr('title').trim() : $(this).attr('next').trim());
        }
    };

    this.AppendFrequentBureauLocation = function (FrequentBureauLocationData) {
        $('#bureaulocation-cls').find('option:not(:first)').remove();
        $.each(FrequentBureauLocationData, function (index, data) {
            $('#bureaulocation-cls').append('<option id="' + data.ID + '">' + data.FrequentLocationName.trim() + '</option>');
        });
    };

    this.AppendStates = function (StatesData) {
        $('#state-select-cls').find('option:not(:first)').remove();
        $.each(StatesData, function (index, data) {
            $('#state-select-cls').append('<option id="' + data.ID + '">' + data.Title.trim() + '</option>');
        });
    };

    this.AppendCountires = function (CountiresData) {
        $('#country-select-cls').find('option:not(:first)').remove();
        $.each(CountiresData, function (index, data) {
            $('#country-select-cls').append('<option id="' + data.ID + '">' + data.Title.trim() + '</option>');
        });
    };

    this.redirect = function () {
        if ($(this).attr('title').trim() == "CLSBack") {
            $('.clsNav li').removeClass('active-inprogress').removeClass('active');
            $('.clsNav li:eq(0)').addClass('active');
            $('.clsNav li:eq(1)').addClass('active-inprogress');
            $("#CLSwhatPage").show();
            $("#CLSwhoPage").hide();
            $("#CLSwherePage").hide();
            $("#CLSwhenPage").hide();
        }
        else {
            NBCU.CrewRequest.Master.redirectPage($(this).attr('title').trim());
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {
        if ($('#bureaulocation-cls').val() == "") {
            FrequentBureauLocationData = NBCU.CrewRequest.Helper.ReadList("", "FrequentLocation", "?select=FrequentLocationName,ID,AddressLine1,AddressNotes,Country,CrewCity,CrewState,Zip");
            StatesData = NBCU.CrewRequest.Helper.ReadList("", "States", "?select=Title,ID");
            CountiresData = NBCU.CrewRequest.Helper.ReadList("", "Countires", "?select=Title,ID&$top=200");
            this.AppendFrequentBureauLocation(FrequentBureauLocationData);
            this.AppendStates(StatesData);
            this.AppendCountires(CountiresData);
        }
        $(document).on("change", ".bureau-select-cls", this.bnsbureauchange);
        $('#CLSwherePage span[title="CLSBack"]').unbind('click');
        $('#CLSwherePage span[title="CLSBack"]').bind('click', this.redirect);
        $('#CLSwherePage span[title="CLSNext"]').unbind('click');
        $('#CLSwherePage span[title="CLSNext"]').bind('click', this.clsSaveUser);

        $('#CorrespondentLiveShot span[title="CLSwhatPage"]').bind('click', this.redirect);
        $('#CorrespondentLiveShot span[title="CLSwhatPage"]').css('cursor', 'pointer');
        $('#CorrespondentLiveShot span[title="CLSwhenPage"]').unbind('click');
        $('#CorrespondentLiveShot span[title="CLSwhenPage"]').bind('click', this.clsSaveUser);
        $('#CorrespondentLiveShot span[title="CLSwhenPage"]').css('cursor', 'pointer');
        $('#CorrespondentLiveShot span[title="CLSwhoPage"]').css('cursor', '');
        $('#CorrespondentLiveShot span[title="CLSwhoPage"]').unbind('click');
    }
}

NBCU.CrewRequest.Correspondent.Where.prototype.PostBack = false;