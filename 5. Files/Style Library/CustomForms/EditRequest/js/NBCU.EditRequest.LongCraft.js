NBCU.EditRequest.LongCraft = function () {

    function collectData() {
        var lengthTBD = "No", crashEdit = "No", editStatus = "LongCraftEdit";
        if ($('#edr-LNGF-length-tbd').is(':checked')) {
            lengthTBD = "Yes"
        }
        if ($('#edr-LNGF-CE-Crashedit').is(':checked')) {
            crashEdit = "Yes"
        }
        if ($('#edr-LNGF-Craft-page span[title="Next"]').text() == "Submit") {
            editStatus = "FormSubmit";
        }
        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            PleceMinutes: $('#edr-LNGF-CE-Length-Minutes').val(),
            PleceSeconds: $('#edr-LNGF-CE-Length-Seconds').val(),
            PleceTBD: lengthTBD,
            PleceVersions: $('#edr-LNGF-CE-Acts').val(),
            CraftEditWeeks: $('#edr-LGNF-weeks').val(),
            CraftEditDays: $('#edr-LGNF-days').val(),
            CraftEditHours: $('#edr-LGNF-hours').val(),
            EditStartDate: $('.edr-LNGF-craft-startdate').val(),
            IsCrashEdit: crashEdit,
            NumberOfEditors: $('#edr-LNGF-crafnoofeditor').val(),
            DesktopEditShifts: $('.edr-LNGF-no-Desktop').val(),
            EsitmatedMove: $('.edr-LNGF-estimate-startdate').val(),
            DateOfFirstScreening: $('.edr-LNGF-craft-start-date-screen').val(),
            LFComments: $('#edr-LNGF-craft-comments').val().trim(),
            EditStatus: editStatus
        };
        if (data.EditStatus === "FormSubmit") {
            data.EditRequestID = NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.lfSaveID);
        }
        return data;
    }

    this.saveItem = function () {
        var data = collectData();
        NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.lfSaveID);
        if (data.EditStatus === "FormSubmit") {
            //NBCU.EditRequest.Helper.sendEmail(NBCU.EditRequest.Helper.lfSaveID);
        }
        if ($('#edr-LGNF-PDR').val() == "Yes") {
            NBCU.EditRequest.Master.redirectPage("LongProducer");
        }
        else if ($('#edr-LGNF-APDR').val() == "Yes") {
            NBCU.EditRequest.Master.redirectPage("LongEditor");
        }
        else {
            NBCU.EditRequest.Master.redirectPage("LongSubmit");
        }
    };

    /* ------------- Init ------------------------ */
    this.Init = function () {
        //alert('LongCraft');

        if ($('#edr-LGNF-PDR').val() != "Yes" && $('#edr-LGNF-APDR').val() !== "Yes") {
            $('#edr-LNGF-Craft-page span[title="Next"]').text("Submit");
        }
        else {
            $('#edr-LNGF-Craft-page span[title="Next"]').text("Next");
        }

        $('#edr-LNGF-Craft-page span[title="Next"]').unbind('click');
        $('#edr-LNGF-Craft-page span[title="Next"]').bind('click', this.saveItem);

        $('#edr-LNGF-length-tbd').change(function () {
            $('#edr-LNGF-CE-Length-Minutes, #edr-LNGF-CE-Length-Seconds').val("");
        });

        $('#edr-LNGF-CE-Length-Minutes, #edr-LNGF-CE-Length-Seconds').change(function () {
            $('#edr-LNGF-length-tbd').prop('checked', false);
        });

        $("#edr-LNGF-CE-Acts, #edr-LGNF-weeks, #edr-LGNF-days, #edr-LNGF-crafnoofeditor, .edr-LNGF-no-Desktop").keydown(function () {
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $("#edr-LNGF-CE-Length-Minutes, #edr-LNGF-CE-Length-Seconds, #edr-LGNF-hours").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

    }
}

NBCU.EditRequest.LongCraft.prototype.PostBack = false;