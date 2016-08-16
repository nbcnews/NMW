NBCU.Fulfiller.Where = function () {
    var validCheck = true;
    this.crewRequestData;
    this.stateData = [];
    this.countryData = [];

    this.AppendStates = function (StatesData, CrewState) {
        $('#ff_state-select').find('option:not(:first)').remove();
        $.each(StatesData, function (index, data) {
            $('#ff_state-select').append('<option id="' + data.ID + '">' + data.Title.trim() + '</option>');
        });
        $('#ff_state-select').val(CrewState);
    };

    this.AppendCountires = function (CountiresData, CrewCountry) {
        $('#ff_country-select').find('option:not(:first)').remove();
        $.each(CountiresData, function (index, data) {
            $('#ff_country-select').append('<option id="' + data.ID + '">' + data.Title.trim() + '</option>');
        });
        $('#ff_country-select').val(CrewCountry)
    };

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
                $('#ff_State').text($('#ff_state-select').val());
                $('#ff_Country').text($('#ff_country-select').val());

            });
        }
        event.stopPropagation();
    }

    /* ------------- Init ------------------------ */

    this.Init = function () {     

        $(".button-edit").off("click");
        $("#whoPage .button-edit").off("click");
        $("#whatPage .button-edit").off("click");
        $("#wherePage .button-edit").off("click");
        $("#whenPage .button-edit").off("click");
        $("#resourcesPage .button-edit-rs").off("click");
        $('#wherePage .button-edit').bind('click', this.EditItems);
        crewRequestData = this.crewRequestData;
        stateData = this.stateData;
        countryData = this.countryData;
        this.AppendStates(stateData, crewRequestData.CrewState);
        this.AppendCountires(countryData, crewRequestData.Country);
    }
}

NBCU.Fulfiller.Where.prototype.PostBack = false;