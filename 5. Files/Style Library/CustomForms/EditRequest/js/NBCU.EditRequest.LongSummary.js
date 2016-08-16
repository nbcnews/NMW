
NBCU.EditRequest.LongSummary = function () {

    function AppendLocation() {
        var locationData = NBCU.EditRequest.Helper.ReadList("", "LocationOfEdit", "?select=Title,ID");
        if ($('#edr-LNGF-summary-location-edit').val() === "") {
            $('#edr-LNGF-summary-location-edit').find('option:not(:first)').remove();
            $.each(locationData, function (index, data) {
                $('#edr-LNGF-summary-location-edit').append('<option id="' + data.ID + '">' + data.Title + '</option>');
            });
        }
    }

    function returnKeyProducer() {
        var returnVal = "";
        if ($('#edr-LNGF-summary-producerasrequestor').val() == "Yes") {
            returnVal = NBCU.EditRequest.Helper.requestorKey + ";";
        }
        else {
            $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProduceredr_LNGFDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
                returnVal += val.Key + ";";
            })
        }
        return returnVal;
    }

    function returnKeySeniorProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerSeniorProduceredr_LNGFDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            returnVal += val.Key + ";";
        })
        return returnVal
    }

    function returnKeyAssistantProducer() {
        var returnVal = "";
        if ($('#edr-LNGF-summary-assproducerasrequestor').val() == "Yes") {
            returnVal = NBCU.EditRequest.Helper.requestorKey + ";";
        }
        else {
            $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerassistantProduceredr_LNGFDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
                returnVal += val.Key + ";";
            })
        }
        return returnVal;
    }

    function collectData() {
        var airdatetbd = "No", editStatus = "LongSummary";
        if ($('#edr-LNGF-airdate').is(':checked')) {
            airdatetbd = "Yes"
        }
        if ($('#edr-LNGF-Summary-page span[title="Next"]').text() == "Submit") {
            editStatus = "FormSubmit";
        }
        var data = {
            __metadata: { 'type': 'SP.Data.EditRequestListItem' },
            RequestorName: $('.display-data1-edr-LNGF-summary-signin').text(),
            Title: $('.display-data1-edr-LNGF-summary-signin').text(),
            RequestorContact: ($('#edr-LNGF-summary-contact').next().text().trim() == "") ? $('#edr-LNGF-summary-contact').val().trim() : $('#edr-LNGF-summary-contact').next().text().trim(),
            RequestorEmail: ($('#edr-LNGF-summary-email').next().text().trim() == "") ? $('#edr-LNGF-summary-email').val().trim() : $('#edr-LNGF-summary-email').next().text().trim(),
            IsRequestorProducer: $('#edr-LNGF-summary-producerasrequestor').val().trim(),
            ProducerName: $('#peoplePickerProduceredr_LNGFDiv_TopSpan  span.ms-entity-resolved').text().trim(),
            SeniorProducer: $('#peoplePickerSeniorProduceredr_LNGFDiv span.ms-entity-resolved').text().trim(),
            AssistantProducerAsRequestor: $('#edr-LNGF-summary-assproducerasrequestor').val(),
            AssistantProducer: $('#peoplePickerassistantProduceredr_LNGFDiv_TopSpan  span.ms-entity-resolved').text().trim(),
            Slug: $('#edr-LNGF-summary-slug').val().trim(), //producerName,
            AirDate: $('#edr-LNGF-summary-txtairdate').val().trim(),
            AirDateTBD: airdatetbd,
            Business: $('#edr-LNGF-summary-business').val(),
            ShowUnit: $('#edr-LNGF-summary-showunit').val().trim(),
            BudgetCode: $('#edr-LNGF-summary-budgetcode_0').val().trim(),
            IsCraftEditorNeeded: $('#edr-LGNF-CDR').val().trim(),
            IsProducerEditCompleted: $('#edr-LGNF-PDR').val().trim(),
            IsAssistantProducerEditRequired: $('#edr-LGNF-APDR').val().trim(),
            //fileIngestID: $('#edr-LNGF-summary-attachfield').val().trim(),
            EditStatus: editStatus,
            EditType: "Long Form Edit Request",
            requestorKey: NBCU.EditRequest.Helper.requestorKey,
            producerKey: returnKeyProducer(),
            SeniorProducerKey: returnKeySeniorProducer(),
            AssistantProducerKey: returnKeyAssistantProducer(),
            LocationofEdit: $('#edr-LNGF-summary-location-edit').val().trim()
        };
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
        if ($('#edr-LNGF-summary-contact').val() == "" && $('#edr-LNGF-summary-contact').next().text() == "") {
            $('#edr-LNGF-summary-contact').next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-LNGF-summary-contact').next().next().hide();
        }
        if ($('#edr-LNGF-summary-contact').val().length <= 10) {
            $('#edr-LNGF-summary-contact').next().next().hide();
            $('#edr-LNGF-summary-contact').next().next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-LNGF-summary-contact').next().next().next().hide();
        }
        if ($('#edr-LNGF-summary-email').val() != "") {
            if (!validateEmail($('#edr-LNGF-summary-email').val())) {
                $('#edr-LNGF-summary-email').next().next().show();
                valid = false;
            }
            else {
                valid = (valid == true) ? true : false;
                $('#edr-LNGF-summary-email').next().next().hide();
            }
        }
        if ($('#peoplePickerProduceredr_LNGFDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerProduceredr_LNGFDiv').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#peoplePickerProduceredr_LNGFDiv').next().hide();
        }
        if ($('#peoplePickerSeniorProduceredr_LNGFDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerSeniorProduceredr_LNGFDiv').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#peoplePickerSeniorProduceredr_LNGFDiv').next().hide();
        }
        if ($('#peoplePickerassistantProduceredr_LNGFDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerassistantProduceredr_LNGFDiv').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#peoplePickerassistantProduceredr_LNGFDiv').next().hide();
        }

        if ($('#edr-LGNF-CDR').val() == "") {
            $('#edr-LGNF-CDR').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-LGNF-CDR').next().hide();
        }
        if ($('#edr-LNGF-summary-location-edit').val() == "") {
            $('#edr-LNGF-summary-location-edit').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-LNGF-summary-location-edit').next().hide();
        }

        if ($('#edr-LGNF-PDR').val() == "") {
            $('#edr-LGNF-PDR').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-LGNF-PDR').next().hide();
        }

        if ($('#edr-LGNF-APDR').val() == "") {
            $('#edr-LGNF-APDR').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#edr-LGNF-APDR').next().hide();
        }

        valid = validTextbox($('#edr-LNGF-summary-slug'));
        valid = validTextbox($('#edr-LNGF-summary-business'));
        valid = validTextbox($('#edr-LNGF-summary-showunit'));
        //valid = validTextbox($('#edr-LNGF-summary-budgetcode_0'));
        if ($('#edr-LNGF-Summary-page .valid-msg-error').is(":visible")) {
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
            if (NBCU.EditRequest.Helper.lfSaveID == 0) {
                var savedata = NBCU.EditRequest.Helper.addItem(data, 'EditRequest');
                NBCU.EditRequest.Helper.lfSaveID = savedata.d.Id;
            }
            else {
                NBCU.EditRequest.Helper.updateItem(data, 'EditRequest', NBCU.EditRequest.Helper.lfSaveID);
            }
            if (data.EditStatus === "FormSubmit" && NBCU.EditRequest.Helper.lfSaveID !== 0 && NBCU.EditRequest.Helper.lfSaveID !== null) {
                var updateData = {
                    __metadata: { 'type': 'SP.Data.EditRequestListItem' },
                    EditRequestID: NBCU.EditRequest.Helper.getCrewRequestID(NBCU.EditRequest.Helper.lfSaveID),
                };
                NBCU.EditRequest.Helper.updateItem(updateData, 'EditRequest', NBCU.EditRequest.Helper.lfSaveID);

                //NBCU.EditRequest.Helper.sendEmail(NBCU.EditRequest.Helper.lfSaveID);
            }
            if ($('#edr-LGNF-CDR').val() == "Yes") {
                NBCU.EditRequest.Master.redirectPage("LongCraft");
            }
            else if ($('#edr-LGNF-PDR').val() == "Yes") {
                NBCU.EditRequest.Master.redirectPage("LongProducer");
            }
            else if ($('#edr-LGNF-APDR').val() == "Yes") {
                NBCU.EditRequest.Master.redirectPage("LongEditor");
            }
            else {
                NBCU.EditRequest.Master.redirectPage("LongSubmit");
            }
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {

        //if (NBCU.EditRequest.Helper.business.length == 0) {
        //    NBCU.EditRequest.Helper.business = NBCU.EditRequest.Helper.ReadList("", "Business", "?select=Title,ID");
        //    var finalDataBusiness = $.map(NBCU.EditRequest.Helper.business, function (item) {
        //        return {
        //            label: item.Title,
        //            value: item.Title
        //        }
        //    });
        //    $("#edr-LNGF-summary-business").autocomplete({
        //        source: finalDataBusiness,
        //        width: 300,
        //        //height:25,
        //        max: 20,
        //        delay: 100,
        //        minLength: 1,
        //        autoFocus: true,
        //        cacheLength: 1,
        //        scroll: true,
        //        highlight: false,
        //        select: function (event, ui) {
        //            $(this).val(ui.item.Title);
        //        }
        //    });
        //}

        AppendLocation();

        if ($('#edr-LGNF-CDR').val() != "Yes" && $('#edr-LGNF-PDR').val() != "Yes" && $('#edr-LGNF-APDR').val() !== "Yes") {
            $('#edr-LNGF-Summary-page span[title="Next"]').text("Submit");
        }
        else {
            $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
        }

        $('#edr-LNGF-Summary-page span[title="Next"]').unbind('click');
        $('#edr-LNGF-Summary-page span[title="Next"]').bind('click', this.saveItem);

        $('#edr-LGNF-CDR').change(function () {
            if ($(this).val() == "Yes") {
                $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                $('.edrLNGFNav li:eq(1)').removeClass('navi-disable');
            }
            else {
                if ($('#edr-LGNF-PDR').val() == "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                    $('.edrLNGFNav li:eq(1)').addClass('navi-disable');
                }
                else if ($('#edr-LGNF-APDR').val() == "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                    $('.edrLNGFNav li:eq(1)').addClass('navi-disable');
                }
                else if ($(this).val() != "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Submit");
                    $('.edrLNGFNav li:eq(1)').addClass('navi-disable');
                }
            }
        });

        $('#edr-LGNF-PDR').change(function () {
            if ($(this).val() == "Yes") {
                $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                $('.edrLNGFNav li:eq(2)').removeClass('navi-disable');
            }
            else {
                if ($('#edr-LGNF-CDR').val() == "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                    $('.edrLNGFNav li:eq(2)').addClass('navi-disable');
                }
                else if ($('#edr-LGNF-APDR').val() == "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                    $('.edrLNGFNav li:eq(2)').addClass('navi-disable');
                }
                else if ($(this).val() != "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Submit");
                    $('.edrLNGFNav li:eq(2)').addClass('navi-disable');
                }
            }
        });

        $('#edr-LGNF-APDR').change(function () {
            if ($(this).val() == "Yes") {
                $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                $('.edrLNGFNav li:eq(3)').removeClass('navi-disable');
            }
            else {
                if ($('#edr-LGNF-CDR').val() == "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                    $('.edrLNGFNav li:eq(3)').addClass('navi-disable');
                }
                else if ($('#edr-LGNF-PDR').val() == "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Next");
                    $('.edrLNGFNav li:eq(3)').addClass('navi-disable');
                }
                else if ($(this).val() != "Yes") {
                    $('#edr-LNGF-Summary-page span[title="Next"]').text("Submit");
                    $('.edrLNGFNav li:eq(3)').addClass('navi-disable');
                }
            }
        });        

        $('#edr-LNGF-airdate').change(function () {
            $('.LNGF-summary-txtairdate').val("")
        });

        $('#edr-LNGF-summary-producerasrequestor').change(function () {
            if ($(this).val() == "Yes") {
                NBCU.EditRequest.Helper.initializePeoplePickerValue('peoplePickerProduceredr_LNGFDiv', $('.display-data1-edr-LNGF-summary-signin').text());
                $('#peoplePickerProduceredr_LNGFDiv').hide();
                $('#LFProduceredr').text($('.display-data1-edr-LNGF-summary-signin').text());
                $('#LFProduceredr').show();
            }
            else {
                $('#peoplePickerProduceredr_LNGFDiv').show();
                $('#LFProduceredr').text('');
                $('#LFProduceredr').hide();
                NBCU.EditRequest.Helper.clearPeoplePicker('peoplePickerProduceredr_LNGFDiv');
            }
        });

        $('#edr-LNGF-summary-assproducerasrequestor').change(function () {
            if ($(this).val() == "Yes") {
                NBCU.EditRequest.Helper.initializePeoplePickerValue('peoplePickerassistantProduceredr_LNGFDiv', $('.display-data1-edr-LNGF-summary-signin').text());
                $('#peoplePickerassistantProduceredr_LNGFDiv').hide();
                $('#LFAssistantProducer').text($('.display-data1-edr-LNGF-summary-signin').text());
                $('#LFAssistantProducer').show();
            }
            else {
                $('#peoplePickerassistantProduceredr_LNGFDiv').show();
                $('#LFAssistantProducer').text('');
                $('#LFAssistantProducer').hide();
                NBCU.EditRequest.Helper.clearPeoplePicker('peoplePickerassistantProduceredr_LNGFDiv');
            }
        });

    }
}

NBCU.EditRequest.LongSummary.prototype.PostBack = false;