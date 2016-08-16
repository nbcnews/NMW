NBCU.LFFulfiller.Craft = function () {
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
                                       'Show Unit' +
                                       '</label>' +
                                       '<div class="display-dataform">' +
                                           '<input id="edrf-summary-showunit_' + NBCU.ERFulfiller.Helper.txtUnit + '" class="textbox edrf_summary_showunit_textbox" value="">' +
                                           '<span class="display-data" id="edrf_summary_showunit_value_' + NBCU.ERFulfiller.Helper.txtUnit + '" edrf_showunit_id_' + NBCU.ERFulfiller.Helper.txtUnit + '=""></span>' +
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

    function getValidate() {
        validCheck = true;
        if ($('#productiontype option:selected').text().trim() == "" && $('#productiontype').val().trim() == "") {
            $('#productiontype').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#productiontype').next().hide();
        }
        if ($('#assignmentslug').val().trim() == "") {
            $('#assignmentslug').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#assignmentslug').next().hide();
        }
        if ($('#shootstatus option:selected').text().trim() == "" && $('#shootstatus').val().trim() == "") {
            $('#shootstatus').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#shootstatus').next().hide();
        }
        var talent = [];
        $.each($('.talent-sel'), function (ind, val) {
            if ($(val).val().trim() == "") {
                $(val).next().show();
                validCheck = false;
            }
            else {
                if ($.inArray($(val).val().trim(), talent) !== -1) {
                    $(val).next().next().show();
                    validCheck = false;
                }
                else {
                    talent.push($(val).val().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(val).next().hide();
                    $(val).next().next().hide();
                }
            }
        });
        var budget = [];
        $.each($('.bdjCodeDiv'), function (ind, val) {
            if ($(this).closest('.form-budget').prev().find('input').val().trim() == "") {
                $(this).closest('.form-budget').prev().find('input').next().show();
                validCheck = false;
            }
            else {
                if ($.inArray($(this).closest('.form-budget').prev().find('input').val().trim(), budget) !== -1) {
                    $(this).closest('.form-budget').prev().find('input').next().next().show();
                    validCheck = false;
                }
                else {
                    budget.push($(this).closest('.form-budget').prev().find('input').val().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(this).closest('.form-budget').prev().find('input').next().hide();
                    $(this).closest('.form-budget').prev().find('input').next().next().hide();
                }
            }
        });
        return validCheck;
    };

    this.CraftEditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            datePickerLoad($('#edrf-summary-start-date'), '.calender-conatainer-edrf-craft', $('#edrf_craft_startdate_textbox'));
            $(this).parent().parent().find('input[type="checkbox"]').show();
            $(this).parent().parent().find('.form-edr-craft-producer').show();
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('select').show();
            $(this).parent().parent().find('.icon-datepicker').show();
            $(this).parent().parent().find('.calender-conatainer-edLF-craft').show();
            $(this).parent().parent().find('.calender-conatainer-est-editroom').show();
            $(this).parent().parent().find('.calender-conatainer-st-screen').show();
        }
        else {
            $(this).text("edit");
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                var ctrlID = $(this).attr('id');
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
                if (ctrlID === "edLF_craft_startdate_value" || ctrlID === "edLF_st_screen_value" || ctrlID === "edLF_est_editroom_value") {
                    $(this).prev().prev().hide();
                    $(this).prev().prev().prev().hide();
                    $(this).text($(this).prev().prev().prev().val());
                }
            });
            craftSectionSave();
        }
        event.stopPropagation();
    }

    function craftSectionSave() {
        var lengthPiece = '';
        if ($('#edLF-Piecetbd').is(':checked')) {
            $('#edLF_tbd_value').text('Yes');
            editRequestData.PleceTBD = "Yes";
        }
        else {
            $('#edLF_tbd_value').text('No');
            editRequestData.PleceTBD = "No";
            var pieceMin = $('#edLF-PieceMinutes').val().trim();
            var pieceSec = $('#edLF-PieceSeconds').val().trim();

            if (pieceMin !== '') {
                lengthPiece = lengthPiece + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' hour ' : ' hours ');
            }
            if (pieceSec !== '') {
                lengthPiece = lengthPiece + pieceSec + ((pieceSec === '0' || pieceSec === '00' || pieceSec === '000' || pieceSec === '1' || pieceSec === '01' || pieceSec === '001') ? ' minute ' : ' minutes ');
            }
        }
        if ($('#edLF-crashedit').is(':checked')) {
            $('#edLF_crashedit_value').text('Yes');
            editRequestData.IsCrashEdit = "Yes";
        }
        else {
            $('#edLF_crashedit_value').text('No');
            editRequestData.IsCrashEdit = "No";
        }
        if ($('#edrf-Isrecut').is(':checked')) {
            $('#edrf_recutweb_value').text('Yes');
            editRequestData.Isrecut = "Yes";
        }
        else {
            $('#edrf_recutweb_value').text('No');
            editRequestData.Isrecut = "No";
        }
        if ($('#edrf_IsFieldEditing_textbox').is(':checked')) {
            $('#edrf_IsFieldEditing_value').text('Yes');
            editRequestData.IsFieldEditing = "Yes";
        }
        else {
            $('#edrf_IsFieldEditing_value').text('No');
            editRequestData.IsFieldEditing = "No";
        }
        if ($('#edrf_IsCraftEditBrollTeasesVosSOTS_textbox').is(':checked')) {
            $('#edrf_IsCraftEditBrollTeasesVosSOTS_textbox_value').text('Yes');
            editRequestData.IsCraftEditBrollTeasesVosSOTS = "Yes";
        }
        else {
            $('#edrf_IsCraftEditBrollTeasesVosSOTS_textbox_value').text('No');
            editRequestData.IsCraftEditBrollTeasesVosSOTS = "No";
        }

        $('#edrf_craft_startdate_value').text($('#edrf_craft_startdate_value').prev().prev().prev().val());
        $('#edrf_craft_startdate_value').prev().prev().hide();
        $('#edrf_craft_startdate_value').prev().prev().prev().hide();

        $('#edLF_length_time_value').text(lengthPiece);
        var pieceDays = $('#edLF_PieceDays_textbox').val().trim();
        var pieceHrs = $('#edLF_PieceHrs_textbox').val().trim();
        var pieceMin = $('#edLF_PieceMin_textbox').val().trim();

        var craftEditTime = '';
        if (pieceDays !== '') {
            craftEditTime = craftEditTime + pieceDays + ((pieceDays === '0' || pieceDays === '00' || pieceDays === '000' || pieceDays === '1' || pieceDays === '01' || pieceDays === '001') ? ' week ' : ' weeks ');
        }
        if (pieceHrs !== '') {
            craftEditTime = craftEditTime + pieceHrs + ((pieceHrs === '0' || pieceHrs === '00' || pieceHrs === '000' || pieceHrs === '1' || pieceHrs === '01' || pieceHrs === '001') ? ' day ' : ' days ');
        }
        if (pieceMin !== '') {
            craftEditTime = craftEditTime + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' hour ' : ' hours ');
        }

        $('#edLF_craftedit-time_value').text(craftEditTime);
    }

    function datePickerLoad(calendarIconElement, calendarElement, calendarTextElement) {
        calendarIconElement.dateRangePicker({
            inline: true,
            mode: 'single',
            container: calendarElement,
            alwaysOpen: false,
            singleMonth: true,
            stickyMonths: true,
            autoClose: true,
            singleDate: true,
            getValue: function () {
                return this.innerHTML;
            },
            setValue: function (s0) {
                calendarTextElement.val(s0);
            }
        });
    }
    this.Init = function () {
        $(".button-edit").off("click");
        $("#LFSummaryEditPage .button-edit").off("click");
        $("#LFcraftEditPage .button-edit").off("click");
        $("#LFProducerEditPage .button-edit").off("click");
        $("#LFAssistantEditorEditPage .button-edit").off("click");
        editRequestData = this.editRequestData;

        $('#LFcraftEditPage .button-edit').bind('click', this.CraftEditItems);

        if ($('#LFcraftEditPage .button-edit').text() == "edit") {
            craftSectionSave();
        }
    }
};
NBCU.LFFulfiller.Craft.prototype.PostBack = false;