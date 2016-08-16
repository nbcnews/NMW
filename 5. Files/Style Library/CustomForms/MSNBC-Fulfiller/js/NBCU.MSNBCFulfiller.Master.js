NBCU.MSNBCFulfiller.Master = function () {
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
        var MSNBCFulfillerData = NBCU.MSNBCFulfiller.Helper.ReadList("", "EditRequest", "?select=ID,Title,RequestorName,RequestorContact,RequestorEmail,Network,ShowUnit,BudgetCode,AirDate,AirDateTBD,SFPEOpenPackage,SFPEVOSOT,SFPEFixes,SFPEWebEdit,SFEEOpenPackage,SFEEVOSOT,SFEEFixes,SFEEWebEdit,SFPEOpenPackageHowMany,SFPEVOSOTHowMany,SFPEFixesHowMany,SFPEWebEditHowMany,SFEEOpenPackageHowMany,SFEEVOSOTHowMany,SFEEFixesHowMany,SFEEWebEditHowMany,EditRequestID,Room,SFComments&$filter= ID eq '" + getUrlVars()["CRID"] + "'");
        $.each(MSNBCFulfillerData, function (ind, val) {
            $('.book-id').text(val.EditRequestID);
            $('#requesterName').text(nullckeck(val.RequestorName));
            $('#erMSNBC_contact_value').text(nullckeck(val.RequestorContact));
            $('#erMSNBCEmail_value').text(nullckeck(val.RequestorEmail));
            $('#edMSNBC_Network').text(nullckeck(val.Network));
            $('#edMSNBC_showunit_value_1').text(nullckeck(val.ShowUnit));
            $('#edMSNBC_budgetcode_value_1').text(nullckeck(val.BudgetCode));
            $('#erMSNBC_txtairdate_value').text(nullckeck(val.AirDate));
            if (val.AirDateTBD == "Yes") {
                $('#erMSNBC-msnbc-shortform-tbd').prop('checked', true);
            }
            if (val.SFPEOpenPackage == "Yes") {
                $('#edr-openpackage').prop('checked', true);
                $('#edr-openpackage').next().next().addClass('active');
                $('#edr-openpackage').next().next().children().find('span').text(nullckeck(val.SFPEOpenPackageHowMany));
            }
            if (val.SFPEVOSOT == "Yes") {
                $('#erLF-msnbc-Producer-vosot').prop('checked', true);
                $('#erLF-msnbc-Producer-vosot').next().next().addClass('active');
                $('#erLF-msnbc-Producer-vosot').next().next().children().find('span').text(nullckeck(val.SFPEVOSOTHowMany));
            }
            if (val.SFPEFixes == "Yes") {
                $('#erLF-msnbc-fixes').prop('checked', true);
                $('#erLF-msnbc-fixes').next().next().addClass('active');
                $('#erLF-msnbc-fixes').next().next().children().find('span').text(nullckeck(val.SFPEFixesHowMany));
            }
            if (val.SFPEWebEdit == "Yes") {
                $('#erLF-msnbc-Producer-webedit').prop('checked', true);
                $('#erLF-msnbc-Producer-webedit').next().next().addClass('active');
                $('#erLF-msnbc-Producer-webedit').next().next().children().find('span').text(nullckeck(val.SFPEWebEditHowMany));
            }
            if (val.SFEEOpenPackage == "Yes") {
                $('#erLF-Editor-openpackage').prop('checked', true);
                $('#erLF-Editor-openpackage').next().next().addClass('active');
                $('#erLF-Editor-openpackage').next().next().children().find('span').text(nullckeck(val.SFEEOpenPackageHowMany));
            }
            if (val.SFEEVOSOT == "Yes") {
                $('#erLF-Editor-vosot').prop('checked', true);
                $('#erLF-Editor-vosot').next().next().addClass('active');
                $('#erLF-Editor-vosot').next().next().children().find('span').text(nullckeck(val.SFEEVOSOTHowMany));
            }
            if (val.SFEEFixes == "Yes") {
                $('#erLF-Editor-fixes').prop('checked', true);
                $('#erLF-Editor-fixes').next().next().addClass('active');
                $('#erLF-Editor-fixes').next().next().children().find('span').text(nullckeck(val.SFEEFixesHowMany));
            }
            if (val.SFEEWebEdit == "Yes") {
                $('#erLF-Editor-webedit').prop('checked', true);
                $('#erLF-Editor-webedit').next().next().addClass('active');
                $('#erLF-Editor-webedit').next().next().children().find('span').text(nullckeck(val.SFEEWebEditHowMany));
            }
            $('.res-location').text(nullckeck(val.LocationofEdit));
            $('.res-room').text(nullckeck(val.Room));
            $('.res-Comments').text(nullckeck(val.SFComments));
        });
    }
    return {
        Init: init,
        redirectPage: this.redirectPage
    }

}();
$(document).ready(NBCU.MSNBCFulfiller.Master.Init);