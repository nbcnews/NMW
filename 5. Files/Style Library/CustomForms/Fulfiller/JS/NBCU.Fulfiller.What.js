NBCU.Fulfiller.What = function () {
    var validCheck = true;
    this.productionTypeData = [];
    this.talentData = [];
    this.storyData = [];
    this.showUnitData = [];
    this.crewRequestData;
    this.crt_TalentData = [];
    this.crt_ShowUnitData = [];
    this.crt_ShootData = [];

    this.AppendProductionType = function (productionTypeData, seletedItem) {
        $('#ff_productiontype').find('option:not(:first)').remove();
        $.each(productionTypeData, function (index, data) {
            $('#ff_productiontype').append('<option id="' + data.ID + '">' + data.ProductionType + '</option>');
        });

        $('#ff_productiontype').val(seletedItem);
    };

    this.AddShowUnit = function () {
        NBCU.Fulfiller.Helper.txtUnit++;
        var btn_click_cntl = '<div class="colsshowunit"><div class="cols cols-6 form-group">' +
                         '<label class="label label-display">Show Unit </label>' +
                         '<div class="display-dataform">' +
                             '<input type="text" class="textbox" id="ff_txtUnit_' + NBCU.Fulfiller.Helper.txtUnit + '" ff_txtunitid_' + NBCU.Fulfiller.Helper.txtUnit + '="">' +
                             '<span class="display-data" id="ff_ShowUnit_' + NBCU.Fulfiller.Helper.txtUnit + '" ff_showunit_id_' + NBCU.Fulfiller.Helper.txtUnit + '=""></span>' +
                             '<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                         '</div>' +
                     '</div>' +
                    '<div class="cols cols-6 form-group">' +
                        '<label class="label label-display">Budget Code </label>' +
                        '<div class="display-dataform">' +
                            '<input type="text" class="textbox" id="ff_txtBucode_' + NBCU.Fulfiller.Helper.txtUnit + '" >' +
                            '<span class="display-data" id="ff_BudgetCode_' + NBCU.Fulfiller.Helper.txtUnit + '"></span>' +
                        '</div>' +
                        '<span class="remove-button button-remove-showunit"></span>' +
                    '</div>'
                    
        $(this).parent().before(btn_click_cntl);
        $('#ff_txtBucode_' + NBCU.Fulfiller.Helper.txtUnit).show();
        $('#ff_txtUnit_' + NBCU.Fulfiller.Helper.txtUnit).show();
    };

    this.RemoveShowUnit = function () {
        $(this).closest('.colsshowunit').remove();
    };

    this.addtalentItem = function () {
        NBCU.Fulfiller.Helper.cntTalent++
        var btn_click_cntl = '<div class="forms-add-conatiner">' +
                     '<label class="label label-display">Talent (On Site) </label>' +
                     '<div class="display-dataform">' +
                         '<input type="text" class="textbox" id="ff_txtTalent_' + NBCU.Fulfiller.Helper.cntTalent + '" ff_talentid_' + NBCU.Fulfiller.Helper.cntTalent + '="">' +
                         '<span class="display-data" id="ff_Talent_' + NBCU.Fulfiller.Helper.cntTalent + '"  ff_Talent_ID_' + NBCU.Fulfiller.Helper.cntTalent + '=""></span>' +
                         '<div class="valid-msg valid-msg-error">It is duplicated</div>' +
                     '</div>' +
					   '<span class="remove-button button-remove-talent"></span> ' +
                  '</div>';

        $(this).parent().before(btn_click_cntl);
        $('#ff_txtTalent_' + NBCU.Fulfiller.Helper.cntTalent).show();
    };

    this.RemoveTalent = function () {
        $(this).closest('.forms-add-conatiner').remove();
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

    this.EditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('select').show();

            $('.button-remove-talent').show();
            $('.button-remove-showunit').show();
            $('.button-addt').show();
            $('.button-addsu').show();
        }
        else {
            $(this).text("edit");
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
                $('#ff_ProductionType').text($('#ff_productiontype').val());
                $('#ff_ShootStatus').text($('#ff_shootstatus').val());

                $('.button-remove-talent').hide();
                $('.button-remove-showunit').hide();
                $('.button-addt').hide();
                $('.button-addsu').hide();
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
        crewRequestData = this.crewRequestData;
        crt_TalentData = this.crt_TalentData;
        crt_ShowUnitData = this.crt_ShowUnitData;
        crt_ShootData = this.crt_ShootData;
        talentData = this.talentData;
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        productionTypeData = this.productionTypeData;
        //this.AppendProductionType(productionTypeData, $('#ff_ProductionType').text());
        if (crewRequestData.CrewType == "Correspondent Live Shot") {
            $('#ff_productiontype').append($("<option></option>").text('LIVE/Corr'));
            $('#ff_productiontype').val('LIVE/Corr');
        };
        if (crewRequestData.CrewType == "Breaking News") {
            $('#ff_productiontype').append($("<option></option>").text('LIVE/TAPE'));
            $('#ff_productiontype').val('LIVE/TAPE');
        }
        if (crewRequestData.CrewType == "Bureau Camera") {
            $('#ff_productiontype').append($("<option></option>").text('LIVE/Guest'));
            $('#ff_productiontype').val('LIVE/Guest');
        }
        $('#whatPage .button-edit').bind('click', this.EditItems);

        $(".button-addt").unbind('click');
        $(".button-addt").bind('click', this.addtalentItem);
        $(".button-addsu").unbind('click');
        $(".button-addsu").bind('click', this.AddShowUnit);
        $(document).on("click", ".button-remove-talent", this.RemoveTalent);
        $(document).on("click", ".button-remove-showunit", this.RemoveShowUnit);

        var finalDataShowUnit = $.map(showUnitData, function (item) {
            return {
                label: item.ShowUnitTitle,
                value: item.ShowUnitTitle,
                title: item.DefaultBudgetCode,
                id: item.ID
            }
        });

        $(document).on('focus.autocomplete', "input:text[id^='ff_txtUnit_']", function () {
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
                    var index = this.id.split("_")[2];
                    if (!!ui.item.title) {
                        $('#ff_txtUnit_' + index).val(ui.item.label);
                        $('#ff_ShowUnit_' + index).val(ui.item.label);
                        $('#ff_txtBucode_' + index).val(ui.item.title);
                        $('#ff_BudgetCode_' + index).val(ui.item.title);
                        $('#ff_txtUnit_' + index).attr('ff_txtunitid_' + index, ui.item.id);
                        $('#ff_ShowUnit_' + index).attr('ff_showunit_id_' + index, ui.item.id);
                    }
                    else {
                        $('#ff_txtUnit_' + index).val('');
                        $('#ff_ShowUnit_' + index).val('');
                        $('#ff_txtBucode_' + index).val('');
                        $('#ff_BudgetCode_' + index).val('');
                        $('#ff_txtUnit_' + index).attr('ff_txtunitid_' + index, '');
                        $('#ff_ShowUnit_' + index).attr('ff_showunit_id_' + index, '');
                    }
                },
                search: function (event, ui) {
                    var searchIndex = this.id.split("_")[2];
                    $('#ff_txtBucode_' + searchIndex).val('');
                    $('#ff_BudgetCode_' + searchIndex).val('');
                    $('#ff_txtUnit_' + searchIndex).attr('ff_txtunitid_' + searchIndex, '');
                    $('#ff_ShowUnit_' + searchIndex).attr('ff_showunit_id_' + searchIndex, '');
                }
            });
        });

        var finalDataTalent = $.map(talentData, function (item) {
            return {
                label: item.Title,
                value: item.Title,
                title: item.Id
            }
        });

        $(document).on('focus.autocomplete', "input:text[id^='ff_txtTalent_']", function () {
            $(this).autocomplete({
                source: finalDataTalent,
                width: 300,
                max: 20,
                delay: 100,
                minlength: 1,
                autofocus: true,
                cachelength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    var index = this.id.split("_")[2];
                    $('#ff_txtTalent_' + index).val(ui.item.label);
                    $('#ff_Talent_' + index).val(ui.item.label);
                    $('#ff_txtTalent_' + index).attr('ff_talentid_' + index, ui.item.title);
                    $('#ff_Talent_' + index).attr('ff_talent_id_' + index, ui.item.title);
                }
            });
        });
    }

    if ($('#whatPage .button-edit').text() == "save") {
        $('.button-remove-talent').show();
        $('.button-remove-showunit').show();
        $('.button-addt').show();
        $('.button-addsu').show();
    }
};
NBCU.Fulfiller.What.prototype.PostBack = false;