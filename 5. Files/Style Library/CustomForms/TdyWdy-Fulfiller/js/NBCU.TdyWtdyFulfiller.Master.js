NBCU.TdyWtdyFulfiller.Master = function () {
    /** Get the URL params **/
    function getUrlVars() {
        var vars = [], hash;
        try {
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;

        } catch (e) {
            console.log(e.message);
        }
    }

    function nullckeck(value) {
        var returnVal = "-";
        if (!!value) {
            returnVal = value;
        }
        return returnVal;
    }

    /* ------------- Init ------------------------ */
    this.init = function () {
        $('#btn-print').click(function () {
            window.print();
        });
        var TdyWtdyFulfillerData = NBCU.TdyWtdyFulfiller.Helper.ReadList("", "EditRequest", "?select=ID,Title,RequestorName,RequestorContact,RequestorEmail,Network,ShowUnit,BudgetCode,AirDate,AMColdOpen,AMRevisionToBRollsVOSOT,AMShowFixes,AMUpdates,AMTeasesOpenBody,AMCrashPieces,AMPreTapes,AMRevisionsToSpotsTracks,AMNewBRollVOSOT,AMQuickTurnaroundCrash,AMMusic,AMGraphicStills,AMColorCorrect,AMAudioCorrect,AMEffects,AMOther,AMAllOfTheAbove,AMAdditionalComments,EditRequestID&$filter= ID eq '" + getUrlVars()["CRID"] + "'");
        $.each(TdyWtdyFulfillerData, function (ind, val) {
            $('.book-id').text(val.EditRequestID);
            $('#requesterName').text(nullckeck(val.RequestorName));
            $('#ertdywdy_contact_value').text(nullckeck(val.RequestorContact));
            $('#ertdywdyEmail_value').text(nullckeck(val.RequestorEmail));
            $('#edtdywdy_showunit_value_1').text(nullckeck(val.ShowUnit));
            $('#ertdywdy_txtairdate_value').text(nullckeck(val.AirDate));
            //AMColdOpen, AMRevisionToBRollsVOSOT, AMShowFixes, 
            //AMUpdates, AMTeasesOpenBody,AMCrashPieces,
            //AMPreTapes, AMRevisionsToSpotsTracks, AMNewBRollVOSOT,
            //AMQuickTurnaroundCrash, AMMusic, AMGraphicStills, AMColorCorrect, AMAudioCorrect, AMEffects, AMOther, AMAllOfTheAbove,
            //AMAdditionalComments
            $('#edr-tdy-wtdy-cold-open').text(nullckeck(val.AMColdOpen));
            $('#edr-tdy-wtdy-Updates').text(nullckeck(val.AMUpdates));
            $('#edr-tdy-wtdy-Pre-Tapes').text(nullckeck(val.AMPreTapes));
            $('#edr-tdy-wtdy-BRolls').text(nullckeck(val.AMRevisionToBRollsVOSOT));
            $('#edr-tdy-wtdy-Tease').text(nullckeck(val.AMTeasesOpenBody));
            $('#edr-tdy-wtdy-Spots').text(nullckeck(val.AMRevisionsToSpotsTracks));
            $('#edr-tdy-wtdy-ShowFixes').text(nullckeck(val.AMShowFixes));
            $('#edr-tdy-wtdy-CrashPieces').text(nullckeck(val.AMCrashPieces));
            $('#edr-tdy-wtdy-BrollVO').text(nullckeck(val.AMNewBRollVOSOT));
            $('#ertdywdy_txtlocation_value').text(nullckeck(val.LocationofEdit))

            if (val.AMQuickTurnaroundCrash == "Yes") {
                $('[name="editortdyCheck"]:eq(0)').prop('checked', true);
            }
            if (val.AMMusic == "Yes") {
                $('[name="editortdyCheck"]:eq(1)').prop('checked', true);
            }
            if (val.AMGraphicStills == "Yes") {
                $('[name="editortdyCheck"]:eq(2)').prop('checked', true);
            }
            if (val.AMColorCorrect == "Yes") {
                $('[name="editortdyCheck"]:eq(3)').prop('checked', true);
            }
            if (val.AMAudioCorrect == "Yes") {
                $('[name="editortdyCheck"]:eq(4)').prop('checked', true);
            }
            if (val.AMEffects == "Yes") {
                $('[name="editortdyCheck"]:eq(5)').prop('checked', true);
            }
            if (val.AMOther == "Yes") {
                $('[name="editortdyCheck"]:eq(6)').prop('checked', true);
                $('.otherText').show();
                $('#othertxt').val(nullckeck(val.AROtherText))
            }
            if (val.AMAllOfTheAbove == "Yes") {
                $('[name="editortdyCheck"]:eq(7)').prop('checked', true);
            }
            $('.textarea-comment-tdy').text(nullckeck(val.AMAdditionalComments));
        });
    }
    return {
        Init: init,
        redirectPage: this.redirectPage
    }

}();
$(document).ready(NBCU.TdyWtdyFulfiller.Master.Init);