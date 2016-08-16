NBCU.EditRequest.TDYWTDY = function () {

    function AppendLocation() {
        if ($('#edr-tdy-summary-location-edit').val() === "") {
            var locationData = NBCU.EditRequest.Helper.ReadList("", "LocationOfEdit", "?select=Title,ID");
            $('#edr-tdy-summary-location-edit').find('option:not(:first)').remove();
            $.each(locationData, function (index, data) {
                $('#edr-tdy-summary-location-edit').append('<option id="' + data.ID + '">' + data.Title + '</option>');
            });
        }
    }

    function collectData() {
        var AMQuickTurnaroundCrash = "No", AMMusic = "No", AMGraphicStills = "No", AMColorCorrect="No",
            AMAudioCorrect = "No", AMEffects = "No", AMOther = "No", AMAllOfTheAbove="No";
        if ($('[name="editortdyCheck"]:eq(0)').is(':checked')) {
            AMQuickTurnaroundCrash = "Yes"
        }
        if ($('[name="editortdyCheck"]:eq(1)').is(':checked')) {
            AMMusic = "Yes"
        }
        if ($('[name="editortdyCheck"]:eq(2)').is(':checked')) {
            AMGraphicStills = "Yes"
        }
        if ($('[name="editortdyCheck"]:eq(3)').is(':checked')) {
            AMColorCorrect = "Yes"
        }
        if ($('[name="editortdyCheck"]:eq(4)').is(':checked')) {
            AMAudioCorrect = "Yes"
        }
        if ($('[name="editortdyCheck"]:eq(5)').is(':checked')) {
            AMEffects = "Yes"
        }
        if ($('[name="editortdyCheck"]:eq(6)').is(':checked')) {
            AMOther = "Yes"
        }
        if ($('[name="editortdyCheck"]:eq(7)').is(':checked')) {
            AMAllOfTheAbove = "Yes"
        }
        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            RequestorName: $('.display-data1-edr-tdy-wtdy-signin').text(),
            Title: $('.display-data1-edr-tdy-wtdy-signin').text(),
            RequestorContact: ($('#edr-tdy-wtdy-contact').next().text().trim() == "") ? $('#edr-tdy-wtdy-contact').val().trim() : $('#edr-tdy-wtdy-contact').next().text().trim(),
            RequestorEmail: ($('#edr-tdy-wtdy-email').next().text().trim() == "") ? $('#edr-tdy-wtdy-email').val().trim() : $('#edr-tdy-wtdy-email').next().text().trim(),
            Business: $('#edr-tdy-wtdy-busiess').val(),
            ShowUnit: $('#edr-tdy-shrtfrm-showunit').val().trim(),
            AirDate: $('#edr-tdy-amform-txtairdate').val().trim(),
            AMColdOpen: $('#edr-tdy-wtdy-cold-open').val().trim(),
            AMRevisionToBRollsVOSOT: $('#edr-tdy-wtdy-BRolls').val().trim(),
            AMShowFixes: $('#edr-tdy-wtdy-ShowFixes').val().trim(),
            AMUpdates: $('#edr-tdy-wtdy-Updates').val().trim(),
            AMTeasesOpenBody: $('#edr-tdy-wtdy-Tease').val().trim(),
            AMCrashPieces: $('#edr-tdy-wtdy-CrashPieces').val().trim(),
            AMPreTapes: $('#edr-tdy-wtdy-Pre-Tapes').val().trim(),
            AMRevisionsToSpotsTracks: $('#edr-tdy-wtdy-Spots').val().trim(),
            AMNewBRollVOSOT: $('#edr-tdy-wtdy-BrollVO').val().trim(),
            AMQuickTurnaroundCrash: AMQuickTurnaroundCrash,
            AMMusic: AMMusic,
            AMGraphicStills: AMGraphicStills,
            AMColorCorrect: AMColorCorrect,
            AMAudioCorrect: AMAudioCorrect,
            AMEffects: AMEffects,
            AMOther: AMOther,
            AROtherText:$('#othertxt').val(),
            AMAllOfTheAbove: AMAllOfTheAbove,
            AMAdditionalComments: $('.textarea-comment-tdy').val(),
            EditStatus: "FormSubmit",
            EditType: "TDY/WTDY AM Form",
            LocationofEdit: $('#edr-tdy-summary-location-edit').val().trim()
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

        if ($('#edr-tdy-summary-location-edit').val() == "") {
            $('#edr-tdy-summary-location-edit').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-tdy-summary-location-edit').next().hide();
        }
        if ($('#edr-tdy-wtdy-contact').val().length <= 10) {
            $('#edr-tdy-wtdy-contact').next().next().hide();
            $('#edr-tdy-wtdy-contact').next().next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-tdy-wtdy-contact').next().next().next().hide();
        }
        if ($('#edr-tdy-wtdy-email').val() != "") {
            if (!validateEmail($('#edr-tdy-wtdy-email').val())) {
                $('#edr-tdy-wtdy-email').next().next().show();
                valid = false;
            }
            else {
                valid = (valid == true) ? true : false;
                $('#edr-tdy-wtdy-email').next().next().hide();
            }
        }
        valid = validTextbox($('#edr-tdy-shrtfrm-showunit'));
        if ($('#edr-tdy-wtdy-page .valid-msg-error').is(":visible")) {
            valid = false;
        }
        return valid;
    }

    this.saveItem = function () {
        if (validation()) {
            var data = collectData();
            if (NBCU.EditRequest.Helper.TdySaveID == 0) {
                var savedata = NBCU.EditRequest.Helper.addItem(data, 'EditRequest');
                NBCU.EditRequest.Helper.TdySaveID = savedata.d.Id;
                data = {
                    __metadata: { 'type': 'SP.Data.EditRequestListItem' },
                    EditRequestID: NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.TdySaveID)
                }
                NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.TdySaveID);
            }
            else {
                NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.TdySaveID);
            }
            $('.tdyNav li:eq(0)').addClass('active');
            $('#thanksScreen').show();
            $('.thanks-edit-request').addClass('thanks-hide');
            $('#thanksScreen .emailText').remove();
            $('.thanks-TDY-WTDY-request').addClass('thanks-show');
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {
        //alert('TDYWTDY');

        AppendLocation();

        $('#edr-tdy-wtdy-page span[title="Submit"]').unbind('click');
        $('#edr-tdy-wtdy-page span[title="Submit"]').bind('click', this.saveItem);

        $("#edr-tdy-wtdy-cold-open, #edr-tdy-wtdy-BRolls, #edr-tdy-wtdy-ShowFixes, #edr-tdy-wtdy-Updates, #edr-tdy-wtdy-Tease, #edr-tdy-wtdy-CrashPieces, #edr-tdy-wtdy-Pre-Tapes, #edr-tdy-wtdy-Spots, #edr-tdy-wtdy-BrollVO").keydown(function () {
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $("input[name='editortdyCheck']").change(function () {
            if ($(this).next().text() == "All of the Above") {
                if ($(this).is(":checked")) {
                    $("input[name='editortdyCheck']").prop('checked', true)
                    $('.otherText').show();
                }
                else {
                    $("input[name='editortdyCheck']").prop('checked', false)
                    $('.otherText').hide();
                    $('#othertxt').val('');
                }
            }
            else {
                $("input[name='editortdyCheck']:eq(7)").prop('checked', false)
            }
        });
        $("input[name='editortdyCheck']:eq(6)").change(function () {
            if ($(this).is(":checked")) {
                $('.otherText').show();
            }
            else {
                $('.otherText').hide();
            }
        });
        var currDate = new Date();
        $('#edr-tdy-amform-txtairdate').val(currDate.getFullYear() + "-" + ('0' + parseFloat(currDate.getMonth() + 1)).slice(-2) + "-" + ('0' + currDate.getDate()).slice(-2));
    }
}

NBCU.EditRequest.TDYWTDY.prototype.PostBack = false;