NBCU.FileIngest.Summary = function () {

    function returnKeyProducer() {
        var returnVal = "";
        if ($('#FLN-summary-producerasrequestor').val() == "Yes") {
            returnVal = NBCU.FileIngest.Helper.requestorKey + ";";
        }
        else {
            $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerProducerFLNDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
                returnVal += val.Key + ";";
            })
        }
        return returnVal;
    }

    function returnKeySeniorProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerApproverFLNDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            returnVal += val.Key + ";";
        })
        return returnVal
    }

    function collectData() {
        var airdatetbd = "No";
        var dateNeededByASAP = "No";
        if ($('#FLN-airdateTBD').is(':checked')) {
            airdatetbd = "Yes"
        }
        if ($('#FLN-summary-asap').is(':checked')) {
            dateNeededByASAP = "Yes"
        }
        var data = {
            __metadata: { 'type': 'SP.Data.FileIngestListItem' },
            RequestorName: $('#FLN-summary-requester').text().trim(),
            Title: $('#FLN-summary-requester').text().trim(),
            RequestorContact: ($('#FLN-summary-contact').next().text().trim() == "") ? $('#FLN-summary-contact').val().trim() : $('#FLN-summary-contact').next().text().trim(),
            RequestorEmail: ($('#FLN-summary-email').next().text().trim() == "") ? $('#FLN-summary-email').val().trim() : $('#FLN-summary-email').next().text().trim(),
            IsRequestorProducer: $('#FLN-summary-producerasrequestor').val().trim(),
            ProducerName: $('#peoplePickerProducerFLNDiv_TopSpan  span.ms-entity-resolved').text().trim(),
            SeniorProducer: $('#peoplePickerApproverFLNDiv_TopSpan span.ms-entity-resolved').text().trim(),
            Slug: $('#FLN-summary-slug').val().trim(), //producerName,
            AirDate: $('#FLN-summary-txtairdate').val().trim(),
            AirDateTBD: airdatetbd,
            DateNeededBy: $('#FLN-dateneed-txtairdate').val().trim(), //approverName,
            DateNeededByASAP: dateNeededByASAP,
            Workgroup: $('.FLN-summary-WorkGroup').val(),
            Correspondent: $('#edr-summary-correspondent').val(),
            AttachEditRequestID: $('#FLN-summary-attachcrewID').val().trim(),
            IngestStatus: "Summary",
            FileIngestID: NBCU.FileIngest.Helper.getFileIngestID(NBCU.FileIngest.Helper.saveID),
            ShowUnit: $('.FLN-summary-showunit').val(),
            BudgetCode: $('.FLN-summary-budgetcode').val(),
            RequestorKey: NBCU.FileIngest.Helper.requestorKey,
            producerKey: returnKeyProducer(),
            SeniorProducerKey: returnKeySeniorProducer()
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
        if ($('#FLN-summary-contact').val() == "" && $('#FLN-summary-contact').next().text() == "") {
            $('#FLN-summary-contact').next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#FLN-summary-contact').next().next().hide();
        }
        if ($('#FLN-summary-contact').val().length <= 10) {
            $('#FLN-summary-contact').next().next().hide();
            $('#FLN-summary-contact').next().next().next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#FLN-summary-contact').next().next().next().hide();
        }
        if ($('#FLN-summary-email').val() != "") {
            if (!validateEmail($('#FLN-summary-email').val())) {
                $('#FLN-summary-email').next().next().show();
                valid = false;
            }
            else {
                valid = (valid == true) ? true : false;
                $('#FLN-summary-email').next().next().hide();
            }
        }
        if ($('#peoplePickerProducerFLNDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerProducerFLNDiv').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#peoplePickerProducerFLNDiv').next().hide();
        }
        if ($('#peoplePickerApproverFLNDiv_TopSpan span.ms-entity-resolved').text() == "") {
            $('#peoplePickerApproverFLNDiv').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('#peoplePickerApproverFLNDiv').next().hide();
        }
        
        valid = validTextbox($('#FLN-summary-slug'));
        if ($('.FLN-summary-WorkGroup').val() == "") {
            $('.FLN-summary-WorkGroup').next().show();
            valid = false;
        }
        else {
            valid = (valid == true) ? true : false;
            $('.FLN-summary-WorkGroup').next().hide();
        }
        $.each($('.FLN-summary-showunit'), function (ind, val) {
            valid = validTextbox($(this));
        });
        //$.each($('.edr-summary-budgetcode'), function (ind, val) {
        //    valid = validTextbox($(this));
        //});
        if ($('#FLN-Summary-page .valid-msg-error').is(":visible")) {
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
            if (NBCU.FileIngest.Helper.saveID == 0) {
                var savedata = NBCU.FileIngest.Helper.addItem(data, 'FileIngest');
                NBCU.FileIngest.Helper.saveID = savedata.d.Id;
            }
            else {
                NBCU.FileIngest.Helper.updateItem(data, 'FileIngest', NBCU.FileIngest.Helper.saveID);
            }
            NBCU.FileIngest.Master.redirectPage("Device");
        }
    }

    /* ------------- Init ------------------------ */
    this.Init = function () {
        $('#FLN-Summary-page span[title="Next"]').unbind('click');
        $('#FLN-Summary-page span[title="Next"]').bind('click', this.saveItem);
     
        $('#FLN-summary-producerasrequestor').unbind('change');
        $('#FLN-summary-producerasrequestor').change(function () {
            if ($(this).val() == "Yes") {
                $('#FLNProducer').show().text($('#FLN-summary-requester').text());
                NBCU.FileIngest.Helper.initializePeoplePickerValue('peoplePickerProducerFLNDiv', $('#FLN-summary-requester').text());
                $('#peoplePickerProducerFLNDiv').hide();
            }
            else {
                $('#FLNProducer').hide().text("");
                $('#peoplePickerProducerFLNDiv').show();
                NBCU.FileIngest.Helper.clearPeoplePicker('peoplePickerProducerFLNDiv');
            }
        });

        $('#FLN-airdateTBD').change(function () {
            if ($(this).is(":checked")) {
                $('#FLN-summary-txtairdate').val('')
            }
        });

        $('#FLN-summary-asap').change(function () {
            if ($(this).is(":checked")) {
                $('#FLN-dateneed-txtairdate').val('')
            }
        });
    }
}

NBCU.FileIngest.Summary.prototype.PostBack = false;