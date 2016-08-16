NBCU.EditRequest.EditCraft = function () {

    function collectData() {
        var piecetbd = "No", isCrashEdit = "No", isrecut = "No", isFieldEditing = "No", isCraftEditBrollTeasesVosSOTS = "No",
            AdditionalRequirements = "", AMMusic = "No", AMGraphicStills = "No", AMColorCorrect = "No", AMAudioCorrect="No",
            AMEffects = "No", AMOther = "No", AMAllOfTheAbove = "No", AROtherText = "";
        var editStatus = "EditCraft";
        if ($('#edr-Piecetbd').is(':checked')) {
            piecetbd = "Yes"
        }
        if ($('#edr-IsCrashEdit').is(':checked')) {
            isCrashEdit = "Yes"
        }
        if ($('#edr-Isrecut').is(':checked')) {
            isrecut = "Yes"
        }
        if ($('#edr-IsFieldEditing').is(':checked')) {
            isFieldEditing = "Yes"
        }
        if ($('#edr-IsCraftEditBrollTeasesVosSOTS').is(':checked')) {
            isCraftEditBrollTeasesVosSOTS = "Yes"
        }
        if ($('[name="AdditionalRequirements"]:eq(0)').is(':checked')) {
            AMMusic = "Yes"
        }
        if ($('[name="AdditionalRequirements"]:eq(1)').is(':checked')) {
            AMGraphicStills = "Yes"
        }
        if ($('[name="AdditionalRequirements"]:eq(2)').is(':checked')) {
            AMColorCorrect = "Yes"
        }
        if ($('[name="AdditionalRequirements"]:eq(3)').is(':checked')) {
            AMAudioCorrect = "Yes"
        }
        if ($('[name="AdditionalRequirements"]:eq(4)').is(':checked')) {
            AMEffects = "Yes"
        }
        if ($('[name="AdditionalRequirements"]:eq(5)').is(':checked')) {
            AMOther = "Yes";
            AROtherText = $('.other-textarea.active').val();
        }
        if ($('[name="AdditionalRequirements"]:eq(6)').is(':checked')) {
            AMAllOfTheAbove = "Yes"
        }
        //$.each($("input[name='AdditionalRequirements']:checked"), function (ind, val) {
        //    if (ind == 0) {
        //        AdditionalRequirements += $(this).next().text();
        //    }
        //    else {
        //        AdditionalRequirements += "," + $(this).next().text();
        //    }
        //})
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
            }
        })

        if ($('#edr-Craft-page span[title="Next"]').text() === "Submit") {
            editStatus = "FormSubmit";
        }

        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            PleceMinutes: $('#edr-PieceMinutes').val(),
            PleceSeconds: $('#edr-PieceSeconds').val(),
            PleceTBD: piecetbd,
            PleceVersions: $('#edr-PieceVersions').val(),
            CraftEditDays: $('#edr-craftDays').val(),
            CraftEditHours: $('#edr-craftHours').val(),
            CraftEditMinutes: $('#edr-craftMinutes').val(),
            EditStartDate: $('.edr-summary-startdate').val(),
            RequestedEditSection: $('#edr-RequestedEditSection').val(),
            IsCrashEdit: isCrashEdit,
            Isrecut: isrecut,
            IsFieldEditing: isFieldEditing,
            IsCraftEditBrollTeasesVosSOTS: isCraftEditBrollTeasesVosSOTS,
            //AdditionalRequirements: AdditionalRequirements,
            AMMusic: AMMusic,
            AMGraphicStills: AMGraphicStills,
            AMColorCorrect: AMColorCorrect,
            AMAudioCorrect: AMAudioCorrect,
            AMEffects: AMEffects,
            AMOther: AMOther,
            AMAllOfTheAbove: AMAllOfTheAbove,
            AROtherText: AROtherText,
            SourceMaterial: SourceMaterial,
            SourceMaterialOther:SourceMaterialOther,
            ERCREditedBy: $('#craft-editby-recutweb').val(),
            ERCEBrollHowMany: $('#craft-edr-howmany').val(),
            CraftEditComments: $('#edr-CraftEditComments').val(),
            EditStatus: editStatus
        };
        if (data.EditStatus === "FormSubmit") {
            data.EditRequestID = NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.saveID);
        }
        return data;
    }

    this.saveItem = function () {
        var data = collectData();
        //var savedata = NBCU.EditRequest.Helper.addItem(data, 'EditRequest');
        //NBCU.EditRequest.Helper.saveID = savedata.d.Id;
        NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.saveID);
        if ($('#edr-Craft-page span[title="Next"]').text() == "Next") {
            NBCU.EditRequest.Master.redirectPage("EditProducer");
        }
        else if ($('#edr-Craft-page span[title="Next"]').text() == "Submit") {
            //NBCU.EditRequest.Helper.sendEmail(NBCU.EditRequest.Helper.saveID);
            $('.edrNav li:eq(0)').addClass('active');
            $('.edrNav li:eq(1)').addClass('active');
            $('#thanksScreen').show();

        }
    }

    /* ------------- Init ------------------------ */

    this.Init = function () {
        var checkMsnbc = false;
        $.each($(".edr-summary-showunit"), function (ind, val) {
            var showUnit_Value = $(val).val().toUpperCase();
            if (showUnit_Value.indexOf('MSNBC') != -1) {
                checkMsnbc = true;
            }
        });
        if (checkMsnbc) {
            $('.box-edr-Sourcematerial-checkbox').show();
        }
        else {
            $('.box-edr-Sourcematerial-checkbox').hide();
        }
        if ($('#edr-summary-CraftProducer').val() != "Yes") {
            $('#edr-Craft-page span[title="Next"]').text('Submit')
        }
        else {
            $('#edr-Craft-page span[title="Next"]').text('Next')
        }
        $('#edr-Craft-page span[title="Next"]').unbind('click');
        $('#edr-Craft-page span[title="Next"]').bind('click', this.saveItem);

        $("#edr-PieceMinutes, #edr-PieceSeconds, #edr-craftMinutes").keydown(function () {
            //$(this).limitkeypress({ rexp: /^(\d|0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/ });
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $("#edr-PieceVersions, #edr-craftDays, #edr-craftHours, #craft-edr-howmany").keydown(function () {
            $(this).limitkeypress({ rexp: /^\d{0,10}$/ });
        });

        $('#edr-Piecetbd').change(function () {
            if ($(this).is(":checked")) {
                $('#edr-PieceMinutes').val("");
                $('#edr-PieceSeconds').val("");
            }
        });

        $('#edr-PieceMinutes, #edr-PieceSeconds').change(function () {
            $('#edr-Piecetbd').prop('checked', false);
        });

        $("input[name='AdditionalRequirements']").change(function () {
            if ($(this).next().text() == "All of the Above") {
                if ($(this).is(":checked")) {
                    $("input[name='AdditionalRequirements']").prop('checked', true)
                    $("input[name='AdditionalRequirements']:eq(5)").next().next().addClass('active');
                }
                else {
                    $("input[name='AdditionalRequirements']").prop('checked', false)
                    $("input[name='AdditionalRequirements']:eq(5)").next().next().removeClass('active');
                    $("input[name='AdditionalRequirements']:eq(5)").next().next().val('');
                }
            }
            else {
                $("input[name='AdditionalRequirements']:eq(6)").prop('checked', false)
            }
        });

        $('#edr-Isrecut').change(function () {
            if ($(this).is(':checked')) {
                $('.show-check-editedby').show();
            }
            else {
                $('.show-check-editedby').hide();
            }
        });

        $('#edr-IsCraftEditBrollTeasesVosSOTS').change(function () {
            if ($(this).is(':checked')) {
                $('.show-howmany').show();
            }
            else {
                $('.show-howmany').hide();
            }
        });

        $('input[name="AdditionalRequirements"]:eq(5)').change(function () {
            if ($(this).is(":checked")) {
                $('input[name="AdditionalRequirements"]:eq(5)').prop('checked', true)
                $(this).next().next().addClass('active');
                $(this).next().next().val('');
            }
            else {
                $(this).next().next().removeClass('active')
                $(this).next().next().val('');
            }
        });

        $('input[name="Sourcematerial"]:eq(6)').change(function () {
            if ($(this).is(":checked")) {
                $('input[name="Sourcematerial"]:eq(6)').prop('checked', true)
                $(this).next().next().addClass('active');
                $("input[name='Sourcematerial']:eq(6)").next().next().val('');
            }
            else {
                $(this).next().next().removeClass('active');
                $("input[name='Sourcematerial']:eq(6)").next().next().val('');
            }
        });
        $("input[name='Sourcematerial']").change(function () {
            if ($(this).next().text() == "All of the Above") {
                if ($(this).is(":checked")) {
                    $("input[name='Sourcematerial']").prop('checked', true)
                    $("input[name='Sourcematerial']:eq(6)").next().next().addClass('active');
                }
                else {
                    $("input[name='Sourcematerial']").prop('checked', false)
                    $("input[name='Sourcematerial']:eq(6)").next().next().removeClass('active');
                    $("input[name='Sourcematerial']:eq(6)").next().next().val('');
                }
            }
            else {
                $("input[name='Sourcematerial']:eq(7)").prop('checked', false)
            }
        });
    }
}

NBCU.EditRequest.EditCraft.prototype.PostBack = false;