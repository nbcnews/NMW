NBCU.CrewRequest.Resources = function () {
    var Totalval = 0;
    this.talentData = [];
    this.productionTypeData = [];
    this.talentTypeData = [];
    this.audioNeedsData = [];
    this.specialConditionData = [];

    this.SaveCrewRequest = function (event) {
        var validCheck = true
        if (parseFloat($('.total-amount:eq(1)').text()) > parseFloat($('.total-amount:eq(0)').text())) {
            validCheck = !!$('#resourcedescription').val();
            if (!validCheck) {
                $("#resourcedescription").next().show()
            }
            else {
                $("#resourcedescription").next().hide()
            }
        }
        if (validCheck) {
            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                Camera: $('#numCamera').val(),
                Audio: $('#numAudio').val(),
                Utilities: $('#numUtilities').val(),
                LabourCost: $('.estimate-cost-labor').text(),
                GearCost: $('.estimate-cost-gear').text(),
                TravelExpenses: $('.estimate-cost-travelexpenses').text(),
                EstimatedCost: $('.estimate-cost-total').text(),
                ResourceReason: $('#selectreason').val(),
                ResourceDescription: $('#resourcedescription').val(),
                SuggestedResources: $('.total-amount:eq(0)').text(),
                SelectedResources: $('.total-amount:eq(1)').text(),
                CrewStatus: 'Step5',
                RequestStatus: 'New',
                CrewRequestID: NBCU.CrewRequest.Helper.getCrewRequestID(NBCU.CrewRequest.Helper.saveID)

            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.saveID);

            /** Update revision notes into list **/
            var currentdateobj = new Date();
            var currdate = NBCU.CrewRequest.Helper.dateParse(currentdateobj);
            var currdtime = currentdateobj.getHours() + ":"
                        + currentdateobj.getMinutes() + ":"
                        + currentdateobj.getSeconds();
            var revisionNote_data = [];
            revisionNote_data = {
                __metadata: { 'type': 'SP.Data.CRT_x005f_RevisionNotesListItem' },
                Title: "General Crew Request",
                RevisedBy: $('.ms-core-menu-root:eq(0)').contents().first().text(),
                RevisedComments: "New Crew Request is submitted",
                RevicedDate: currdate + "  " + currdtime,
                RevisedNumber: "New",
                CrewRequestID: NBCU.CrewRequest.Helper.saveID.toString()
            };
            NBCU.CrewRequest.Helper.addItem(revisionNote_data, 'CRT_RevisionNotes');
            $('.navigation li').removeClass('active-inprogress').removeClass('active');
            $('.navigation li:eq(0)').addClass('active');
            $('.navigation li:eq(1)').addClass('active');
            $('.navigation li:eq(2)').addClass('active');
            $('.navigation li:eq(3)').addClass('active');
            $('.navigation li:eq(4)').addClass('active');
            $('#thanksScreen').show();
            $('#thanksScreen').addClass('popupscreen-thanks');
            $('.active-inprogress').removeClass().addClass('active');
            $('body').addClass('overflow');
            //NBCU.CrewRequest.Helper.sendEmail(NBCU.CrewRequest.Helper.saveID);
        }
        event.stopPropagation();
    };

    this.ClosePopup = function () {
        if ($(window).width() >= 1200) {
            $('#thanksScreen').hide();
            $('#thanksScreen').addClass('popupscreen-thanks');
            $('body').removeClass('overflow');
            SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
        }
        else {
            window.location.href = "/Pages/home.aspx";
        }

    }

    this.ResourceChange = function () {
        var totcount = parseFloat($('#numCamera').val()) + parseFloat($('#numAudio').val()) + parseFloat($('#numUtilities').val());
        if (totcount > Totalval) {
            $('.form-container-override').show();
        }
        else {
            $('.form-container-override').hide();
        }

        $('.total-amount:eq(1)').text(totcount);
        CrewCal();
    };

    this.RemoveDescription = function () {
        $(this).parent().remove();
    };

    /** Crew request calculation **/
    function CrewCal() {
        var labour = parseFloat($('.total-amount:eq(1)').text()) * 1000;
        var gear = parseFloat($('#numCamera').val()) * 1200;
        var total = labour + gear;
        var totalrange = (total * 0.10) + total
        $('.estimate-cost-labor').html('<span class="icon-dollar">$</span>' + labour)
        $('.estimate-cost-gear:eq(0)').html('<span class="icon-dollar">$</span>' + gear)
        $('.estimate-cost-total').html('<span class="icon-dollar">$</span>' + total + ' - <span class="icon-dollar">$</span>' + totalrange);
    };

    this.redirect = function () {
        NBCU.CrewRequest.Master.redirectPage($(this).text().trim());
    }

    this.Init = function () {
        savecheck = false
        talentData = this.talentData;
        productionTypeData = this.productionTypeData;
        talentTypeData = this.talentTypeData;
        audioNeedsData = this.audioNeedsData;
        specialConditionData = this.specialConditionData;

        var pT = $("#productiontype option:selected").text();//audioneed
        var aN = $("#audioneed option:selected").text();//specialcondition
        var sC = $("#specialcondition option:selected").text();//specialcondition

        var filProductionTypeData = $.grep(productionTypeData, function (a) {
            return a.Title == pT
        });

        var filaudioNeedsData = $.grep(audioNeedsData, function (a) {
            return a.Title == aN
        });

        var filspecialConditionData = $.grep(specialConditionData, function (a) {
            return a.Title == sC
        });

        var talentQuery = [];
        $.each($('.talent-sel'), function (ind, val) {
            if ($(val).val() != "None on Site" && $(val).val() != "*TBD*" && $(val).val() != "---") {
                var talVal = $.grep(talentData, function (a) { return a.Title == $(val).val() });
                if (talVal.length != 0) {
                    talentQuery.push(talVal);
                }
            }
        });

        var finaltalentData = [];
        $.each(talentQuery, function (ind, val) {
            if (!!val[0].TalentTypeID) {
                finaltalentData.push($.grep(talentTypeData, function (a) { return a.TalentType == val[0].TalentTypeID }));
            }
        });

        var max_arr = [];
        var sp_val = 0;
        if (filProductionTypeData.length != 0) {
            if (filProductionTypeData[0].ProductionTypePointValue != "N/A") {
                max_arr.push(parseInt(filProductionTypeData[0].ProductionTypePointValue))
            }
        }
        if (filaudioNeedsData.length != 0) {
            if (filaudioNeedsData[0].AudioNeedPointValue != "N/A") {
                max_arr.push(parseInt(filaudioNeedsData[0].AudioNeedPointValue))
            }
        }
        if (filspecialConditionData.length != 0) {
            if (filspecialConditionData[0].SpecialConditionPointValue != "N/A") {
                sp_val = parseInt(filspecialConditionData[0].SpecialConditionPointValue);
            }
        }
        if (finaltalentData.length != 0) {
            $.each(finaltalentData, function (ind, val) {
                max_arr.push(parseInt(val[0].TalentTypePointValue))
            });
        }
        if (max_arr.length > 0) {
            Totalval = Math.max.apply(Math, max_arr) + sp_val;
            $('.total-amount').text(Totalval);
            var subtotal = 0;
            if (Totalval % 2 == 0) {
                subtotal = Totalval / 2;
                $('#numCamera').val(subtotal);
                $('#numAudio').val(subtotal);
            }
            else {
                subtotal = (Totalval - 1) / 2;
                $('#numCamera').val(subtotal + 1);
                $('#numAudio').val(subtotal);
            }
            CrewCal();
        }
        //$(document).on("click", "#submit-button", this.SaveCrewRequest);
        $('#submit-button').unbind();
        $('#submit-button').bind('click', this.SaveCrewRequest);

        $(document).on("click", ".button-close", this.ClosePopup);
        $(document).on("change", ".myNumber", this.ResourceChange);
        $(document).on("click", ".icon-close", this.RemoveDescription);
        $('span[title="When"]').unbind('click');
        $('span[title="When"]').bind('click', this.redirect);
        $('span[title="Who"]').unbind('click');
        $('span[title="What"]').unbind('click');
        $('span[title="Where"]').unbind('click');
        $('span[title="Who"]').css('cursor', '');
        $('span[title="What"]').css('cursor', '');
        $('span[title="Where"]').css('cursor', '');

    };
};
NBCU.CrewRequest.Resources.prototype.PostBack = false;