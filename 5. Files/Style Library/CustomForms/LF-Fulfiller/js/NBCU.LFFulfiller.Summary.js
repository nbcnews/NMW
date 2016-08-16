NBCU.LFFulfiller.Summary = function () {
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
        NBCU.LFFulfiller.Helper.txtUnit++;
        var btn_click_cntl = '<div class="colsshowunit"><div class="cols cols-4-5 form-group">' +
                                       '<label class="label label-display">' +
                                       'Show Unit' +
                                       '</label>' +
                                       '<div class="display-dataform">' +
                                           '<input id="edrf-summary-showunit_' + NBCU.LFFulfiller.Helper.txtUnit + '" class="textbox edrf_summary_showunit_textbox" value="">' +
                                           '<span class="display-data" id="edrf_summary_showunit_value_' + NBCU.LFFulfiller.Helper.txtUnit + '" edrf_showunit_id_' + NBCU.LFFulfiller.Helper.txtUnit + '=""></span>' +
                                           '<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                                       '</div>' +
                                   '</div>' +
                                   '<div class="cols cols-3-5 form-group">' +
                                       '<label class="label label-display">' +
                                       'Budget Code' +
                                       '</label>' +
                                       '<div class="display-dataform">' +
                                           '<input id="edrf-summary-budgetcode_' + NBCU.LFFulfiller.Helper.txtUnit + '" class="textbox edrf_summary_budgetcode_textbox" value="">' +
                                           '<span class="display-data" id="edrf_summary_budgetcode_value_' + NBCU.LFFulfiller.Helper.txtUnit + '"></span>' +
                                       '</div>' +
                                       '<span class="remove-button button-remove-showunit"></span>' +
                                   '</div>';
                    
        $(this).parent().before(btn_click_cntl);
        $('#edrf-summary-budgetcode_' + NBCU.LFFulfiller.Helper.txtUnit).show();
        $('#edrf-summary-showunit_' + NBCU.LFFulfiller.Helper.txtUnit).show();
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
            $(this).parent().parent().find('.calendar-erLF-summary-airdate').show();
        }
        else {
            var errorShown = $("#LFSummaryEditPage .sp-peoplepicker-errorMsg").is(":visible");
            if (!errorShown) {
                $(this).text("edit");
                $(this).parent().parent().find('.display-data').each(function (ind, val) {
                    var ctrlID = $(this).attr('id');
                    $(this).show()
                    $(this).text($(this).prev().val());
                    $(this).prev().hide();
                    if (ctrlID == "erLF_summary_txtairdate_value") {
                        $(this).prev().prev().hide();
                        $(this).prev().prev().prev().hide();
                        $(this).text($(this).prev().prev().prev().val());
                    }
                });
                summarySectionSave();
            }
            
        }
        event.stopPropagation();
    }

    function summarySectionSave() {

        $('#erLF_summary_txtairdate_value').text($('#erLF_summary_txtairdate_value').prev().prev().prev().val());
        $('#erLF_summary_txtairdate_value').prev().prev().hide();
        $('#erLF_summary_txtairdate_value').prev().prev().prev().hide();

        $('.button-remove-showunit').hide();
        $('.button-addsu').hide();
        $('#erLF_Requester_value').text($('#erLF_peoplePickerRequesterDiv span.ms-entity-resolved').text());
        $('#erLF_Producer_value').text($('#erLF_peoplePickerProducerDiv span.ms-entity-resolved').text());
        $('#erLF_SeniorProducer_value').text($('#erLF_SeniorProducerDiv span.ms-entity-resolved').text());
        $('#erLF_peopleasst_value').text($('#erLF_peopleasst_proDiv span.ms-entity-resolved').text());
        $('#edLF_summary_business_value').text($('#edLF-summary_business').val());
        $('#edLF_summary_location_value').text($('#edLF_summary_location').val());
        $('#edLF_summary_showunit_value_0').text($('#edLF-summary-showunit_0').val());
        $('#edLF_summary_budgetcode_value_0').text($('#edLF-summary-budgetcode_0').val());
        if ($('#edLF-summarybd').is(':checked')) {
            $('#edLF_summary_tbd_value').text('Yes');
            editRequestData.AirDateTBD = 'Yes';
        }
        else {
            $('#edLF_summary_tbd_value').text('No');
            editRequestData.AirDateTBD = 'No';
        }
    }

    this.Init = function () {
        $(".button-edit").off("click");
        $("#LFSummaryEditPage .button-edit").off("click");
        $("#LFcraftEditPage .button-edit").off("click");
        $("#LFProducerEditPage .button-edit").off("click");
        $("#LFAssistantEditorEditPage .button-edit").off("click");
        $('.button-remove-showunit').show();
        $('.button-addsu').show();
        editRequestData = this.editRequestData;
        editRequestShowUnitData = this.editRequestShowUnitData;
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        $('#LFSummaryEditPage .button-edit').bind('click', this.SummaryEditItems);

        if ($('#LFSummaryEditPage .button-edit').text() == "edit") {
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
                Business: item.Business,
                id: item.ID
            }
        });

        var nbcNewsDataShowUnit = $.grep(finalDataShowUnit, function (a) {
            return a.Business == "NBC News";
        });

        $(document).on('focus.autocomplete', '#edLF-summary-showunit_0', function () {
            $(this).autocomplete({
                source: nbcNewsDataShowUnit,
                width: 300,
                max: 20,
                delay: 100,
                minLength: 1,
                autoFocus: true,
                cacheLength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    $('#edLF-summary-budgetcode_0').val(ui.item.title);
                    $('#edLF_summary_showunit_value_0').text(ui.item.title);
                    $('#edLF_summary_budgetcode_value_0').text(ui.item.title)
                },
                focus: function (event, ui) {
                    $('#edLF-summary-budgetcode_0').val('');
                    $('#edLF_summary_showunit_value_0').text('');
                    $('#edLF_summary_budgetcode_value_0').text('');
                },
                search: function (event, ui) {
                    $('#edLF-summary-budgetcode_0').val('');
                    $('#edLF_summary_showunit_value_0').text('');
                    $('#edLF_summary_budgetcode_value_0').text('');
                }
            });
        });

        //$(document).on('click', "#edLF_summary_showunit_value_0", function () {
        //    $(this).autocomplete({
        //        source: nbcNewsDataShowUnit,
        //        width: 300,
        //        max: 20,
        //        delay: 100,
        //        minLength: 1,
        //        autoFocus: true,
        //        cacheLength: 1,
        //        scroll: true,
        //        highlight: false,
        //        select: function (event, ui) {
        //            $('#edLF-summary-budgetcode_0').val(ui.item.title);
        //            //var index = this.id.split("_")[1];
        //            //if (!!ui.item.title) {
        //            //    $('#edLF-summary-showunit_' + index).val(ui.item.label);
        //            //    $('#edLF_summary_showunit_value_' + index).val(ui.item.label);
        //            //    $('#edLF-summary-budgetcode_' + index).val(ui.item.title);
        //            //    $('#edLF-summary-budgetcode_0').val(ui.item.title);
        //            //    $('#edLF_summary_showunit_value_' + index).attr('edLF_showunit_id_' + index, ui.item.id);
        //            //}
        //            //else {
        //            //    $('#edLF-summary-showunit_' + index).val('');
        //            //    $('#edLF_summary_showunit_value_' + index).val('');
        //            //    $('#edLF-summary-budgetcode_' + index).val('');
        //            //    $('#edLF_summary_budgetcode_value_' + index).val('');
        //            //    $('#edLF_summary_showunit_value_' + index).attr('edLF_showunit_id_' + index, '');
        //            //}
        //        },
        //        focus: function (event, ui) {
        //            $(this).closest('.cols-12').find('input').last().val('');
        //        },
        //        search: function (event, ui) {
        //            $(this).closest('.cols-12').find('input').last().val('');
        //        }

        //        //search: function (event, ui) {
        //        //    var searchIndex = this.id.split("_")[1];
        //        //    $('#edLF-summary-budgetcode_' + searchIndex).val('');
        //        //    $('#edLF_summary_budgetcode_value_' + searchIndex).val('');
        //        //    $('#edLF_summary_showunit_value_' + searchIndex).attr('edLF_showunit_id_' + searchIndex, '');
        //        //}
        //    });
        //});
    }
};
NBCU.LFFulfiller.Summary.prototype.PostBack = false;