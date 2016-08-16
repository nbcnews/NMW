var FrequentBureauLocationData = [];
NBCU.CrewRequest.Where = function () {
    var validCheck = true;
    this.bureauchange = function () {
        var selectedBureauID = parseInt($(this).find('option:selected').attr('id'));
        if (selectedBureauID != "") {
            var result = $.grep(FrequentBureauLocationData, function (e) { return e.ID == selectedBureauID; });
            if (result.length == 1) {
                $('#address1').val(result[0].AddressLine1.trim());
                $('#addressnotes').val((result[0].AddressNotes != null) ? result[0].AddressNotes.trim() : "");
                $('#city-text').val(result[0].CrewCity.trim());
                $('#state-select').val(result[0].CrewState.trim());
                $('#zip-text').val(result[0].Zip.trim());
                $('#country-select').val(result[0].Country.trim());
                $('#wherePage input').attr('disabled', 'disabled');
                $('#addressnotes').removeAttr('disabled');
                $('#wherePage select').attr('disabled', true);
                $(this).removeAttr('disabled');
                $('#wherePage .valid-msg-error').removeAttr('style');
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
        $('#address1').val("");
        $('#city-text').val("");
        $('#state-select').val("");
        $('#zip-text').val("");
        $('#country-select').val("");
        $('#wherePage input').removeAttr('disabled');
        $('#wherePage select').removeAttr('disabled');
        $('#wherePage .valid-msg-error').removeAttr('style');
    }

    function getValidate() {
        validCheck = true;
        if ($('#address1').val() == "") {
            $('#address1').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#address1').next().hide();
        }
        if ($('#city-text').val() == "") {
            $('#city-text').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#city-text').next().hide();
        }
        if ($('#state-select').val() == "") {
            $('#state-select').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#state-select').next().hide();
        }
        if ($('#zip-text').val() == "") {
            $('#zip-text').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#zip-text').next().hide();
        }
        if ($('#country-select').val() == "") {
            $('#country-select').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#country-select').next().hide();
        }
        return validCheck;
    };

    this.saveUser = function () {
        validCheck = getValidate();

        if (validCheck) {
            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                BureauLocation: $('#bureaulocation option:selected').text(),
                CrewAddress: $('#address1').val(),
                AddressNotes: $('#addressnotes').val(),
                CrewCity: $('#city-text').val(),
                CrewState: $('#state-select option:selected').text(),
                Zip: $('#zip-text').val(),
                Country: $('#country-select option:selected').text(),
                CrewStatus: 'Step3'
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.saveID);
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="When"]').attr('title').trim() : $(this).attr('next').trim());
        }
    };

    this.AppendFrequentBureauLocation = function (FrequentBureauLocationData) {
        $('#bureaulocation').find('option:not(:first)').remove();
        $.each(FrequentBureauLocationData, function (index, data) {
            $('#bureaulocation').append('<option id="' + data.ID + '">' + data.FrequentLocationName.trim() + '</option>');
        });
    };

    this.AppendStates = function (StatesData) {
        $('#state-select').find('option:not(:first)').remove();
        $.each(StatesData, function (index, data) {
            $('#state-select').append('<option id="' + data.ID + '">' + data.Title.trim() + '</option>');
        });
    };

    this.AppendCountires = function (CountiresData) {
        $('#country-select').find('option:not(:first)').remove();
        $.each(CountiresData, function (index, data) {
            $('#country-select').append('<option id="' + data.ID + '">' + data.Title.trim() + '</option>');
        });
    };

    this.redirect = function () {
        NBCU.CrewRequest.Master.redirectPage($(this).text().trim());
    }


    /* ------------- Init ------------------------ */

    this.Init = function () {
        if ($('#bureaulocation').val() == "") {
            FrequentBureauLocationData = NBCU.CrewRequest.Helper.ReadList("", "FrequentLocation", "?select=FrequentLocationName,ID,AddressLine1,AddressNotes,Country,CrewCity,CrewState,Zip");
            StatesData = NBCU.CrewRequest.Helper.ReadList("", "States", "?select=Title,ID");
            CountiresData = NBCU.CrewRequest.Helper.ReadList("", "Countires", "?select=Title,ID&$top=200");
            this.AppendFrequentBureauLocation(FrequentBureauLocationData);
            this.AppendStates(StatesData);
            this.AppendCountires(CountiresData);
        }
        $(document).on("change", ".bureau-select", this.bureauchange);
        $('span[title="Next"]').unbind('click');
        $('span[title="Next"]').bind('click', this.saveUser);
        $('span[title="What"]').unbind('click');
        $('span[title="What"]').bind('click', this.redirect);
        $('span[title="Who"]').css('cursor', 'pointer');
        $('span[title="When"]').unbind('click');
        $('span[title="When"]').bind('click', this.saveUser);
        $('span[title="When"]').css('cursor', 'pointer');
        $('span[title="What"]').css('cursor', 'pointer');
        $('span[title="Who"]').css('cursor', '');
        $('span[title="Resources"]').css('cursor', '');
        $('span[title="Who"]').unbind('click');
        $('span[title="Resources"]').unbind('click');
    }
}

NBCU.CrewRequest.Where.prototype.PostBack = false;