NBCU.ERFulfiller.Summary = function () {
    var validCheck = true;
    this.productionTypeData = [];
    this.talentData = [];
    this.storyData = [];
    this.showUnitData = [];
    this.editRequestData;
    this.crt_TalentData = [];
    this.crt_ShowUnitData = [];
    this.crt_ShootData = [];

    this.AddShowUnit = function () {
        NBCU.ERFulfiller.Helper.txtUnit++;
        var btn_click_cntl = '<div class="colsshowunit"><div class="cols cols-4-5 form-group">' +
                                       '<label class="label label-display">' +
                                       'Show Unit <sup class="mandatory">*</sup>' +
                                       '</label>' +
                                       '<div class="display-dataform">' +
                                           '<input id="edrf-summary-showunit_' + NBCU.ERFulfiller.Helper.txtUnit + '" class="textbox edrf_summary_showunit_textbox" value="" network="">' +
                                           '<span class="display-data" id="edrf_summary_showunit_value_' + NBCU.ERFulfiller.Helper.txtUnit + '" edrf_showunit_id_' + NBCU.ERFulfiller.Helper.txtUnit + '=""></span>' +
                                           '<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                                           '<div class="valid-msg valid-msg-error">Please complete the required field </div>' +
                                       '</div>' +
                                   '</div>' +
                                   '<div class="cols cols-3-5 form-group">' +
                                       '<label class="label label-display">' +
                                       'Budget Code' +
                                       '</label>' +
                                       '<div class="display-dataform">' +
                                           '<input id="edrf-summary-budgetcode_' + NBCU.ERFulfiller.Helper.txtUnit + '" class="textbox edrf_summary_budgetcode_textbox" value="">' +
                                           '<span class="display-data" id="edrf_summary_budgetcode_value_' + NBCU.ERFulfiller.Helper.txtUnit + '"></span>' +
                                       '</div>' +
                                       '<span class="remove-button button-remove-showunit"></span>' +
                                   '</div>';

        $(this).parent().before(btn_click_cntl);
        $('#edrf-summary-budgetcode_' + NBCU.ERFulfiller.Helper.txtUnit).show();
        $('#edrf-summary-showunit_' + NBCU.ERFulfiller.Helper.txtUnit).show();
    };

    this.RemoveShowUnit = function () {
        $(this).closest('.colsshowunit').remove();
    };

    this.SummaryEditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('select').show();
            $(this).parent().parent().find('.icon-datepicker').show();
            $(this).parent().parent().find('input[type="checkbox"]').show();
            $(this).parent().parent().find('.calendar-edrf-summary-airdate').show();
            $('.button-remove-showunit').show();
            $('.button-addsu').show();
            $('#dis-edrf-summary-airdateTBD').hide();
        }
        else {
            if (!$('.sp-peoplepicker-errorMsg').is(':visible')) {
                var budgetCheck = true;
                $.each($('.edrf_summary_showunit_textbox'), function (shInd, shVal) {
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
                        if (ctrlID == "edrf_summary_txtairdate_value") {
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

        $('#edrf_summary_txtairdate_value').text($('#edrf_summary_txtairdate_value').prev().prev().prev().val());
        $('#edrf_summary_txtairdate_value').prev().prev().hide();
        $('#edrf_summary_txtairdate_value').prev().prev().prev().hide();

        $('.button-remove-showunit').hide();
        $('.button-addsu').hide();
        $('#edrf_Requester_value').text($('#erqf_peoplePickerRequesterDiv span.ms-entity-resolved').text());
        $('#edrf_Producer_value').text($('#edrf_peoplePickerProducerDiv span.ms-entity-resolved').text());
        $('#edrf_SeniorProducer_value').text($('#edrf_SeniorProducerDiv span.ms-entity-resolved').text());
        if ($('#edrf-summary-airdateTBD').is(':checked')) {
            $('#edrf-summary-airdateTBD_value').text('Yes');
        }
        else {
            $('#edrf-summary-airdateTBD_value').text('No');
        }
    }

    this.Init = function () {
        $(".button-edit").off("click");
        $("#ERSummaryEditPage .button-edit").off("click");
        $("#ERcraftEditPage .button-edit").off("click");
        $("#ERProducerEditPage .button-edit").off("click");
        $('.button-remove-showunit').show();
        $('.button-addsu').show();
        editRequestData = this.editRequestData;
        editRequestShowUnitData = this.editRequestShowUnitData;
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        $('#ERSummaryEditPage .button-edit').bind('click', this.SummaryEditItems);

        if ($('#ERSummaryEditPage .button-edit').text() == "edit") {
            summarySectionSave();
        }

        $(".button-addsu").unbind('click');
        $(".button-addsu").bind('click', this.AddShowUnit);
        $(document).on("click", ".button-remove-showunit", this.RemoveShowUnit);

        var finalDataShowUnit = $.map(showUnitData, function (item) {
            return {
                label: item.ShowUnitTitle,
                value: item.ShowUnitTitle,
                title: item.DefaultBudgetCode,
                id: item.ID,
                Business: item.Business
            }
        });

        var noDatelineShowUnit = $.grep(finalDataShowUnit, function (a) {
            return a.value != "Dateline";
        });

        $(document).on('focus.autocomplete', "input:text[id^='edrf-summary-showunit_']", function () {
            $(this).autocomplete({
                source: noDatelineShowUnit,
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
                        $('#edrf-summary-showunit_' + index).val(ui.item.label);
                        $('#edrf_summary_showunit_value_' + index).val(ui.item.label);
                        $('#edrf-summary-budgetcode_' + index).val(ui.item.title);
                        $('#edrf_summary_budgetcode_value_' + index).val(ui.item.title);
                        $('#edrf_summary_showunit_value_' + index).attr('edrf_showunit_id_' + index, ui.item.id);
                        $('#edrf-summary-showunit_' + index).attr('network', ui.item.Business);
                    }
                    else {
                        $('#edrf-summary-showunit_' + index).val('');
                        $('#edrf_summary_showunit_value_' + index).val('');
                        $('#edrf-summary-budgetcode_' + index).val('');
                        $('#edrf_summary_budgetcode_value_' + index).val('');
                        $('#edrf_summary_showunit_value_' + index).attr('edrf_showunit_id_' + index, '');
                        $('#edrf-summary-showunit_' + index).attr('network', '');
                    }
                },
                search: function (event, ui) {
                    var searchIndex = this.id.split("_")[1];
                    $('#edrf-summary-budgetcode_' + searchIndex).val('');
                    $('#edrf_summary_budgetcode_value_' + searchIndex).val('');
                    $('#edrf_summary_showunit_value_' + searchIndex).attr('edrf_showunit_id_' + searchIndex, '');
                    $('#edrf-summary-showunit_' + searchIndex).attr('network', '');
                }
            });
        });
    }
};
NBCU.ERFulfiller.Summary.prototype.PostBack = false;