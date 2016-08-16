NBCU.ERFulfiller.Craft = function () {
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
            $(this).parent().parent().find('.calender-conatainer-edrf-craft').show();
            if ($(".form-edr-craft-producer").is(":visible") == true) {
                $('#ERProducerEditPage').css('padding-top', '10px');
            }
            var showUnit_MSNBC = false;
            $.each($("input[id^='edrf-summary-showunit_']"), function (ind, val) {
                var showUnit_Value = $(val).val().toUpperCase();
                if (showUnit_Value.indexOf('MSNBC') != -1) {
                    showUnit_MSNBC = true;
                }
            });

            if (showUnit_MSNBC) {
                $('.shwunit-msnbc').show();
                $('.box-edr-Sourcematerial-checkbox').show();
            }
            else {
                $('.shwunit-msnbc').hide();
                $('.box-edr-Sourcematerial-checkbox').hide();
            }
        }
        else {
            $(this).text("edit");
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                var ctrlID = $(this).attr('id');
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
                if (ctrlID == "edrf_craft_startdate_value") {
                    $(this).prev().prev().hide();
                    $(this).prev().prev().prev().hide();
                    $(this).text($(this).prev().prev().prev().val());
                }
            });
            if ($(".form-edr-craft-producer").is(":visible") == false) {
                $('#ERProducerEditPage').css('padding-top', '');
            }
            craftSectionSave();
        }
        event.stopPropagation();
    }

    function craftSectionSave() {
        var lengthPiece = '';
        if ($('#edrf-Piecetbd').is(':checked')) {
            $('#edrf_tbd_value').text('Yes');
            editRequestData.PleceTBD = "Yes";
        }
        else {
            $('#edrf_tbd_value').text('No');
            editRequestData.PleceTBD = "No";
            var pieceMin = $('#edrf-PieceMinutes').val().trim();
            var pieceSec = $('#edrf-PieceSeconds').val().trim();

            if (pieceMin !== '') {
                lengthPiece = lengthPiece + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' minute ' : ' minutes ');
            }
            if (pieceSec !== '') {
                lengthPiece = lengthPiece + pieceSec + ((pieceSec === '0' || pieceSec === '00' || pieceSec === '000' || pieceSec === '1' || pieceSec === '01' || pieceSec === '001') ? ' second ' : ' seconds ');
            }
        }
        if ($('#edrf-IsCrashEdit').is(':checked')) {
            $('#edrf_edittime_value').text('Yes');
            editRequestData.IsCrashEdit = "Yes";
        }
        else {
            $('#edrf_edittime_value').text('No');
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
        var additionRequirements = [];
        if ($('[name="AdditionalRequirements"]:eq(0)').is(':checked')) {
            editRequestData.AMMusic = "Yes";
            additionRequirements.push('Music');
        }
        else {
            delete additionRequirements['Music'];
            editRequestData.AMMusic = "No";
        }
        if ($('[name="AdditionalRequirements"]:eq(1)').is(':checked')) {
            additionRequirements.push('Graphics/Stills');
            editRequestData.AMGraphicStills = "Yes";
        }
        else {
            delete additionRequirements['Graphics/Stills'];
            editRequestData.AMGraphicStills = "No";
        }
        if ($('[name="AdditionalRequirements"]:eq(2)').is(':checked')) {
            additionRequirements.push('Color Correct');
            editRequestData.AMColorCorrect = "Yes";
        }
        else {
            delete additionRequirements['Color Correct'];
            editRequestData.AMColorCorrect = "No";
        }
        if ($('[name="AdditionalRequirements"]:eq(3)').is(':checked')) {
            additionRequirements.push('Audio Correct');
            editRequestData.AMAudioCorrect = "Yes";
        }
        else {
            delete additionRequirements['Audio Correct'];
            editRequestData.AMAudioCorrect = "No";
        }
        if ($('[name="AdditionalRequirements"]:eq(4)').is(':checked')) {
            additionRequirements.push('Effects');
            editRequestData.AMEffects = "Yes";
        }
        else {
            delete additionRequirements['Effects'];
            editRequestData.AMEffects = "No";
        }
        if ($('[name="AdditionalRequirements"]:eq(5)').is(':checked')) {
            additionRequirements.push($('.other-textarea.active').val());
            editRequestData.AMOther = "Yes";
            editRequestData.AROtherText = $('.other-textarea.active').val();
        }
        else {
            delete additionRequirements[$('.other-textarea.active').val()];
            editRequestData.AMOther = "No";
        }
        if ($('[name="AdditionalRequirements"]:eq(6)').is(':checked')) {
            additionRequirements = [];
            if ($('.other-textarea.active').val() !== "") {
                var data = 'Music, Graphics/Stills, Color Correct, Audio Correct, Effects' + ', ' + $('.other-textarea.active').val();
                additionRequirements.push(data);
            }
            else {
                additionRequirements.push('Music, Graphics/Stills, Color Correct, Audio Correct, Effects');
            }
            editRequestData.AMAllOfTheAbove = "Yes";
        }
        else {
            editRequestData.AMAllOfTheAbove = "No";
        }

        $('#edrf_craft_startdate_value').text($('#edrf_craft_startdate_value').prev().prev().prev().val());
        $('#edrf_craft_startdate_value').prev().prev().hide();
        $('#edrf_craft_startdate_value').prev().prev().prev().hide();

        $('#edrf_addRequirements-value').text(additionRequirements.join(', '));
        $('#edrf_length_time_value').text(lengthPiece);
        var pieceDays = $('#edrf_PieceDays_textbox').val().trim();
        var pieceHrs = $('#edrf_PieceHrs_textbox').val().trim();
        var pieceMin = $('#edrf_PieceMin_textbox').val().trim();

        var craftEditTime = '';
        if (pieceDays !== '') {
            craftEditTime = craftEditTime + pieceDays + ((pieceDays === '0' || pieceDays === '00' || pieceDays === '000' || pieceDays === '1' || pieceDays === '01' || pieceDays === '001') ? ' day ' : ' days ');
        }
        if (pieceHrs !== '') {
            craftEditTime = craftEditTime + pieceHrs + ((pieceHrs === '0' || pieceHrs === '00' || pieceHrs === '000' || pieceHrs === '1' || pieceHrs === '01' || pieceHrs === '001') ? ' hour ' : ' hours ');
        }
        if (pieceMin !== '') {
            craftEditTime = craftEditTime + pieceMin + ((pieceMin === '0' || pieceMin === '00' || pieceMin === '000' || pieceMin === '1' || pieceMin === '01' || pieceMin === '001') ? ' minute ' : ' minutes ');
        }

        $('#edrf_craftedit-time_value').text(craftEditTime);

        if ($('.shwunit-msnbc').is(":visible")) {
            var SourceMaterialOther = "", SourceMaterial = "";
            $.each($('[name="Sourcematerial"]:checked'), function (ind1, val1) {
                if (ind1 == $('[name="Sourcematerial"]:checked').length - 1) {
                    SourceMaterial = SourceMaterial + $(this).next().text();
                }
                else {
                    SourceMaterial = SourceMaterial + $(this).next().text() + ";";
                }
                if ($(this).next().text() == "Other") {
                    SourceMaterialOther = $(this).next().next().val()
                    editRequestData.SourceMaterialOther = SourceMaterialOther;
                }
            });
            editRequestData.SourceMaterial = SourceMaterial;

            var sourceMaterialData = SourceMaterial + (SourceMaterialOther === '' ? '' : (';' + SourceMaterialOther));
            var splitSourceMaterial2 = sourceMaterialData.split(';');
            var allaboveindex = splitSourceMaterial2.indexOf("All of the Above")
            var otherindex = splitSourceMaterial2.indexOf("Other")
            if (allaboveindex !== -1) {
                splitSourceMaterial2.splice(allaboveindex, 1);
            }
            if (otherindex !== -1) {
                splitSourceMaterial2.splice(otherindex, 1);
            }
            $('#edrf_sourcematerial-value').text(splitSourceMaterial2.join(';'));
        }
        else {
            editRequestData.SourceMaterialOther = '';
            editRequestData.SourceMaterial = '';
        }
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
        $("#ERSummaryEditPage .button-edit").off("click");
        $("#ERcraftEditPage .button-edit").off("click");
        $("#ERProducerEditPage .button-edit").off("click");
        editRequestData = this.editRequestData;

        $('#ERcraftEditPage .button-edit').bind('click', this.CraftEditItems);

        if ($('#ERcraftEditPage .button-edit').text() == "edit") {
            craftSectionSave();
        }
    }
};
NBCU.ERFulfiller.Craft.prototype.PostBack = false;