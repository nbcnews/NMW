NBCU.FIFulfiller.Master = function () {
    var validCheck = true;
    var editRequestData = [];
    var crt_TalentData = [];
    var crt_ShootData = [];
    var crt_ResourceData = [];
    var talentData = [];
    var productionTypeData = [];
    var storyData = [];
    var showUnitData = [];
    var stateData = [];
    var countryData = [];
    var audioNeedsData = [];
    var transmissionTypeData = [];
    var specialConditionData = [];
    var revisionNotes = [];
    var allShowUnit = '';
    var valideditsection = false;
    var currentUser = '';

    this.editPage = {
        FIFSummary: "Summary",
        FIFdevicecamera: "devicecamera",
        FIFadditionalinfo: "addinfo"
    };

    var userid = _spPageContextInfo.userId;

    /** Getting current user details **/
    this.GetCurrentUser = function () {
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";

        var requestHeaders = { "accept": "application/json;odata=verbose" };
        try {
            $.ajax({
                url: requestUri,
                contentType: "application/json;odata=verbose",
                headers: requestHeaders,
                success: onSuccess,
                error: onError
            });

        } catch (e) {
            console.log(e.message);
        }
    }

    this.onSuccess = function (data, request) {
        currentUser = data.d.Title;
    }

    this.onError = function (error) {
        alert(error);
    }

    /** Get the upload doucment **/
    function getCrewDoc(CRid) {
        var returnArray = [];
        try {
            $.ajax({
                url: "/sites/bcast_prodreq/_vti_bin/listdata.svc/MWFDocument?$select=Id,AssociatedRequestID,Name,RequestType&$filter=AssociatedRequestID eq '" + CRid + "' and RequestType eq 'File Ingest'",
                dataType: 'json',
                processData: false,
                async: false,
                success: function (data) {
                    $.each(data.d.results, function (i, item) {
                        returnArray.push({
                            id: item.Id,
                            CRid: item.AssociatedRequestID,
                            Name: item.Name
                        });
                    });
                }
            });
            return returnArray;

        } catch (e) {
            console.log(e.message);
        }
    }

    /** Fill data on load **/
    this.FillData = function () {

        $('.book-id').text(editRequestData.FileIngestID == null ? "" : editRequestData.FileIngestID);

        /** SUMMARY SECTION data load **/
        var airDate = "";
        if (editRequestData.AirDate != null || editRequestData.AirDate == "") {
            //airDate = new Date(editRequestData.AirDate)
            airDate = editRequestData.AirDate;
        }
        var dateNeeded = "";
        if (editRequestData.DateNeededBy != null || editRequestData.DateNeededBy == "") {
            //dateNeeded = new Date(editRequestData.DateNeededBy)
            dateNeeded = editRequestData.DateNeededBy;
        }
        $('#FIF_requesterName').text(editRequestData.RequestorName);
        $('#FIF_contact_value').text(editRequestData.RequestorContact == null ? "" : editRequestData.RequestorContact);
        $('#FIF_contact_value').prev('input').val(editRequestData.RequestorContact == null ? "" : editRequestData.RequestorContact);
        $('#FIF_deskphone_input').val(editRequestData.RequestorEmail == null ? "" : editRequestData.RequestorEmail);
        $('#FIF_deskphone_value').text(editRequestData.RequestorEmail == null ? "" : editRequestData.RequestorEmail);
        $('#FIF_producerName').text(editRequestData.ProducerName);
        $('#FIF_SeniorproducerName').text(editRequestData.SeniorProducer == null ? "" : editRequestData.SeniorProducer);
        $('#FIF_slugName').text(editRequestData.Slug == null ? "" : editRequestData.Slug);
        $('#FIF_slugName').prev('input').val(editRequestData.Slug == null ? "" : editRequestData.Slug);
        $('#FIF_airdate').text(airDate);
        $('#FIF_airdate').prev().prev('input').val(airDate);
        $('#FIF_airdate_input').val(airDate);
        $('#FIF_date_need').text(dateNeeded);
        $('#FIF_summary_dateneed_input').val(dateNeeded);
        $('#FIF_correspondent').text(editRequestData.Correspondent == null ? "" : editRequestData.Correspondent);
        $('#FIF_correspondent_input').val(editRequestData.Correspondent == null ? "" : editRequestData.Correspondent);
        $('#FIF_edr_id_input').val(editRequestData.AttachEditRequestID == null ? "" : editRequestData.AttachEditRequestID);
        $('#FIF_edr_id').text(editRequestData.AttachEditRequestID == null ? "" : editRequestData.AttachEditRequestID);
        $('#FIF_workgroup_input').val(editRequestData.Workgroup == null ? "" : editRequestData.Workgroup);
        $('#FIF_workgroup').text(editRequestData.Workgroup == null ? "" : editRequestData.Workgroup);
        if (editRequestData.AirDateTBD === "Yes" && editRequestData.AirDateTBD !== null) {
            $('#FIF-airdateTBD').prop('checked', true);
            $('#FIF-airdateTBD_value').text('Yes');
        }
        else {
            $('#FIF-airdateTBD').prop('checked', false);
            $('#FIF-airdateTBD_value').text('No');
        }
        if (editRequestData.DateNeededByASAP === "Yes" && editRequestData.DateNeededByASAP !== null) {
            $('#FIF_asap').prop('checked', true);
            $('#FIF_asap_value').text('Yes');
        }
        else {
            $('#FIF_asap').prop('checked', false);
            $('#FIF_asap_value').text('No');
        }

        $('#fif-summary-showunit_0').val(editRequestData.ShowUnit == null ? "" : editRequestData.ShowUnit);
        $('#fif_summary_showunit_value_0').text(editRequestData.ShowUnit == null ? "" : editRequestData.ShowUnit);
        $('#fif-summary-budgetcode_0').val(editRequestData.BudgetCode == null ? "" : editRequestData.BudgetCode);
        $('#fif_summary_budgetcode_value_0').text(editRequestData.BudgetCode == null ? "" : editRequestData.BudgetCode);

        /** ADDITIONAL INFO SECTION data load **/
        $('#FIF_cont_desc').text(editRequestData.ContentDescription == null ? "" : editRequestData.ContentDescription);
        $('#FIF-contentDesc').val(editRequestData.ContentDescription == null ? "" : editRequestData.ContentDescription);
        $('#FIF_crewShooter').text(editRequestData.CrewShooter == null ? "" : editRequestData.CrewShooter);
        $('#FIF_crewShooter_input').val(editRequestData.CrewShooter == null ? "" : editRequestData.CrewShooter);
        $('#FIF_crtid').text(editRequestData.CrewRequestID == null ? "" : editRequestData.CrewRequestID);
        $('#FIF_crtid_input').val(editRequestData.CrewRequestID == null ? "" : editRequestData.CrewRequestID); 
        $('#FIF_emails').text(editRequestData.AlternateEmails == null ? "" : editRequestData.AlternateEmails);
        $('#FIF_emails_input').val(editRequestData.AlternateEmails == null ? "" : editRequestData.AlternateEmails);
        $('#FIF_harddrive_value').text(editRequestData.IsExternalHardDrive == null ? "" : editRequestData.IsExternalHardDrive);
        $("input:radio[name='exteranlHD'][value=" + (editRequestData.IsExternalHardDrive == null ? "" : editRequestData.IsExternalHardDrive) + "]").attr('checked', 'checked');
        $('#FIF_workgroup_value').text(editRequestData.MaterialWorkgroup == null ? "" : editRequestData.MaterialWorkgroup);
        $('#FIF_workgroup_value').prev('select').val(editRequestData.MaterialWorkgroup == null ? "" : editRequestData.MaterialWorkgroup)
        
        $('#edrf_ff_comments').val(editRequestData.FFFulfillerComments == null ? "" : editRequestData.FFFulfillerComments);

        $('#FIF_Ful_assedti').val(editRequestData.AssistantEditor == null ? "" : editRequestData.AssistantEditor);
        $('#FIF_ful_status').val(editRequestData.FIStatus == null ? "New" : editRequestData.FIStatus);
        $('#FIF_bin_input').val(editRequestData.BinName == null ? "" : editRequestData.BinName);
        $('#FIF-comments').val(editRequestData.fiComments == null ? "" : editRequestData.fiComments);
        $('#FIF_comments_value').text(editRequestData.fiComments == null ? "" : editRequestData.fiComments);
        var docArr = getCrewDoc(NBCU.FIFulfiller.Helper.staticEditRequestID);
        var dcoHTML = "";
        $.each(docArr, function (ind, val) {
            dcoHTML += '<a href="/MWFDocument/' + val.Name + '">' + val.Name + '</a> <br />';
        });
        $('#FIF_attached_file').html(dcoHTML);
        $('.browfe-info').html(dcoHTML);
        try {
            var additionalRequirements = editRequestData.CameraType == null ? "" : editRequestData.CameraType;
            var cameratypearray = [];
            if (additionalRequirements !== "") {
                additionalRequirements = additionalRequirements.split(';');
                $('#FIF_cameratype').text(editRequestData.CameraType == null ? "" : editRequestData.CameraType);
                $.each($('[name="AdditionalRequirements"]'), function (ind, val) {
                    var data = $(val).next().text();
                    if (additionalRequirements.indexOf(data) !== -1) {
                        cameratypearray.push(data);
                        $('[name="AdditionalRequirements"]:eq(' + ind + ')').prop('checked', true);
                        if (data === "Other") {
                            $(val).next().next().show()
                            $(val).next().next().val(editRequestData.CameraTypeOther == null ? "" : editRequestData.CameraTypeOther);
                            cameratypearray.splice(cameratypearray.indexOf("Other"), 1);
                            cameratypearray.push(editRequestData.CameraTypeOther == null ? "" : editRequestData.CameraTypeOther);
                        }
                    }
                    else {
                        $('[name="AdditionalRequirements"]:eq(' + ind + ')').prop('checked', false);
                    }
                });
                $('#FIF_cameratype').text(cameratypearray.join(";"));
            }
            else {
                $('#FIF_cameratype').text('');
                $("input[name='AdditionalRequirements']").prop('checked', false);
            }
        } catch (e) {
            $('#FIF_cameratype').text(editRequestData.CameraType == null ? "" : editRequestData.CameraType);
        }

        try {
            var fileFormats = editRequestData.FileFormat == null ? "" : editRequestData.FileFormat;
            if (fileFormats !== "") {
                fileFormats = fileFormats.split(';');
                $.each($('[name="fif_fileformat"]'), function (ind, val) {
                    var data = $(val).next().text();
                    if (fileFormats.indexOf(data) !== -1) {
                        $('[name="fif_fileformat"]:eq(' + ind + ')').prop('checked', true);
                    }
                    else {
                        $('[name="fif_fileformat"]:eq(' + ind + ')').prop('checked', false);
                    }
                });
            }
        } catch (e) {
            console.log(e.message);
        }

        try {
            $('#fif_gizsize').val(editRequestData.GigSize == null ? "" : editRequestData.GigSize);
            var folderFormats = editRequestData.FolderFormat == null ? "" : editRequestData.FolderFormat;
            var otherText = editRequestData.FolderFormatOther == null ? "" : editRequestData.FolderFormatOther;
            if (folderFormats !== "") {
                folderFormats = folderFormats.split(';');
                $.each($('[name="fif_folderformat"]'), function (ind, val) {
                    var data = $(val).next().text();
                    if (folderFormats.indexOf(data) !== -1) {
                        $('[name="fif_folderformat"]:eq(' + ind + ')').prop('checked', true);
                        if (data === "OTHER") {
                            $('#otherformatdiv').show();
                            $('#othertxt_forlderformat').val(otherText);
                        }
                    }
                    else {
                        $('[name="fif_folderformat"]:eq(' + ind + ')').prop('checked', false);
                    }
                });
            }
        } catch (e) {
            console.log(e.message);
        }

        try {
            var othersData = editRequestData.Others == null ? "" : editRequestData.Others;
            if (othersData !== "") {
                othersData = othersData.split(';');
                $.each($('[name="fif_others"]'), function (ind, val) {
                    var data = $(val).next().text();
                    if (othersData.indexOf(data) !== -1) {
                        $('[name="fif_others"]:eq(' + ind + ')').prop('checked', true);
                    }
                    else {
                        $('[name="fif_others"]:eq(' + ind + ')').prop('checked', false);
                    }
                });
            }
        } catch (e) {
            console.log(e.message);
        }

        var externalDrive = editRequestData.IsExternalHardDrive == null ? "" : editRequestData.IsExternalHardDrive;
        if (externalDrive === 'No' || externalDrive === '') {
            $('#FIF_workgroup_value').prev('select').val('');
            $('#FIF_workgroup_value').prev('select').prop('disabled', true);
        }
        else {
            $('#FIF_workgroup_value').prev('select').prop('disabled', false);
        }
    }

    /** Revise comment update **/
    function reloadRevision() {
        if (revisionNotes.length > 0) {
            var data = "";
            var numContent = "";
            var num = 0;
            $.each(revisionNotes, function (ind, val) {
                var comments = val.RevisedComments == null ? "" : val.RevisedComments;
                if (val.RevisedNumber != "Revised") {
                    numContent = "-";
                }
                else {
                    num++;
                    numContent = num.toString();
                }
                data += '<div class="trow">' +
                               '<div class="td cols-1">' + numContent + '</div>' +
                               '<div class="td cols-2">' + val.RevisedBy + '</div>' +
                               '<div class="td cols-8">' + comments + '</div>' +
                               '<div class="td cols-2">' + val.RevicedDate + '</div>' +
                           '</div>';
            });

            $('.table-container .tbody').html(data);
        }
    }

    /** Get the URL params **/
    function getUrlVars() {
        var vars = [], hash;
        try {
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;

        } catch (e) {
            console.log(e.message);
        }
    }


    function addDevice(editReqeustDeviceData) {
        if (editReqeustDeviceData.length > 0) {
            $.each(editReqeustDeviceData, function (index, new_obj) {
                NBCU.FIFulfiller.Helper.txtDevice = index;
                var btn_click_cntl = '<div class="row">' +
                        '<div class="cols cols-3-5 form-group">' +
                            '<label class="label label-display">Device Type </label>' +
                            '<div class="display-data1">' +
                                '<select class="selectbox-full fif-DeviceType textbox" id="FIF_DeviceType_input_' + index + '">' +
                                    '<option></option><option>(None)</option><option>COMPACT FLASH CARD (CF CARD)</option><option>HARD DRIVE</option>' +
                                    '<option>MICRO SD CARD</option><option>OTHER</option><option>P2 CARD</option><option>PRODUCER MAILBOX</option>' +
                                    '<option>SD CARD</option><option>SXS CARD</option><option>THUMB DRIVE</option><option>XDCAM DISC</option>' +
                                    '</select>' +
                                '<span id="FIF_DeviceType_' + index + '" class="display-data"></span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="cols cols-3-5 form-group">' +
                            '<label class="label label-display">Quantity </label>' +
                            '<div class="display-data1">' +
                                '<input class="selectbox-full fif-Quantity textbox" type="text" id="FIF_Quantity_input_' + index + '">' +
                                '<span class="display-data" id="FIF_Quantity_' + index + '"></span>' +
                            '</div>'
                if (index != 0) {
                    btn_click_cntl += '<span class="remove-button button-remove-device"></span>';
                }
                btn_click_cntl += '</div></div>'
                
                if (index === 0) {
                    btn_click_cntl += '<div class="addbutton-container FIF-addbutton-container"> <span class="button-add1 button-addDevice">+ add addditional device</span> </div>'
                    $('#fif_device_camera').append(btn_click_cntl);
                }
                else {
                    $('.FIF-addbutton-container').before(btn_click_cntl);
                }

                $('#FIF_DeviceType_input_' + index).val(new_obj['DeviceType'] === null ? "" : new_obj['DeviceType']);
                $('#FIF_DeviceType_' + index).text(new_obj['DeviceType'] === null ? "" : new_obj['DeviceType']);
                $('#FIF_Quantity_input_' + index).val(new_obj['Quantity'] === null ? "" : new_obj['Quantity']);
                $('#FIF_Quantity_' + index).text(new_obj['Quantity'] === null ? "" : new_obj['Quantity']);
            });
        }
    }

    function returnKeyProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.FIF_peoplePickerProducerDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            if (typeof val.Key === "undefined") {
                returnVal += editRequestData.producerKey;
            }
            else {
                returnVal += val.Key + ";";
            }
        })
        return returnVal;
    }

    function returnKeySeniorProducer() {
        var returnVal = "";
        $.each(SPClientPeoplePicker.SPClientPeoplePickerDict.FIF_peoplePickerSeniorProducerDiv_TopSpan.GetAllUserInfo(), function (ind, val) {
            if (typeof val.Key === "undefined") {
                returnVal += editRequestData.SeniorProducerKey;
            }
            else {
                returnVal += val.Key + ";";
            }
        })
        return returnVal
    }

    function collectNewCrewData() {
        NBCU.FIFulfiller.Helper.neweditRequestData = {};
        NBCU.FIFulfiller.Helper.neweditRequestData.Title = $('#FIF_requesterName').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.RequestorName = $('#FIF_requesterName').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.RequestorContact = $('#FIF_contact_value').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.RequestorEmail = $('#FIF_deskphone_value').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.ProducerName = $('#FIF_producerName').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.SeniorProducer = $('#FIF_SeniorproducerName').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.Slug = $('#FIF_slugName').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.AirDate = $('#FIF_airdate').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.DateNeededBy = $('#FIF_date_need').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.Workgroup = $('#FIF_workgroup').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.Correspondent = $('#FIF_correspondent').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.AttachEditRequestID = $('#FIF_edr_id').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.Correspondent = $('#FIF_correspondent').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.AirDateTBD = editRequestData.AirDateTBD;
        NBCU.FIFulfiller.Helper.neweditRequestData.DateNeededByASAP = editRequestData.DateNeededByASAP;
        NBCU.FIFulfiller.Helper.neweditRequestData.ShowUnit = $('#fif_summary_showunit_value_0').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.BudgetCode = $('#fif_summary_budgetcode_value_0').text();

        NBCU.FIFulfiller.Helper.neweditRequestData.CameraType = editRequestData.CameraType;
        NBCU.FIFulfiller.Helper.neweditRequestData.CameraTypeOther = $('.othertxt').val();

        NBCU.FIFulfiller.Helper.neweditRequestData.ContentDescription = $('#FIF_cont_desc').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.CrewShooter = $('#FIF_crewShooter').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.CrewRequestID = $('#FIF_crtid').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.AlternateEmails = $('#FIF_emails').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.IsExternalHardDrive = $('#FIF_harddrive_value').text();
        NBCU.FIFulfiller.Helper.neweditRequestData.MaterialWorkgroup = $('#FIF_workgroup_value').text();

        NBCU.FIFulfiller.Helper.neweditRequestData.AssistantEditor = $('#FIF_Ful_assedti').val();
        NBCU.FIFulfiller.Helper.neweditRequestData.FIStatus = $('#FIF_ful_status').val();
        NBCU.FIFulfiller.Helper.neweditRequestData.BinName = $('#FIF_bin_input').val();
        NBCU.FIFulfiller.Helper.neweditRequestData.fiComments = $('#FIF_comments_value').text();

        var fileFormat = "";
        $.each($('[name="fif_fileformat"]:checked'), function (ind, val) {
            if (ind == $('[name="fif_fileformat"]:checked').length - 1) {
                fileFormat = fileFormat + $(this).next().text();
            }
            else {
                fileFormat = fileFormat + $(this).next().text() + ";";
            }
        });

        var folderFormat = ""; var folderformatother = "";
        $.each($('[name="fif_folderformat"]:checked'), function (ind, val) {
            if (ind == $('[name="fif_folderformat"]:checked').length - 1) {
                folderFormat = folderFormat + $(this).next().text();
            }
            else {
                folderFormat = folderFormat + $(this).next().text() + ";";
            }
            if ($(this).next().text() === "OTHER") {
                folderformatother = $('#othertxt_forlderformat').val();
            }
        });

        var othersData = "";
        $.each($('[name="fif_others"]:checked'), function (ind, val) {
            if (ind == $('[name="fif_others"]:checked').length - 1) {
                othersData = othersData + $(this).next().text();
            }
            else {
                othersData = othersData + $(this).next().text() + ";";
            }
        });
        NBCU.FIFulfiller.Helper.neweditRequestData.FileFormat = fileFormat;
        NBCU.FIFulfiller.Helper.neweditRequestData.FolderFormat = folderFormat;
        NBCU.FIFulfiller.Helper.neweditRequestData.FolderFormatOther = folderformatother;
        NBCU.FIFulfiller.Helper.neweditRequestData.Others = othersData;
        NBCU.FIFulfiller.Helper.neweditRequestData.GigSize = $('#fif_gizsize').val();
        NBCU.FIFulfiller.Helper.neweditRequestData.producerKey = returnKeyProducer();
        NBCU.FIFulfiller.Helper.neweditRequestData.SeniorProducerKey = returnKeySeniorProducer();
    }

    /** Validate the field and data **/
    function getValidate() {
        validCheck = true;
        if ($('#FIF_requesterName').text() == "" && $('#FIF_requesterName').prev().val() == "") {
            $('#FIF_requesterName').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#FIF_requesterName').next().hide();
        }
        if ($('#FIF_producerName').text() == "" && $('#FIF_producerName').prev().val() == "") {
            $('#FIF_producerName').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#FIF_producerName').next().hide();
        }
        if ($('#FIF_SeniorproducerName').text() == "" && $('#FIF_SeniorproducerName').prev().val() == "") {
            $('#FIF_SeniorproducerName').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#FIF_SeniorproducerName').next().hide();
        }
        if ($('#FIF_slugName').text() == "" && $('#FIF_slugName').prev().val() == "") {
            $('#FIF_slugName').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#FIF_slugName').next().hide();
        }

        var budget = [];
        $.each($("span[id^='fif_summary_showunit_value_']"), function (ind, val) {
            var index = $(this).attr('id').split('_')[4];
            if ($(val).text().trim() == "") {
                //$(val).next().show();
                //validCheck = false;
            }
            else {
                if ($.inArray($(val).text().trim() + '|' + $('#fif_summary_budgetcode_value_' + index).text().trim(), budget) !== -1) {
                    $(val).next().show();
                    validCheck = false;
                }
                else {
                    budget.push($(val).text().trim() + '|' + $('#fif_summary_budgetcode_value_' + index).text().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(val).next().hide();
                }
            }
        });

        $.each($("#fileIngestFulfiller .button-edit"), function (ind, val) {
            var section = $(val).attr('title');
            if ($(val).text().trim() == "save") {
                $('#valideditsection').show(0).delay(5000).hide(0);
                valideditsection = true;
                validCheck = false;
                return false;
            }
            else {
                validCheck = (validCheck == true) ? true : false;
                valideditsection = false;
                $('#valideditsection').hide();
            }
        });

        return validCheck;
    };

    /** Save data to the respective list **/
    this.SaveItem = function (event) {
        validCheck = getValidate();

        if (validCheck && !$('.sp-peoplepicker-errorMsg').is(":visible") && NBCU.FIFulfiller.Helper.staticEditRequestID != "") {
            collectNewCrewData();
            NBCU.FIFulfiller.Helper.neweditRequestData.__metadata = { 'type': 'SP.Data.FileIngestListItem' }
            NBCU.FIFulfiller.Helper.updateItem(NBCU.FIFulfiller.Helper.neweditRequestData, 'FileIngest', NBCU.FIFulfiller.Helper.staticEditRequestID);

            NBCU.FIFulfiller.Helper.checkRemove('AdditionalDevices', NBCU.FIFulfiller.Helper.staticEditRequestID, 'fileIngestID');
            $.each($("span[id^='FIF_DeviceType_']"), function (ind, val) {
                if ($(val).text().trim() != "") {
                    var deviceIndex = val.id.split("_")[2];
                    device_data = {
                        __metadata: { 'type': 'SP.Data.AdditionalDevicesListItem' },
                        Title: $(val).text(),
                        fileIngestID: NBCU.FIFulfiller.Helper.staticEditRequestID.toString(),
                        DeviceType: $(val).text(),
                        Quantity: $('#FIF_Quantity_' + deviceIndex).text()
                    };
                    NBCU.FIFulfiller.Helper.addItem(device_data, 'AdditionalDevices');
                }
            });

            if ($(window).width() >= 1200) {
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
            }
            else {
                window.location.href = "/Pages/home.aspx";
            }
            //$('#editRequest-fulfiller #edrf-header-status').removeClass().addClass('button').addClass('button-' + $('#editRequest-fulfiller .button-group-status').find('.active').attr('title').toLowerCase()).addClass('active');
        }
        else {
            $.each($('.valid-msg-error:visible'), function (ind, val) {
                if (valideditsection == true) {
                    setTimeout(function () {
                        $(val).parent('div')[0].scrollIntoView(true);
                    }, 5000)
                }
                else {
                    $(val).parent('div')[0].scrollIntoView(true);
                }
                return false;
            });
        }

        event.stopPropagation();
    };

    function updateEditor() {
        $.each($("input[id^='edrf_ff_assifrom_textbox_']"), function (ind, val) {
            var showEditorIndex = val.id.split("_")[4];
            var assfromSec = $('#edrf_ff_assifromsec_textbox_' + showEditorIndex).val();
            var asstoSec = $('#edrf_ff_assitosec_textbox_' + showEditorIndex).val();
            $('#edrf_editor_ff_assign_value_' + showEditorIndex).text($('#edrf_editor_ff_assign_textbox_' + showEditorIndex + '_TopSpan  span.ms-entity-resolved').text().trim());
            $('#edrf_ff_room_value_' + showEditorIndex).text($('#edrf_ff_room_textbox_' + showEditorIndex).val());
            $('#edrf_ff_assifrom_value_' + showEditorIndex).text($('#edrf_ff_assifrom_textbox_' + showEditorIndex).val() + ' ' + $('#edrf_ff_assifromTime_textbox_' + showEditorIndex).val() + ' ' + assfromSec + ((assfromSec === '0' || assfromSec === '00' || assfromSec === '000' || assfromSec === '1' | assfromSec === '01' || assfromSec === '001') ? ' Second' : ' Seconds'));
            $('#edrf_ff_assito_value_' + showEditorIndex).text($('#edrf_ff_assito_textbox_' + showEditorIndex).val() + ' ' + $('#edrf_ff_assitotime_textbox_' + showEditorIndex).val() + ' ' + asstoSec + ((asstoSec === '0' || asstoSec === '00' || asstoSec === '000' || asstoSec === '1' | asstoSec === '01' || asstoSec === '001') ? ' Second' : ' Seconds'));
        });
    }

    this.EditItems = function (event) {
        var ctrlTitle = $(this).attr('title');
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $(this).parent().parent().find('input[type="checkbox"]').show();
            $(this).parent().parent().find('.form-edr-craft-producer').show();
            $(this).parent().parent().find('.box-edr-producer-produer').show();
            $(this).parent().parent().find('.textbox').show();
            $(this).parent().parent().find('.icon-datepicker').css('display', 'inline-block');
            $(this).parent().parent().find('select').show();
            $(this).parent().parent().find('select').show();
            if (ctrlTitle === "Summary") {
                $('.calendar-fif-summary_dateneed').show();
                $('#fif-airdate').show();
                $('#FIF_summary_dateneed').show();
                $('.calendar-fif-airdate').show();
            }
            
        }
        else {
            if (!$('.sp-peoplepicker-errorMsg').is(':visible')) {
                $(this).text("edit");
                $(this).parent().parent().find('.display-data').each(function (ind, val) {
                    $(this).show()
                    $(this).text($(this).prev().val());
                    $(this).prev().hide();
                });
                $('#FIF_requesterName').text($('#FIF_peoplePickerRequesterDiv span.ms-entity-resolved').text());
                $('#FIF_producerName').text($('#FIF_peoplePickerProducerDiv span.ms-entity-resolved').text());
                $('#FIF_SeniorproducerName').text($('#FIF_peoplePickerSeniorProducerDiv span.ms-entity-resolved').text());
            }
        }
        var page = $(this).attr('title').trim();
        switch (page) {
            case editPage.FIFSummary:
                NBCU.FIFulfiller.Summary.PostBack = false;
                summary_page = new NBCU.FIFulfiller.Summary();
                summary_page.editRequestData = editRequestData;
                summary_page.showUnitData = showUnitData;
                summary_page.Init();
                break;
            case editPage.FIFdevicecamera:
                NBCU.FIFulfiller.Device.PostBack = false;
                devicecamera_page = new NBCU.FIFulfiller.Device();
                devicecamera_page.editRequestData = editRequestData;
                devicecamera_page.Init();
                break;
            case editPage.FIFadditionalinfo:
                NBCU.FIFulfiller.Additional.PostBack = false;
                additionalInfo_page = new NBCU.FIFulfiller.Additional();
                additionalInfo_page.editRequestData = editRequestData;
                additionalInfo_page.Init();
                break;
            default:
                break;
        }
        event.stopPropagation();
    };

    function initializePeoplePicker(peoplePickerElementId, AllowMultipleValues) {

        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = AllowMultipleValues;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';

        // Render and initialize the picker.
        // Pass the ID of the DOM element that contains the picker, an array of initial
        // PickerEntity objects to set the picker value, and a schema that defines
        // picker properties.
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
    };

    function initializePeoplePickerControl(peoplePickerElementId, displayValue) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = false;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        var users = new Array(1);
        var cnt = []
        try {
            cnt = displayValue.split('|');
            if (cnt.length == 1) {
                var defaultUser = new Object();
                defaultUser.DisplayText = displayValue;
                defaultUser.EntityType = "User";
                defaultUser.IsResolved = true;
                defaultUser.Resolved = true;
                users[0] = defaultUser;      // Render and initialize the picker. 
            }
            else {
                schema['AllowMultipleValues'] = true;
                $.each(cnt, function (index, newvalue) {
                    var defaultUser = new Object();
                    defaultUser.DisplayText = newvalue;
                    defaultUser.EntityType = "User";
                    defaultUser.IsResolved = true;
                    defaultUser.Resolved = true;
                    users[index] = defaultUser;
                });
            }
        } catch (e) {
            var defaultUser = new Object();
            defaultUser.DisplayText = displayValue;
            defaultUser.EntityType = "User";
            defaultUser.IsResolved = true;
            defaultUser.Resolved = true;
            users[0] = defaultUser;
        }

        //// Pass the ID of the DOM element that contains the picker, an array of initial
        //// PickerEntity objects to set the picker value, and a schema that defines
        //// picker properties.
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
    }

    this.ValidateEmail = function () {
        $(this).next().next().hide();
        var inputVal = $(this).val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(inputVal)) {
            $(this).next().next().show();
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

    function appendRoom(roomData, ctrl) {
        $(ctrl).find('option:not(:first)').remove();
        $.each(roomData, function (index, data) {
            $(ctrl).append('<option>' + data.Title + '</option>');
        });
    };

    function getUserProperties(targetUser) {
        SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function () {
            // Replace the placeholder value with the target user's credentials.
            //var targetUser = "domainName\\userName";

            // Get the current client context and PeopleManager instance.
            var clientContext = new SP.ClientContext.get_current();
            var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);

            // Get user properties for the target user.
            // To get the PersonProperties object for the current user, use the
            // getMyProperties method.
            personProperties = peopleManager.getPropertiesFor(targetUser);

            // Load the PersonProperties object and send the request.
            clientContext.load(personProperties);
            clientContext.executeQueryAsync(onRequestSuccess1, onRequestFail1);
        });
    }

    function onRequestSuccess1() {
        //var phoneNo = personProperties.get_userProfileProperties()['CellPhone'];
        var deskNo = personProperties.get_userProfileProperties()['WorkPhone'];
        var email = personProperties.get_userProfileProperties()['WorkEmail'];
        //alert(email);
        $('#FIF_contact_input').val(deskNo);
        $('#FIF_contact_value').text(deskNo);
        $('#FIF_deskphone_input').val(email);
        $('#FIF_deskphone_value').text(email);

        var peoplePickerId = 'FIF_peoplePickerRequesterDiv';
        var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerId + '_TopSpan'];

        //get selected users and select the second user (index 1) to remove
        var selectedUsers = peoplePicker.GetAllUserInfo();
        var userToRemoveKey = selectedUsers[1].Key;

        var resovledListElmId = peoplePicker.ResolvedListElementId;
        var elementToRemove = '';
        $('#' + resovledListElmId).children().each(function (index, element) {
            if (element.id.startsWith(peoplePickerId + '_TopSpan_' + userToRemoveKey + '_ProcessedUser')) {
                elementToRemove = element;
                return false;
            }
        });

        peoplePicker.DeleteProcessedUser(elementToRemove);

    }

    function onRequestFail1(sender, args) {
        alert('fail');
    }

    /* ------------- Init ------------------------ */
    this.init = function () {
        NBCU.FIFulfiller.Helper.staticEditRequestID = getUrlVars()["CRID"];
        editRequestData = NBCU.FIFulfiller.Helper.ReadList("/sites/NMWF", "FileIngest", NBCU.FIFulfiller.Helper.staticEditRequestID);
        editReqeustDeviceData = NBCU.FIFulfiller.Helper.ReadListData("/sites/NMWF", "AdditionalDevices", "?$select=ID,Title,DeviceType,Quantity&$filter=fileIngestID eq '" + NBCU.FIFulfiller.Helper.staticEditRequestID + "'");
        roomData = NBCU.FIFulfiller.Helper.ReadListData("/sites/NMWF", "Room", "?$select=ID,Title,Facilities1");
        showUnitData = NBCU.FIFulfiller.Helper.ReadListData("/sites/NMWF", "ShowUnit", "?$select=ShowUnitTitle,DefaultBudgetCode,ID");

        $('#fif-airdate').hide();
        $('#FIF_summary_dateneed').hide();
        
        $(document).on("click", ".button-edit", EditItems);
    
        $('#btn-submit').unbind('click');
        $('#btn-submit').bind('click', SaveItem);

        initializePeoplePicker('FIF_peoplePickerRequesterDiv', false);
        initializePeoplePicker('FIF_peoplePickerProducerDiv', false);
        initializePeoplePicker('FIF_peoplePickerSeniorProducerDiv', false);
  
        addDevice(editReqeustDeviceData);
        $('#ta_sourceMaterial').val('');
        $("#ta_sourceMaterial").removeClass('active');
        $("#ta_sourceMaterial").hide();
        FillData();
        $('#er-header-showimg').text(editRequestData.ShowUnit === null ? "" : editRequestData.ShowUnit);
        
        initializePeoplePickerControl('FIF_peoplePickerRequesterDiv', $('#FIF_requesterName').text());
        SPClientPeoplePicker.SPClientPeoplePickerDict.FIF_peoplePickerRequesterDiv_TopSpan.OnUserResolvedClientScript = function (peoplePickerId, selectedUsersInfo) {
            //console.log('inside OnUserResolvedClientScript');
            if (selectedUsersInfo.length == 1) {
                ExecuteOrDelayUntilScriptLoaded(getUserProperties(selectedUsersInfo[0].Key), "sp.js");
            }
            else {
                $('#FIF_contact_input').val("");
                $('#FIF_contact_value').text("");
                $('#FIF_deskphone_input').val("");
                $('#FIF_deskphone_value').text("");
            }
        };
        initializePeoplePickerControl('FIF_peoplePickerProducerDiv', $('#FIF_producerName').text());
        initializePeoplePickerControl('FIF_peoplePickerSeniorProducerDiv', $('#FIF_SeniorproducerName').text());

        //General Edit Summary
        datePickerLoad($('#fif-airdate'), '.calendar-fif-airdate', $('#FIF_airdate_input'));
        //General Edit Craft
        datePickerLoad($('#FIF_summary_dateneed'), '.calendar-fif-summary_dateneed', $('#FIF_summary_dateneed_input'));
        //Assigned from
        datePickerLoad($('#edrf_ff_assifrom_textbox_0'), $('#calendar-edrf-fulfil-date_0'), $('#edrf_ff_assifrom_textbox_0'));
        //Assigned to
        datePickerLoad($('#edrf_ff_assito_textbox_0'), $('#calendar-edrf-fulfil-to-date_0'), $('#edrf_ff_assito_textbox_0'));
        //Post air final
        datePickerLoad($('#edrf_posteditairdate_icon'), '.calendar-edrf_posteditairdate', $('#edrf_posteditairdate'));
        ////Assigned to
        //datePickerLoad($('#edrf_post_assito'), '.calendar-edrf-postedit-to-date', $('#edrf_post_assito'));

        GetCurrentUser();
        $('.button-remove-device').hide();
        $('.button-addDevice').hide();
        $('.browfe-info').hide();
        $('#er-header-slug').text($('#FIF_slugName').text());
        $('#er-header-datesubmitted').text(editRequestData.Created.split('T')[0]);

        var statusHeader = editRequestData.FIStatus == null ? "New" : editRequestData.FIStatus;
        $('#er-header-jobstatus').text(editRequestData.FIStatus == null ? "New" : editRequestData.FIStatus);
        $('#edFIF-header-status').text(editRequestData.FIStatus == null ? "New" : editRequestData.FIStatus);
        $('#edFIF-header-status').removeClass().addClass('button').addClass('button-' + statusHeader.toLowerCase()).addClass('active');

        $(document).on("keydown", "input:text[id^='FIF_Quantity_input_']", function (e) {
            $(this).limitkeypress({ rexp: /^^[0-9]?\d*$/ });
        });

        $("#FIF_contact_input").keydown(function () {
            $(this).limitkeypress({ rexp: /^[+]?\d*[ ]?\d*[1]?\d*[(]?\d*[0-9]?\d*\)?\d*[ ]?\d*[-]?\d*[0-9]?\d*[x]?\d*[0-3]?\d*$/ });
        });


        $('#edrf-Piecetbd').change(function () {
            if ($(this).is(":checked")) {
                $('#edrf_tbd_value').text('No');
                $('#edrf-PieceMinutes').val('');
                $('#edrf-PieceSeconds').val('');
                $('#edrf_length_time_value').text('');
            }
        });

        $('#edrf_producer_Piecetbd_textbox').change(function () {
            if ($(this).is(":checked")) {
                $('#edrf_producer_Piecetbd_value').text('No');
                $('#edr_producer_PieceMinutes_textbox').val('');
                $('#edr-producer-PieceSeconds').val('');
                $('#edr_producer_PieceMinutes_value').text('');
            }
        });


        $('#btn-cancel').click(function () {
            if ($(window).width() >= 1200) {
                SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.Ok, null);
            }
            else {
                window.location.href = "/Pages/home.aspx";
            }
        });

        $('#FIF-airdateTBD').change(function () {
            if ($(this).is(":checked")) {
                $('#FIF-airdateTBD_value').text('Yes');
                $('#FIF_airdate_input').val('');
                $('#FIF_airdate').text('');
            }
        });

        $('#FIF_asap').change(function () {
            if ($(this).is(":checked")) {
                $('#FIF_asap_value').text('Yes');
                $('#FIF_summary_dateneed_input').val('');
                $('#FIF_date_need').text('');
            }
        });

        $('#fif-airdate').click(function () {
            $('#FIF-airdateTBD').prop('checked', false);
            $('#FIF-airdateTBD_value').text('No');
        });

        $('#FIF_summary_dateneed').click(function () {
            $('#FIF_asap').prop('checked', false);
            $('#FIF_asap_value').text('No');
        });

        $('#fif_other_format').change(function () {
            if ($(this).is(":checked")) {
                $(this).prop('checked', true);
                $('#otherformatdiv').show();
                $('#othertxt_forlderformat').val('');
            }
            else {
                $('#otherformatdiv').hide();
                $('#othertxt_forlderformat').val('');
            }
        });
    }

    return {
        Init: init,
        EditItems: this.EditItems,
        EditResource: this.EditResource,
        FillData: this.FillData
    }

}();
$(document).ready(NBCU.FIFulfiller.Master.Init);