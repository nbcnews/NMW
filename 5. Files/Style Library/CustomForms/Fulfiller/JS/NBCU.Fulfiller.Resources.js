NBCU.Fulfiller.Resources = function () {
    var Totalval = 0;
    this.talentData = [];
    this.productionTypeData = [];
    this.talentTypeData = [];
    this.audioNeedsData = [];
    this.specialConditionData = [];
    var crewRequestData;

    this.SaveCrewRequest = function () {
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
            CrewStatus: 'Step5'
        };
        NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.saveID);

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
    };

    this.ClosePopup = function () {
        $('#thanksScreen').hide();
        $('#thanksScreen').addClass('popupscreen-thanks');
        $('body').removeClass('overflow');
        SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
    }


    this.RemoveDescription = function () {
        $(this).parent().remove();
    };


    this.redirect = function () {
        NBCU.CrewRequest.Master.redirectPage($(this).text().trim());
    }

    this.EditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('select').show();
        }
        else {
            $(this).text("edit");
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
                $('#ff_Audio').text($('#ff_camera-select').val());
                $('#ff_Audio').text($('#ff_audio-select').val());
                $('#ff_Utilities').text($('#ff_utilities-select').val());
                $('#ff_ResourceReason').text($('#ff_reason-select').val());

            });
        }
        $('#ff_EstimatedCost').show();
        event.stopPropagation();
    }

    this.Init = function () {
        $(".button-edit").off("click");
        $("#whoPage .button-edit").off("click");
        $("#whatPage .button-edit").off("click");
        $("#wherePage .button-edit").off("click");
        $("#whenPage .button-edit").off("click");
        $("#resourcesPage .button-edit-rs").off("click");
        $('#resourcesPage .button-edit-rs').bind('click', this.EditItems);

        crewRequestData = this.crewRequestData;
        talentData = this.talentData;
        productionTypeData = this.productionTypeData;
        audioNeedsData = this.audioNeedsData;
        specialConditionData = this.specialConditionData;
    };
};
NBCU.Fulfiller.Resources.prototype.PostBack = false;