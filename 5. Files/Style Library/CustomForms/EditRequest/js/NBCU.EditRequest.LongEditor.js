NBCU.EditRequest.LongEditor = function () {

    function collectData() {
        var Ingest = "No", RadioCut = "No", additionalelement = "No", lengthTBD = "No", additionalText = "", other = "No", assignmentType = "", ingestHours = "", ingestMinutes = "";
        if ($('#checkbox-Ingest').is(':checked')) {
            Ingest = "Yes";
        }
        if ($('.edr-LNGF-AssEditor-RadioCut').is(':checked')) {
            RadioCut = "Yes";
        }
        if ($('.edr-LNGF-AssEditor-additionalelement').is(':checked')) {
            additionalelement = "Yes";
            additionalText = $('#txtarea-additional-elemments').val();
        }
        if ($('.edr-LNGF-AssEditor-other').is(':checked')) {
            other = "Yes";
        }
        if ($('.LNGF-AssEditor-editor-show').is(':visible')) {
            assignmentType = $('#LNGF-FileTape').val();
            ingestHours = $('#LNGF-IngestHours').val();
            ingestMinutes = $('#LNGF-IngestMinutes').val();
        }
        if ($('#edr-LNGF-ae-length-tbd').is(':checked')) {
            lengthTBD = "Yes";
        }
        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            AEIngest: Ingest,
            AERadioCut: RadioCut,
            AEAdditionalElements: additionalelement,
            AEOther: other,
            AROtherText :$('#txtarea-other-elemments').val(),
            AEAssignmentType: assignmentType,
            AEAssignmentHours: ingestHours,
            AEAssignmentMinutes: ingestMinutes,
            AEAdditionalComments: additionalText,
            AEHours: $('#edr-LNGF-AEE-Length-Hours').val(),
            AEMinutes: $('#edr-LNGF-AEE-Length-Minutes').val(),
            AETBD: lengthTBD,
            AEEditorDays: $('#edr-LNGF-AEE-AssEditor-Days').val(),
            AEEditorHours: $('#edr-LNGF-AEE-AssEditor-Hours').val(),
            AEDateNeeded: $('.edr-LNGF-ass-dateneeded').val(),
            EditRequestID: NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.lfSaveID),
            EditStatus: "FormSubmit"
        };
        return data;
    }

    function validation() {
        var valid = true;
        if ($('.edr-LNGF-AssEditor-additionalelement').is(':checked')) {
            if ($('#txtarea-additional-elemments').val().trim() == "") {
                valid = false;
                $('#txtarea-additional-elemments').next().show();
            }
            else {
                valid = true;
                $('#txtarea-additional-elemments').next().hide();
            }
        }
        if ($('.edr-LNGF-AssEditor-other').is(':checked')) {
            if ($('#txtarea-other-elemments').val().trim() == "") {
                valid = false;
                $('#txtarea-other-elemments').next().show();
            }
            else {
                valid = true;
                $('#txtarea-other-elemments').next().hide();
            }
        }
        return valid;
    }

    this.prevItem = function () {
        if ($('#edr-LGNF-PDR').val() == "Yes") {
            NBCU.EditRequest.Master.redirectPage("LongProducer");
        }
        else if ($('#edr-LGNF-CDR').val() == "Yes") {
            NBCU.EditRequest.Master.redirectPage("LongCraft");
        }
        else {
            NBCU.EditRequest.Master.redirectPage("LongSummary");
        }
    }

    this.saveItem = function () {
        if (validation()) {
            var data = collectData();
            NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.lfSaveID);
            NBCU.EditRequest.Master.redirectPage("LongSubmit");

            //NBCU.EditRequest.Helper.sendEmail(NBCU.EditRequest.Helper.lfSaveID);
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {
        //alert('LongEditor');       

        $('#edr-LNGF-Assistance-Editor-page span[title="Submit"]').unbind('click');
        $('#edr-LNGF-Assistance-Editor-page span[title="Submit"]').bind('click', this.saveItem);

        $('#edr-LNGF-Assistance-Editor-page span[title="Back"]').unbind('click');
        $('#edr-LNGF-Assistance-Editor-page span[title="Back"]').bind('click', this.prevItem);

        $('#checkbox-Ingest').change(function () {
            if ($(this).is(':checked')) {
                $('.LNGF-AssEditor-editor-show').show();
            }
            else {
                $('.LNGF-AssEditor-editor-show').hide();
            }
        });

        $('#LNGF-FileTape').change(function () {
            if ($(this).val() == "File") {
                $('.newFileIngest').show();
            }
            else {
                $('.newFileIngest').hide();
            }
        })

        $('#edr-LNGF-ae-length-tbd').change(function () {
            $('#edr-LNGF-AEE-Length-Hours, #edr-LNGF-AEE-Length-Minutes').val('');
        });

        $('.edr-LNGF-AssEditor-additionalelement').change(function () {
            if ($(this).is(':checked')) {
                $(this).parent().next().next().addClass('active');
            }
            else {
                $(this).parent().next().next().removeClass('active');
            }
        });

        $('.edr-LNGF-AssEditor-other').change(function () {
            if ($(this).is(':checked')) {
                $(this).parent().next().next().addClass('active');
            }
            else {
                $(this).parent().next().next().removeClass('active');
            }
        })

        $('#edr-LNGF-AEE-Length-Hours, #edr-LNGF-AEE-Length-Minutes').change(function () {
            $('#edr-LNGF-ae-length-tbd').prop('checked', false);
        });

        $("#edr-LNGF-AEE-Length-Hours, #LNGF-IngestHours, #edr-LNGF-AEE-AssEditor-Days, #edr-LNGF-AEE-AssEditor-Hours").keydown(function () {
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $("#edr-LNGF-AEE-Length-Minutes, #LNGF-IngestMinutes").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

    }
}

NBCU.EditRequest.LongEditor.prototype.PostBack = false;