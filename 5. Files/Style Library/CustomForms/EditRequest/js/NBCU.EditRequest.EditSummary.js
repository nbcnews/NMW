var storyData = [];
NBCU.EditRequest.EditSummary = function () {

    function returnKeyProducer() {
        var returnVal = "";
        if ($('#edr-summary-producerasrequestor').val() == "Yes") {
            returnVal = NBCU.EditRequest.Helper.requestorKey + ";";
        }
        else {
            $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerEDRDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
                returnVal += val.Key + ";";
            })
        }
        return returnVal;
    }

    function returnKeySeniorProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerApproverEDRDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            returnVal += val.Key + ";";
        })
        return returnVal
    }

    /* ------------- Init ------------------------ */

    function collectData() {
        var airdatetbd = "No"; editStatus = "EditSummary"
        if ($('#edr-summary-airdateTBD').is(':checked')) {
            airdatetbd = "Yes"
        }
        if ($('#edr-Summary-page span[title="Next"]').text() === "Submit") {
            editStatus = "FormSubmit";
        }
        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            RequestorName: $('#edr-summary-requester').text().trim(),
            Title: $('#edr-summary-requester').text().trim(),
            RequestorContact: ($('#edr-summary-contact').next().text().trim() == "") ? $('#edr-summary-contact').val().trim() : $('#edr-summary-contact').next().text().trim(),
            RequestorEmail: ($('#edr-summary-email').next().text().trim() == "") ? $('#edr-summary-email').val().trim() : $('#edr-summary-email').next().text().trim(),
            IsRequestorProducer: $('#edr-summary-producerasrequestor').val().trim(),
            ProducerName: $('#peoplePickerProducerEDRDiv_TopSpan  span.ms-entity-resolved').text().trim(),
            SeniorProducer: $('#peoplePickerApproverEDRDiv_TopSpan span.ms-entity-resolved').text().trim(),
            Slug: $('#edr-summary-slug').val().trim(), //producerName,
            AirDate: $('#edr-summary-txtairdate').val().trim(),
            AirDateTBD: airdatetbd,
            LocationofEdit: $('#edr-summary-location-edit').val().trim(), //approverName,
            //ShowUnit: $('#edr-summary-showunit').val().trim(),
            //BudgetCode: $('#edr-summary-budgetcode_0').val().trim(),
            Correspondent: $('#edr-summary-correspondent').val().trim(),
            StoryName: $('#edr-summary-storyname').val(),
            AttachCrewRequestID:$('#edr-summary-attachcrewID').val(),
            IsCraftEditorNeeded: $('#edr-summary-CraftEditor').val().trim(),
            IsProducerEditCompleted: $('#edr-summary-CraftProducer').val().trim(),
            EditStatus: editStatus,
            EditType: "Edit Request",
            requestorKey: NBCU.EditRequest.Helper.requestorKey,
            producerKey:returnKeyProducer(),
            SeniorProducerKey: returnKeySeniorProducer()
        };
        if (NBCU.EditRequest.Helper.network.length > 0) {
            data.Network = NBCU.EditRequest.Helper.network.join(';')
        }
        return data;
    }

    function validTextbox(element) {
        var valid = true;
        if (element.val() == "") {
            element.next().show();
            valid = false;
        }
        else {
            element.next().hide();
            valid = true;
        }
        return valid;
    }

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    function validation() {
        var valid = true;
        if ($('#edr-summary-contact').val() == "" && $('#edr-summary-contact').next().text() == "") {
            $('#edr-summary-contact').next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-summary-contact').next().next().hide();
        }
        if ($('#edr-summary-contact').val().length <= 10) {
            $('#edr-summary-contact').next().next().hide();
            $('#edr-summary-contact').next().next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-summary-contact').next().next().next().hide();
        }
        if ($('#edr-summary-email').val() != "") {
            if (!validateEmail($('#edr-summary-email').val())) {
                $('#edr-summary-email').next().next().show();
                valid = false;
            }
            else {
                valid = (valid == true) ? true : false;
                $('#edr-summary-email').next().next().hide();
            }
        }
        if ($('#peoplePickerProducerEDRDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerProducerEDRDiv').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#peoplePickerProducerEDRDiv').next().hide();
        }        
        if ($('#peoplePickerApproverEDRDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerApproverEDRDiv').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#peoplePickerApproverEDRDiv').next().hide();
        }
        if ($('#edr-summary-location-edit').val() == "") {
            $('#edr-summary-location-edit').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-summary-location-edit').next().hide();
        }

        if ($('#edr-summary-CraftEditor').val() == "") {
            $('#edr-summary-CraftEditor').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-summary-CraftEditor').next().hide();
        }

        if ($('#edr-summary-CraftProducer').val() == "") {
            $('#edr-summary-CraftProducer').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-summary-CraftProducer').next().hide();
        }

        valid = validTextbox($('#edr-summary-slug'));
        //valid = validTextbox($('#edr-summary-showunit'));
        //valid = validTextbox($('#edr-summary-budgetcode_0'));
        $.each($('.edr-summary-showunit'), function (ind, val) {
            valid = validTextbox($(this));
        });
        //$.each($('.edr-summary-budgetcode'), function (ind, val) {
        //    valid = validTextbox($(this));
        //});
        if ($('#edr-Summary-page .valid-msg-error').is(":visible")) {
            valid = false;
        }
        if ($('.sp-peoplepicker-errorMsg').is(':visible')) {
            valid = false;
        }
        return valid;
    }

    this.saveItem = function () {
        if (validation()) {
            var data = collectData();
            NBCU.EditRequest.Helper.network = [];
            if (NBCU.EditRequest.Helper.saveID == 0) {
                var savedata = NBCU.EditRequest.Helper.addItem(data, 'EditRequest');
                NBCU.EditRequest.Helper.saveID = savedata.d.Id;
                $.each($('.edr-summary-form-group-show-unit'), function (ind, val) {
                    var showunit_data = {
                        __metadata: { 'type': 'SP.Data.ER_x005f_ShowUnitListItem' },
                        Title: $(this).children().find('input').val(),
                        RequestID: NBCU.EditRequest.Helper.saveID.toString(),
                        ShowUnitID: $(this).children().find('input').val(),
                        AssignedBudgetCode: $(this).next().children().find('input').val()
                    };
                    NBCU.EditRequest.Helper.addItem(showunit_data, 'ER_ShowUnit');
                    var networkData = $(this).children().find('input').attr('network');
                    if (networkData !== "" && NBCU.EditRequest.Helper.network.indexOf(networkData) === -1) {
                        NBCU.EditRequest.Helper.network.push(networkData);
                    }
                });
            }
            else {
                NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.saveID);
                var er_ShowUnit = NBCU.EditRequest.Helper.ReadList("", "ER_ShowUnit", "?select=ID,RequestID&$filter=RequestID eq'" + NBCU.EditRequest.Helper.saveID.toString() + "'");
                $.each(er_ShowUnit, function (ind, val) {
                    NBCU.EditRequest.Helper.deleteItem(data, 'ER_ShowUnit', val.ID);
                });
                $.each($('.edr-summary-form-group-show-unit'), function (ind, val) {
                    var showunit_data = {
                        __metadata: { 'type': 'SP.Data.ER_x005f_ShowUnitListItem' },
                        Title: $(this).children().find('input').val(),
                        RequestID: NBCU.EditRequest.Helper.saveID.toString(),
                        ShowUnitID: $(this).children().find('input').val(),
                        AssignedBudgetCode: $(this).next().children().find('input').val()
                    };
                    NBCU.EditRequest.Helper.addItem(showunit_data, 'ER_ShowUnit');
                    var networkData = $(this).children().find('input').attr('network');
                    if (networkData !== "" && NBCU.EditRequest.Helper.network.indexOf(networkData) === -1) {
                        NBCU.EditRequest.Helper.network.push(networkData);
                    }
                });
            }

            if (NBCU.EditRequest.Helper.network.length > 0) {
                var updateData = {
                    __metadata: { 'type': 'SP.Data.EditRequestListItem' },
                    Network: NBCU.EditRequest.Helper.network.join(', ')
                };
                NBCU.EditRequest.Helper.updateItem(updateData, 'EditRequest', NBCU.EditRequest.Helper.saveID);
            }

            if (data.EditStatus === "FormSubmit" && NBCU.EditRequest.Helper.saveID !== 0 && NBCU.EditRequest.Helper.saveID !== null) {
                var updateData = {
                    __metadata: { 'type': 'SP.Data.EditRequestListItem' },
                    EditRequestID: NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.saveID),
                };
                NBCU.EditRequest.Helper.updateItem(updateData, 'EditRequest', NBCU.EditRequest.Helper.saveID);

                //NBCU.EditRequest.Helper.sendEmail(NBCU.EditRequest.Helper.saveID);
            }
            if ($('#edr-Summary-page span[title="Next"]').text() == "Next") {
                if ($('#edr-summary-CraftEditor').val() == "Yes") {
                    NBCU.EditRequest.Master.redirectPage("EditCraft");
                }
                else {
                    NBCU.EditRequest.Master.redirectPage("EditProducer");
                }
            }
            else if ($('#edr-Summary-page span[title="Next"]').text() == "Submit") {
                $('.edrNav li:eq(0)').addClass('active');
                $('#thanksScreen').show();
            }
        }
    }

    this.Init = function () {
        
        if (NBCU.EditRequest.Helper.LocationOfEdit.length == 0) {
            NBCU.EditRequest.Helper.LocationOfEdit = NBCU.EditRequest.Helper.ReadList("", "LocationOfEdit", "?select=Title,ID");
            $('#edr-summary-location-edit').find('option:not(:first)').remove();
            $.each(NBCU.EditRequest.Helper.LocationOfEdit, function (index, data) {
                $('#edr-summary-location-edit').append('<option id="' + data.ID + '">' + data.Title + '</option>');
            });
        }       

        if ($('#edr-summary-CraftEditor').val() != "Yes") {
            $('#edr-Summary-page span[title="Next"]').text('Submit');
        }
        else {
            $('#edr-Summary-page span[title="Next"]').text('Next');
        }

        $('#edr-Summary-page span[title="Next"]').unbind('click');
        $('#edr-Summary-page span[title="Next"]').bind('click', this.saveItem);

        $('#edr-summary-CraftEditor').change(function () {
            if ($(this).val() == "Yes") {
                $('#edr-Summary-page span[title="Next"]').text('Next');
                $('.edrNav li:eq(1)').removeClass('navi-disable');
            }
            else {
                if ($('#edr-summary-CraftProducer').val() == "Yes") {
                    $('#edr-Summary-page span[title="Next"]').text('Next');
                    $('.edrNav li:eq(1)').addClass('navi-disable');
                }
                else {
                    $('#edr-Summary-page span[title="Next"]').text('Submit');
                    $('.edrNav li:eq(1)').addClass('navi-disable');
                }
            }
        });

        $('#edr-summary-CraftProducer').change(function () {
            if ($(this).val() == "Yes") {
                $('#edr-Summary-page span[title="Next"]').text('Next');
                $('.edrNav li:eq(2)').removeClass('navi-disable');
            }
            else {
                if ($('#edr-summary-CraftEditor').val() == "Yes") {
                    $('#edr-Summary-page span[title="Next"]').text('Next');
                    $('.edrNav li:eq(2)').addClass('navi-disable');
                }
                else {
                    $('#edr-Summary-page span[title="Next"]').text('Submit');
                    $('.edrNav li:eq(2)').addClass('navi-disable');
                }
            }
        });

        $('#edr-summary-producerasrequestor').change(function () {
            if ($(this).val() == "Yes") {
                $('#ERProducer').show().text($('#edr-summary-requester').text());
                NBCU.EditRequest.Helper.initializePeoplePickerValue('peoplePickerProducerEDRDiv', $('#edr-summary-requester').text());
                $('#peoplePickerProducerEDRDiv').hide();
            }
            else {
                $('#ERProducer').hide().text("");
                $('#peoplePickerProducerEDRDiv').show();
                NBCU.EditRequest.Helper.clearPeoplePicker('peoplePickerProducerEDRDiv');
            }
        });

        $('#edr-summary-airdateTBD').change(function () {
            if ($(this).is(":checked")) {
                $('#edr-summary-txtairdate').val("");
            }
        });

        $('.button-budgetcode').unbind("click");
        $('.button-budgetcode').click(function () {
            var elements = '<div class="cols cols-6  edr-summary-form-group-show-unit">' +
                                        '<label class="label label-display"> Show Unit <sup class="mandatory">*</sup> </label>' +
                                        '<div class="display-dataform-new display-dataform-edr-summary-showunit">' +
                                            '<input class="selectbox ui-autocomplete-input edr-summary-showunit" autocomplete="off" network="">' +
                                            '<div class="valid-msg valid-msg-error" style="display: none;">Please complete the required field</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="cols cols-6  edr-summary-form-group-budget-code">' +
                                        //'<label class="label label-display"> Budget Code <sup class="mandatory">*</sup> </label>' +
                                        '<label class="label label-display"> Budget Code </label>' +
                                        '<div class="display-dataform-new display-dataform-edr-summary-budgetcode">' +
                                            '<input class="selectbox edr-summary-budgetcode" type="text">' +
                                            '<div class="valid-msg valid-msg-error" style="display: none;">Please complete the required field</div>' +
                                        '</div>' +
                                    '</div><div class="edit-remove-BC">remove</div>';
            $(this).before(elements);
        });

        $(document).on("click", ".edit-remove-BC", function () {
            $(this).prev().remove();
            $(this).prev().remove();
            $(this).remove();
        });
    }
}

NBCU.EditRequest.EditSummary.prototype.PostBack = false;