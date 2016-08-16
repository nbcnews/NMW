NBCU.EditRequest.EditProducer = function () {

    function collectData() {
        var PEtbd = "No";
        if ($('#edr-PE-TBD').is(':checked')) {
            PEtbd = "Yes"
        }
        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            PESpot: $('#edr-Spot').val(),
            PERoughCut: $('#edr-RoughCut').val(),
            PEWebPiece: $('#edr-WebPiece').val(),
            PEBrollTeases: $('#edr-BRollTeases').val(),
            PESizzleReel: $('#edr-SizzleReel').val(),
            PEPromos: $('#edr-Promos').val(),
            PEAwards: $('#edr-Awards').val(),
            //PEHours: $('#edr-Spot').val(),
            PEMinutes: $('#edr-PE-Minutes').val(),
            PESeconds: $('#edr-PE-Seconds').val(),
            PETBD: PEtbd,
            PEEstProducerDays: $('#edr-PE-ET-Days').val(),
            PEEstProducerHours: $('#edr-PE-ET-Hours').val(),
            PEEstProducerMinutes: $('#edr-PE-ET-Minutes').val(),
            EditRequestID: NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.saveID),
            EditStatus: "FormSubmit"
        };
        return data;
    }

    this.saveItem = function () {
        var data = collectData();
        //var savedata = NBCU.EditRequest.Helper.addItem(data, 'EditRequest');
        //NBCU.EditRequest.Helper.saveID = savedata.d.Id;
        $('.edrNav li:eq(0)').addClass('active');
        if ($('#edr-summary-CraftEditor').val() == "Yes") {
            $('.edrNav li:eq(1)').addClass('active');
        }
        $('.edrNav li:eq(2)').addClass('active');
        NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.saveID);
        //NBCU.EditRequest.Helper.sendEmail(NBCU.EditRequest.Helper.saveID);
        $('#thanksScreen').show();
    }

    this.prevItem = function () {
        if ($('#edr-summary-CraftEditor').val() == "Yes") {
            NBCU.EditRequest.Master.redirectPage("EditCraft");
            $('.edrNav li:eq(0)').addClass('active');
            $('.edrNav li:eq(1)').addClass('active-inprogress');
        }
        else {
            NBCU.EditRequest.Master.redirectPage("EditSummary");
            $('.edrNav li:eq(0)').addClass('active-inprogress');
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {
        //alert('EditProducer');
        $('#edr-Producer-page span[title="Submit"]').unbind('click');
        $('#edr-Producer-page span[title="Submit"]').bind('click', this.saveItem);
        $('#edr-Producer-page span[title="Back"]').unbind('click');
        $('#edr-Producer-page span[title="Back"]').bind('click', this.prevItem);

        $("#edr-Spot, #edr-RoughCut, #edr-WebPiece, #edr-BRollTeases, #edr-SizzleReel, #edr-Promos, #edr-Awards, #edr-PE-ET-Days, #edr-PE-ET-Hours").keydown(function () {
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $("#edr-PE-Minutes, #edr-PE-Seconds, #edr-PE-ET-Minutes").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $('#edr-PE-TBD').change(function () {
            if ($(this).is(':checked')) {
                $('#edr-PE-Minutes, #edr-PE-Seconds').val("");
            }
        });
        $('#edr-PE-Minutes, #edr-PE-Seconds').change(function () {
            $('#edr-PE-TBD').prop("checked", false);
        });
    }
}

NBCU.EditRequest.EditProducer.prototype.PostBack = false;