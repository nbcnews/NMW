NBCU.CrewRequest.When = function () {
    var validCheck = true;
    this.audioNeedsData = [];
    this.specialConditionData = [];

    this.AppendAudioNeed = function (audioNeedsData) {
        $('#audioneed').find('option:not(:first)').remove();
        $.each(audioNeedsData, function (index, data) {
            $('#audioneed').append('<option id="' + data.ID + '">' + data.AudioNeed + '</option>');
        });
    };

    this.AppendSpecialCondition = function (specialConditionData) {
        $('#specialcondition').find('option:not(:first)').remove();
        $.each(specialConditionData, function (index, data) {
            $('#specialcondition').append('<option id="' + data.ID + '">' + data.SpecialConditions + '</option>');
        });
    };

    this.AppendTransmissionType = function (transmissionTypeData) {
        $('#transmissiontype').find('option:not(:first)').remove();
        $.each(transmissionTypeData, function (index, data) {
            $('#transmissiontype').append('<option id="' + data.ID + '">' + data.TransmissionType + '</option>');
        });
    };

    function getValidate() {
        validCheck = true;
        if ($('#StartDate').val() == "") {
            $('#StartDate').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#StartDate').next().hide();
        }
        if ($('#EndDate').val() == "") {
            $('#EndDate').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#EndDate').next().hide();
        }
        if ($('#timezone').val() == "") {
            $('#timezone').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#timezone').next().hide();
        }
        if ($('#meettime-hr').val() == "" && $('#meettime-min').val() == "") {
            $('#meettime-hr').next().next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#meettime-hr').next().next().next().hide();
        }
        if (parseFloat($('#meettime-hr').val()) == 0 && parseFloat($('#meettime-min').val()) == 0) {
            $('#meettime-hr').next().next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#meettime-hr').next().next().next().hide();
        }
        if ($('#rolltime-hr').val() == "" && $('#rolltime-min').val() == "") {
            $('#rolltime-hr').next().next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#rolltime-hr').next().next().next().hide();
        }
        if (parseFloat($('#rolltime-hr').val()) == 0 && parseFloat($('#rolltime-min').val()) == 0) {
            $('#rolltime-hr').next().next().next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#rolltime-hr').next().next().next().hide();
        }
        //if ($('#rolltime-hr').val() == "" || $('#rolltime-min').val() == "" || $('#rolltime-hr').val() == "0" || $('#rolltime-hr').val() == "00") {
        //    $('#rolltime-hr').next().next().next().show();
        //    validCheck = false;
        //}
        //else {
        //    validCheck = (validCheck == true) ? true : false;
        //    $('#rolltime-hr').next().next().next().hide();
        //}
        //if ($('#endtime-hr').val() == "" || $('#endtime-min').val() == "") {
        //    $('#endtime-hr').next().next().next().show();
        //    validCheck = false;
        //}
        //else {
        //    validCheck = (validCheck == true) ? true : false;
        //    $('#endtime-hr').next().next().next().hide();
        //}
        if ($('#audioneed').val() == "") {
            $('#audioneed').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#audioneed').next().hide();
        }
        if ($('#specialcondition').val() == "") {
            $('#specialcondition').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#specialcondition').next().hide();
        }
        return validCheck;
    };

    this.saveDataItem = function () {
        validCheck = getValidate();
        if (validCheck) {
            var meetTime = $('#meettime-hr').val() + ":" + $('#meettime-min').val() + " " + $('#meettime-select option:selected').text();
            var rollTime = $('#rolltime-hr').val() + ":" + $('#rolltime-min').val() + " " + $('#rolltime-select option:selected').text();
            var endTime = $('#endtime-hr').val() + ":" + $('#endtime-min').val() + " " + $('#endtime-select option:selected').text();
            var startDate = $('#StartDate').val();
            var endDate = $('#EndDate').val();
            //var startDate = NBCU.CrewRequest.Helper.dateParse($('#StartDate').val());
            //var endDate = NBCU.CrewRequest.Helper.dateParse($('#EndDate').val());
            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                StartDate1: startDate,
                EndDate1: endDate,
                DaysShoot: $('#shootdays').val(),
                DayZone: $('#timezone').val(),
                MeetTime: meetTime,
                RollTime: rollTime,
                EndTime: endTime,
                SpecialGear: $('#specialgear').val(),
                AudioNeed: $('#audioneed option:selected').text(),
                SpecialConditions: $('#specialcondition option:selected').text(),
                TransmissionType: $('#transmissiontype option:selected').text(),
                ShootDescription:$('.descShoot').val(),
                CrewStatus: 'Step4'
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.saveID);

            //NBCU.CrewRequest.Helper.checkRemove('CRT_ShootDescription', NBCU.CrewRequest.Helper.saveID, 'RequestID');

            ///** Save/Update Shoot description data into list**/
            //var shootDesc_data = [];
            //$.each($('.gcrShoot'), function (ind, val) {
            //    shootDesc_data = {
            //        __metadata: { 'type': 'SP.Data.CRT_x005f_ShootDescriptionListItem' },
            //        Title: $(this).find('.shoot-label:eq(0)').text(),
            //        ShootDescription: $(this).find('.descShoot').val(),
            //        MeetTime: $(this).find('.meetShoot').val(),
            //        RequestID: NBCU.CrewRequest.Helper.saveID.toString()
            //    };
            //    NBCU.CrewRequest.Helper.addItem(shootDesc_data, 'CRT_ShootDescription');
            //});

            ///** Save/Update Shoot description data into list**/
            //NBCU.CrewRequest.Helper.checkRemove('CRT_TempShootDesc', NBCU.CrewRequest.Helper.saveID, 'CrewRequestID');
            //var tempShootDesc_data = [];
            //$.each(NBCU.CrewRequest.Helper.shootDesc, function (tempInd, tempVal) {
            //    tempShootDesc_data = {
            //        __metadata: { 'type': 'SP.Data.CRT_x005f_TempShootDescListItem' },
            //        Title: tempVal.date,
            //        MeetTime: tempVal.MeetTime,
            //        Desc: tempVal.Desc,
            //        SelectedDate: tempVal.date,
            //        CrewRequestID: NBCU.CrewRequest.Helper.saveID.toString()
            //    };
            //    NBCU.CrewRequest.Helper.addItem(tempShootDesc_data, 'CRT_TempShootDesc');
            //})

            $('#resourcesPage #numUtilities').val('0');
            $("#resourcesPage #selectreason").val($("#resourcesPage #selectreason option:first").val());
            $('#resourcesPage #resourcedescription').val('');
            $('#resourcesPage .form-container-override').hide();
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="Resources"]').attr('title').trim() : $(this).attr('next').trim());
        }
    }

    this.eventProp = function (event) {
        event.stopPropagation();
    }

    this.redirect = function () {
        NBCU.CrewRequest.Master.redirectPage($(this).text().trim());
    }

    this.Init = function () {
        $('#StartDate').attr('readonly', 'readonly');
        $('#EndDate').attr('readonly', 'readonly');
        $('#shootdays').attr('readonly', 'readonly');
        var transmissionTypeData = [];

        if ($('#audioneed option').length <= 1) {
            audioNeedsData = this.audioNeedsData;
            specialConditionData = this.specialConditionData;
            transmissionTypeData = NBCU.CrewRequest.Helper.ReadList("/sites/NMWF", "TransmissionType", "?select=TransmissionType,TransmissionTypePointValue,ID");
            this.AppendAudioNeed(audioNeedsData);
            this.AppendSpecialCondition(specialConditionData);
            this.AppendTransmissionType(transmissionTypeData);
        }

        //$(document).on("keyup", ".hour-box", this.HourBox);
        //$(document).on("keyup", ".minite-box", this.MinuteBox);
        //$(document).on("change", ".12-box", this.BoxChange);
        $('span[title="Next"]').unbind('click');
        $('span[title="Next"]').bind('click', this.saveDataItem);
        $(document).on("click", ".icon-close", function () {
            $(this).parent().remove();
        });
        $('#audioneed').bind('change', this.eventProp);
        $('#specialcondition').bind('change', this.eventProp);
        $('#transmissiontype').bind('change', this.eventProp);
        $('#specialgear').bind('keyup', this.eventProp);
        $('span[title="Where"]').unbind('click');
        $('span[title="Where"]').bind('click', this.redirect);
        $('span[title="Resources"]').unbind('click');
        $('span[title="Resources"]').bind('click', this.saveDataItem);
        $('span[title="Where"]').css('cursor', 'pointer');
        $('span[title="Resources"]').css('cursor', 'pointer');
        $('span[title="Who"]').css('cursor', '');
        $('span[title="What"]').css('cursor', '');
        $('span[title="Who"]').unbind('click');
        $('span[title="What"]').unbind('click');

        $("#meettime-hr, #rolltime-hr, #endtime-hr").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|1[0-2]|0[0-9])$/ });
        });

        $("#meettime-min, #rolltime-min, #endtime-min").keydown(function () {
            $(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
        });
    }
};
NBCU.CrewRequest.When.prototype.PostBack = false;