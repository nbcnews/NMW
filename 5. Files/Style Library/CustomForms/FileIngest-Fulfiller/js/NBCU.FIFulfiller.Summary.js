NBCU.FIFulfiller.Summary = function () {
    var validCheck = true;
    this.productionTypeData = [];
    this.talentData = [];
    this.storyData = [];
    this.showUnitData = [];
    this.editRequestData;
    this.crt_TalentData = [];
    this.crt_ShowUnitData = [];
    this.crt_ShootData = [];

    this.SummaryEditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('select').show();
            $(this).parent().parent().find('.icon-datepicker').show();
            $(this).parent().parent().find('input[type="checkbox"]').show();
            $(this).parent().parent().find('.calendar-edrf-summary-airdate').show();
            
        }
        else {
            if (!$('.sp-peoplepicker-errorMsg').is(':visible')) {
                var budgetCheck = true;
                $.each($('.fif_summary_showunit_textbox'), function (shInd, shVal) {
                    if (!!$(this).val()) {
                        $(this).next().next().next().hide();
                    }
                    else {
                        budgetCheck = false;
                        $(this).next().next().next().show();
                    }
                });
                if (budgetCheck) {
                    $(this).text("edit");
                    $(this).parent().parent().find('.display-data').each(function (ind, val) {
                        var ctrlID = $(this).attr('id');
                        $(this).show()
                        $(this).text($(this).prev().val());
                        $(this).prev().hide();
                        if (ctrlID === "FIF_airdate" || ctrlID === "FIF_date_need") {
                            $(this).prev().prev().hide();
                            $(this).prev().prev().prev().hide();
                            $(this).text($(this).prev().prev().prev().val());
                        }
                    });
                    summarySectionSave();
                }
            }
        }
        event.stopPropagation();
    }

    function summarySectionSave() {

        $('#FIF_airdate').text($('#FIF_airdate').prev().prev().prev().val());
        $('#FIF_airdate').prev().prev().hide();
        $('#FIF_airdate').prev().prev().prev().hide();

        $('#FIF_requesterName').text($('#FIF_peoplePickerRequesterDiv span.ms-entity-resolved').text());
        $('#FIF_producerName').text($('#FIF_peoplePickerProducerDiv span.ms-entity-resolved').text());
        $('#FIF_SeniorproducerName').text($('#FIF_peoplePickerSeniorProducerDiv span.ms-entity-resolved').text());

        if ($('#FIF-airdateTBD').is(':checked')) {
            $('#FIF-airdateTBD_value').text('Yes');
            editRequestData.AirDateTBD = 'Yes';
        }
        else {
            $('#FIF-airdateTBD_value').text('No');
            editRequestData.AirDateTBD = 'No';
        }

        if ($('#FIF_asap').is(':checked')) {
            $('#FIF_asap_value').text('Yes');
            editRequestData.DateNeededByASAP = 'Yes'
        }
        else {
            $('#FIF_asap_value').text('No');
            editRequestData.DateNeededByASAP = 'No'
        }
    }

    this.Init = function () {
        $(".button-edit").off("click");
        $("#FIFSummary .button-edit").off("click");
        $("#FIFdevicecamera .button-edit").off("click");
        $("#FIFadditionalinfo .button-edit").off("click");
    
        editRequestData = this.editRequestData;
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        $('#FIFSummary .button-edit').bind('click', this.SummaryEditItems);

        if ($('#FIFSummary .button-edit').text() == "edit") {
            summarySectionSave();
        }

        var finalDataShowUnit = $.map(showUnitData, function (item) {
            return {
                label: item.ShowUnitTitle,
                value: item.ShowUnitTitle,
                title: item.DefaultBudgetCode,
                id: item.ID
            }
        });

        $(document).on('focus.autocomplete', "input:text[id^='fif-summary-showunit_']", function () {
            $(this).autocomplete({
                source: finalDataShowUnit,
                width: 300,
                max: 20,
                delay: 100,
                minLength: 1,
                autoFocus: true,
                cacheLength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    var index = this.id.split("_")[1];
                    if (!!ui.item.title) {
                        $('#fif-summary-showunit_' + index).val(ui.item.label);
                        $('#fif_summary_showunit_value_' + index).val(ui.item.label);
                        $('#fif-summary-budgetcode_' + index).val(ui.item.title);
                        $('#fif_summary_budgetcode_value_' + index).val(ui.item.title);
                        $('#edrf_summary_showunit_value_' + index).attr('edrf_showunit_id_' + index, ui.item.id);
                    }
                    else {
                        $('#fif-summary-showunit_' + index).val('');
                        $('#fif_summary_showunit_value_' + index).val('');
                        $('#fif-summary-budgetcode_' + index).val('');
                        $('#fif_summary_budgetcode_value_' + index).val('');
                        $('#fif_summary_showunit_value_' + index).attr('edrf_showunit_id_' + index, '');
                    }
                },
                search: function (event, ui) {
                    var searchIndex = this.id.split("_")[1];
                    $('#fif-summary-budgetcode_' + searchIndex).val('');
                    $('#fif_summary_budgetcode_value_' + searchIndex).val('');
                    $('#fif_summary_showunit_value_' + searchIndex).attr('edrf_showunit_id_' + searchIndex, '');
                }
            });
        });
    }
};
NBCU.FIFulfiller.Summary.prototype.PostBack = false;