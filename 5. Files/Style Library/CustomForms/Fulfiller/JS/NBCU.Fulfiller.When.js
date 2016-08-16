NBCU.Fulfiller.When = function () {
    var validCheck = true;
    this.audioNeedsData = [];
    this.specialConditionData = [];

    

    this.EditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('select').show();
            $('.descShoot').show();
            $('#ff_descShoot').hide();
        }
        else {
            $(this).text("edit");
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
                try {
                    var prevID = $(this).prev().attr('id');
                    if (prevID == "ff-meettime-select" || prevID == "ff-rolltime-select" || prevID == "ff-endtime-select") {
                        $(this).prev().hide();
                        $(this).prev().prev().hide();
                        $(this).prev().prev().prev().hide();
                    }
                } catch (e) {

                }
                $('#ff_MeetTime').text($('#ff-meettime-hr').val() + ':' + $('#ff-meettime-min').val() + ' ' + $('#ff-meettime-select').val());
                $('#ff_RollTime').text($('#ff-rolltime-hr').val() + ':' + $('#ff-rolltime-min').val() + ' ' + $('#ff-rolltime-select').val());
                $('#ff_EndTime').text($('#ff-endtime-hr').val() + ':' + $('#ff-endtime-min').val() + ' ' + $('#ff-endtime-select').val());
                $('#ff_AudioNeeds').text($('#ff_AudioNeeds-select').val());
                $('#ff_SpecialConditions').text($('#ff_specialconditions-select').val());
                $('#ff_TransmissionType').text($('#ff_transmissiontype-select').val());
                $('.descShoot').hide();
                $('#ff_descShoot').show();
            });
        }
        event.stopPropagation();
    }

    this.Init = function () {

        $(".button-edit").off("click");
        $("#whoPage .button-edit").off("click");
        $("#whatPage .button-edit").off("click");
        $("#wherePage .button-edit").off("click");
        $("#whenPage .button-edit").off("click");
        $("#resourcesPage .button-edit-rs").off("click");
        $('#whenPage .button-edit').bind('click', this.EditItems);
        crewRequestData = this.crewRequestData;
        audioNeedsData = this.audioNeedsData;
        specialConditionData = this.specialConditionData;
        transmissionTypeData = this.transmissionTypeData;
    }
};
NBCU.Fulfiller.When.prototype.PostBack = false;