NBCU.EditRequest.LongProducer = function () {

    function collectData() {
        var lengthTBD = "No", editStatus = "LongProducerEdit";
        if ($('#edr-LNGF-PE-length-tbd').is(':checked')) {
            lengthTBD = "Yes"
        }
        if ($('#edr-LNGF-Producer-page span[title="Next"]').text() == "Submit") {
            editStatus = "FormSubmit";
        }
        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            PESpot: $('#edr-LNGF-Spot').val(),
            PERoughCut: $('#edr-LNGF-RoughCut').val(),
            PEWebPiece: $('#edr-LNGF-WebPiece').val(),
            PEBrollTeases: $('#edr-LNGF-BRollTeases').val(),
            PEAwards: $('#edr-LNGF-Awards').val(),
            PEHours: $('#edr-LNGF-PE-length-Hours').val(),
            PEMinutes: $('#edr-LNGF-PE-length-Minutes').val(),
            PETBD: lengthTBD,
            PEEstProducerDays: $('#edr-LNGF-PE-EP-Days').val(),
            PEEstProducerHours: $('#edr-LNGF-PE-EP-Hours').val(),
            PEEstProducerMinutes: $('#edr-LNGF-PE-EP-Minutes').val(),
            EditStatus: editStatus
        };
        if (data.EditStatus === "FormSubmit") {
            data.EditRequestID = NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.lfSaveID);
        }
        return data;
    }

    this.prevItem = function () {
        if ($('#edr-LGNF-CDR').val() == "Yes") {
            NBCU.EditRequest.Master.redirectPage("LongCraft");
        }
        else {
            NBCU.EditRequest.Master.redirectPage("LongSummary");
        }
    }

    this.saveItem = function () {
        var data = collectData();
        NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.lfSaveID);
        if (data.EditStatus === "FormSubmit") {
            //NBCU.EditRequest.Helper.sendEmail(NBCU.EditRequest.Helper.lfSaveID);
        }
        if ($('#edr-LGNF-APDR').val() == "Yes") {
            NBCU.EditRequest.Master.redirectPage("LongEditor");
        }
        else {
            NBCU.EditRequest.Master.redirectPage("LongSubmit");
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {
        //alert('LongProducer');

        if ($('#edr-LGNF-APDR').val() != "Yes") {
            $('#edr-LNGF-Producer-page span[title="Next"]').text("Submit");
        }
        else {
            $('#edr-LNGF-Producer-page span[title="Next"]').text("Next");
        }

        $('#edr-LNGF-Producer-page span[title="Next"]').unbind('click');
        $('#edr-LNGF-Producer-page span[title="Next"]').bind('click', this.saveItem);

        $('#edr-LNGF-Producer-page span[title="Back"]').unbind('click');
        $('#edr-LNGF-Producer-page span[title="Back"]').bind('click', this.prevItem);

        $('#edr-LNGF-PE-length-tbd').change(function () {
            $('#edr-LNGF-PE-length-Hours, #edr-LNGF-PE-length-Minutes').val('');
        });

        $('#edr-LNGF-PE-length-Hours, #edr-LNGF-PE-length-Minutes').change(function () {
            $('#edr-LNGF-PE-length-tbd').prop('checked', false);
        })

        $("#edr-LNGF-Spot, #edr-LNGF-RoughCut, #edr-LNGF-WebPiece, #edr-LNGF-BRollTeases, #edr-LNGF-Awards, #edr-LNGF-PE-EP-Days, #edr-LNGF-PE-EP-Hours").keydown(function () {
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $("#edr-LNGF-PE-length-Minutes, #edr-LNGF-PE-length-Hours, #edr-LNGF-PE-EP-Minutes").keydown(function () {
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });
    }
}

NBCU.EditRequest.LongProducer.prototype.PostBack = false;