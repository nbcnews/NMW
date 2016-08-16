NBCU.EditRequest.MSNBCShort = function () {
    var locationData;
    function collectData() {
        var airdatetbd = "No", SFPEOpenPackage = "No", SFPEVOSOT = "No", SFPEFixes = "No",
            SFPEWebEdit = "No", SFEEOpenPackage = "No", SFEEVOSOT = "No", SFEEFixes = "No", SFEEWebEdit = "No",
            SFPEOpenPackageText = "", SFPEVOSOTText = "", SFPEFixesText = "", SFPEWebEditText = "",
                SFEEOpenPackageText = "", SFEEVOSOTText = "", SFEEFixes = "", SFEEWebEditText = "";
        if ($('#edr-msnbc-shortform-tbd').is(':checked')) {
            airdatetbd = "Yes";
        }
        if ($('#edr-openpackage').is(':checked')) {
            SFPEOpenPackage = "Yes";
            SFPEOpenPackageText = $('#edr-openpackage-txt').val();
        }
        if ($('#edr-msnbc-vosot').is(':checked')) {
            SFPEVOSOT = "Yes";
            SFPEVOSOTText = $('#edr-msnbc-vosot-txt').val();
        }
        if ($('#edr-msnbc-fixes').is(':checked')) {
            SFPEFixes = "Yes";
            SFPEFixesText = $('#edr-msnbc-fixes-txt').val();
        }
        if ($('#edr-msnbc-webedit').is(':checked')) {
            SFPEWebEdit = "Yes";
            SFPEWebEditText = $('#edr-msnbc-webedit-txt').val();
        }
        if ($('#edr-msnbc-edit-openpackage-editor').is(':checked')) {
            SFEEOpenPackage = "Yes";
            SFEEOpenPackageText = $('#edr-msnbc-edit-openpackage-editor-txt').val();
        }
        if ($('#edr-msnbc-edit-vosot').is(':checked')) {
            SFEEVOSOT = "Yes";
            SFEEVOSOTText = $('#edr-msnbc-edit-vosot-txt').val();
        }
        if ($('#edr-msnbc-edit-fixes').is(':checked')) {
            SFEEFixes = "Yes";
            SFEEFixesText = $('#edr-msnbc-edit-fixes-txt').val();
        }
        if ($('#edr-msnbc-edit-webedit').is(':checked')) {
            SFEEWebEdit = "Yes";
            SFEEWebEditText = $('#edr-msnbc-edit-webedit-txt').val();
        }

        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            RequestorName: $('.display-data1-edr-msnbc-shortform-signin').text(),
            Title: $('.display-data1-edr-msnbc-shortform-signin').text(),
            RequestorContact: ($('#edr-msnbc-shortform-contact').next().text().trim() == "") ? $('#edr-msnbc-shortform-contact').val().trim() : $('#edr-msnbc-shortform-contact').next().text().trim(),
            RequestorEmail: ($('#edr-msnbc-shortform-email').next().text().trim() == "") ? $('#edr-msnbc-shortform-email').val().trim() : $('#edr-msnbc-shortform-email').next().text().trim(),
            Network: $('#edr-msnbc-shortform-network').val(),
            ShowUnit: $('#edr-msnbc-shrtfrm-showunit').val(),
            BudgetCode: $('#edr-msnbc-shortform-budgetcode_0').val(),
            AirDate: $('#edr-msnbc-shortform-txtairdate').val(),
            AirDateTBD: airdatetbd,
            SFPEOpenPackage: SFPEOpenPackage,
            SFPEVOSOT: SFPEVOSOT,
            SFPEFixes: SFPEFixes,
            SFPEWebEdit: SFPEWebEdit,
            SFEEOpenPackage: SFEEOpenPackage,
            SFEEVOSOT: SFEEVOSOT,
            SFEEFixes: SFEEFixes,
            SFEEWebEdit: SFEEWebEdit,
            SFPEOpenPackageHowMany: $('#edr-msnbc-openpackage-txt').val(),
            SFPEVOSOTHowMany: $('#edr-msnbc-vosot-txt').val(),
            SFPEFixesHowMany: $('#edr-msnbc-fixes-txt').val(),
            SFPEWebEditHowMany: $('#edr-msnbc-webedit-txt').val(),
            SFEEOpenPackageHowMany: $('#edr-msnbc-openpackage-editor-txt').val(),
            SFEEVOSOTHowMany: $('#edr-msnbc-vosot-editor-txt').val(),
            SFEEFixesHowMany: $('#edr-msnbc-fixes-editor-txt').val(),
            SFEEWebEditHowMany: $('#edr-msnbc-webedit-editor-txt').val(),
            Room: $('#edr-msnbc-room').val(),
            SFComments: $('#textarea-msnbc').val().trim(),
            EditStatus: "FormSubmit",
            EditType: "MSNBC Short Form",
            LocationofEdit: $('#edr-msnbc-location').val()
        };
        return data;
    }

    function validTextbox(element) {
        var valid = true;
        if (element.val() == "") {
            element.next().show();
            valid = false;
        }
        else {
            element.next().hide();
            valid = true;
        }
        return valid;
    }

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    function validation() {
        var valid = true;
        if ($('#edr-msnbc-shortform-contact').val() == "" && $('#edr-msnbc-shortform-contact').next().text() == "") {
            $('#edr-msnbc-shortform-contact').next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-msnbc-shortform-contact').next().next().hide();
        }
        if ($('#edr-msnbc-shortform-contact').val().length <= 10) {
            $('#edr-msnbc-shortform-contact').next().next().hide();
            $('#edr-msnbc-shortform-contact').next().next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-msnbc-shortform-contact').next().next().next().hide();
        }
        if ($('#edr-msnbc-shortform-email').val() != "") {
            if (!validateEmail($('#edr-msnbc-shortform-email').val())) {
                $('#edr-msnbc-shortform-email').next().next().show();
                valid = false;
            }
            else {
                valid = (valid == true) ? true : false;
                $('#edr-msnbc-shortform-email').next().next().hide();
            }
        }
        valid = validTextbox($('#edr-msnbc-shrtfrm-showunit'));
        //valid = validTextbox($('#edr-msnbc-shortform-budgetcode_0'));
        if ($('#edr-msnbc-shortform-page .valid-msg-error').is(":visible")) {
            valid = false;
        }
        return valid;
    }

    this.saveItem = function () {
        if (validation()) {

            var data = collectData();
            if (NBCU.EditRequest.Helper.MSNBCSaveID == 0) {
                var savedata = NBCU.EditRequest.Helper.addItem(data, 'EditRequest');
                NBCU.EditRequest.Helper.MSNBCSaveID = savedata.d.Id;
                data = {
                    __metadata: { 'type': 'SP.Data.EditRequestListItem' },
                    EditRequestID: NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.MSNBCSaveID)
                }
                NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.MSNBCSaveID);
            }
            else {
                NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.MSNBCSaveID);
            }

            $('.MSNBCNav li:eq(0)').addClass('active');
            $('#thanksScreen').show();
            $('.thanks-edit-request').addClass('thanks-hide');
            $('#thanksScreen .emailText').remove();
            $('.thanks-MSNBC-request').addClass('thanks-show');
        }
    }

    

    function AppendRoom(roomData) {
        $('#edr-msnbc-room').find('option:not(:first)').remove();
        $.each(roomData, function (index, data) {
            $('#edr-msnbc-room').append('<option id="' + data.ID + '">' + data.Title + '</option>');
        });
    };

    function AppendLocation(locationData) {
        $('#edr-msnbc-location').find('option:not(:first)').remove();
        $.each(locationData, function (index, data) {
            $('#edr-msnbc-location').append('<option id="' + data.ID + '">' + data.Title + '</option>');
        });
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {

        if (NBCU.EditRequest.Helper.room.length == 0) {
            NBCU.EditRequest.Helper.room = NBCU.EditRequest.Helper.ReadList("", "Room", "?select=Title,Facilities,ID&$top=500");
            AppendRoom(NBCU.EditRequest.Helper.room);
        }
        locationData = NBCU.EditRequest.Helper.ReadList("/sites/NMWF", "LocationOfEdit", "?select=Title,ID&$filter=Title ne 'Miami'");
        AppendLocation(locationData);
        $('#edr-msnbc-shortform-page span[title="Submit"]').unbind('click');
        $('#edr-msnbc-shortform-page span[title="Submit"]').bind('click', this.saveItem);

        $('#edr-msnbc-shortform-tbd').change(function () {
            $('#edr-msnbc-shortform-txtairdate').val('');
        });

        $(".textbox-mini").keydown(function () {
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $('.show-checkbox-field').prev().prev().change(function () {
            if ($(this).is(':checked')) {
                $(this).next().next().addClass('active');
            }
            else {
                $(this).next().next().removeClass('active');
            }
        });
        var currDate = new Date();
        $('#edr-msnbc-shortform-txtairdate').val(currDate.getFullYear() + "-" + ('0' + parseFloat(currDate.getMonth() + 1)).slice(-2) + "-" + ('0' + currDate.getDate()).slice(-2));

        $('#edr-msnbc-location').change(function () {
            var selectedLocation = $(this).val();
            if (selectedLocation !== "") {
                var filteredRoomData = $.grep(NBCU.EditRequest.Helper.room, function (a) {
                    return a.Facilities1 === selectedLocation;
                });

                AppendRoom(filteredRoomData);
            }
            else {
                AppendRoom(NBCU.EditRequest.Helper.room);
            }
        })
    }
}
NBCU.EditRequest.MSNBCShort.prototype.PostBack = false;