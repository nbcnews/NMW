NBCU.CrewRequest.Correspondent.What = function () {
    var validCheck = true;
    this.talentData = [];
    this.productionTypeData = [];
    this.storyData = [];
    this.showUnitData = [];

    this.clsAddShowUnit = function () {
        NBCU.CrewRequest.Helper.txtUnit++;

        var btn_click_cntl = '<div class="row row-Corrs-showunit">' +
							'<div class="cols-12 Corrs-cols-showunit">' +
							 '<div class="cols cols-5 form-group Corrs-form-showunit">' +
                                        '<label class="label label-display">Show Unit <sup class="mandatory">*</sup></label>' +
                                        '<div class="field-input">' +
                                            '<input class="selectbox-full" type="text" id="txtUnit-Corrs_' + NBCU.CrewRequest.Helper.txtUnit + '" txtUnit-corrs_id_' + NBCU.CrewRequest.Helper.txtUnit + '="">' +
                                             '<div class="valid-msg valid-msg-error">Please complete the required field</div>' +
									         '<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                                        '</div>' +
                                    '</div>' + '<div class="cols cols-7 form-group Corrs-form-budget">' + '<label class="label label-display">Budget Code <sup class="mandatory">*</sup></label>'
									+ '<div class="field-input">' + '<input type="text" class="selectbox-full" id="txtCorrscode_' + NBCU.CrewRequest.Helper.txtUnit + '" >' + '<div class="valid-msg valid-msg-error">Please complete the required field</div></div>' + '</div>' + '<span class="remove-button Corrs-button-remove-showunit"></span>' + '</div>';
        $(this).before(btn_click_cntl);
    };

    this.clsRemoveShowUnit = function () {
        $(this).closest('.Corrs-cols-showunit').remove();
    };

    this.clsAddTalent = function () {
        NBCU.CrewRequest.Helper.cntTalent++

        var btn_click_cntl = '<div class="cols-8 Corrs-forms-add-conatiner active">' +
                      '<label class="label label-display">Talent (On Site) <sup class="mandatory">*</sup></label>' +
                      '<div class="field-input">' +
                            '<input type="text" class="selectbox-full talent-sel-cls" id="talent_cls_' + NBCU.CrewRequest.Helper.cntTalent + '" talent_cls_id_' + NBCU.CrewRequest.Helper.cntTalent + '="">' +
                            '<div class="valid-msg valid-msg-error">Please complete the required field</div>' +
                            '<div class="valid-msg valid-msg-error">It is duplicated</div>' +
                      '</div>' +
					   '<span class="remove-button Corrs-button-remove-talent"></span> ' +
                  '</div>';
        $(this).parent().before(btn_click_cntl);
    };

    this.clsRemoveTalent = function () {
        $(this).closest('.Corrs-forms-add-conatiner').remove();
    };

    function getValidate() {
        $('#CLSwhatPage .valid-msg-error').hide()
        validCheck = true;
        if ($('#assignmentslug-CLS').val().trim() == "") {
            $('#assignmentslug-CLS').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#assignmentslug-CLS').next().hide();
        }
        var talent = [];
        $.each($("input:text[id^='talent_cls_']"), function (ind, val) {
            if ($(val).val().trim() == "") {
                $(val).next().show();
                validCheck = false;
            }
            else {
                if ($.inArray($(val).val().trim(), talent) !== -1) {
                    $(val).next().next().show();
                    $(val).next().hide();
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
        $.each($("input:text[id^='txtUnit-Corrs_']"), function (ind, val) {
            var index = $(val).attr('id').split('_')[1];
            if ($(val).val().trim() == "" || $('#txtCorrscode_' + index).val().trim() == "") {
                if ($(val).val().trim() == "") {
                    $(val).next().show();
                    validCheck = false;
                }
                else {
                    $('#txtCorrscode_' + index).next().show();
                    validCheck = false;
                }
            }
            else {
                if ($.inArray($(val).val().trim() + '|' + $('#txtCorrscode_' + index).val().trim(), budget) !== -1) {
                    $(val).next().next().show();
                    $('#txtCorrscode_' + index).next().hide();
                    $(val).next().hide();
                    validCheck = false;
                }
                else {
                    budget.push($(val).val().trim() + '|' + $('#txtCorrscode_' + index).val().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $('#txtCorrscode_' + index).next().hide();
                    $(val).next().hide();
                    $(val).next().next().hide();
                }
            }
        });
        return validCheck;
    };

    this.clsSaveUser = function () {
        validCheck = getValidate();
        if (validCheck) {
            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                StoryName: $('#txtStoryName-CLS').val().trim(),
                AssignmentSlug: $('#assignmentslug-CLS').val().trim(),
                AttachEditRequestID: $('#requestid-CLS').val().trim(),
                CrewStatus: 'Step2'
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.clsSaveID);
            var talent_data = [];
            var showunit_data = [];

            NBCU.CrewRequest.Helper.checkRemove('CRT_Talent', NBCU.CrewRequest.Helper.clsSaveID, 'CrewRequestID');

            $.each($("input:text[id^='talent_cls_']"), function (ind, val) {
                var talentIndex = val.id.split("_")[2];
                talent_data = {
                    __metadata: { 'type': 'SP.Data.CRT_x005f_TalentListItem' },
                    Title: $(val).val(),
                    CrewRequestID: NBCU.CrewRequest.Helper.clsSaveID.toString(),
                    TalentID: $('#' + val.id).attr('talent_cls_id_' + talentIndex).trim()
                };
                NBCU.CrewRequest.Helper.addItem(talent_data, 'CRT_Talent');
            });

            NBCU.CrewRequest.Helper.checkRemove('CRT_ShowUnit', NBCU.CrewRequest.Helper.clsSaveID, 'RequestID');

            $.each($("input:text[id^='txtUnit-Corrs_']"), function (ind, val) {
                if (!!$(this).val()) {
                    var showUnitIndex = val.id.split("_")[1];
                    showunit_data = {
                        __metadata: { 'type': 'SP.Data.CRT_x005f_ShowUnitListItem' },
                        Title: $(val).val(),
                        RequestID: NBCU.CrewRequest.Helper.clsSaveID.toString(),
                        ShowUnitID: $(val).attr('txtUnit-Corrs_id_' + showUnitIndex).trim(),
                        AssignedBudgetCode: $('#txtCorrscode_' + showUnitIndex).val()
                    };
                    NBCU.CrewRequest.Helper.addItem(showunit_data, 'CRT_ShowUnit');
                }
            });

            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="CLSwherePage"]').attr('title').trim() : $(this).attr('next').trim());
        }

        event.stopPropagation();
    };

    function getCrewDoc(CRid) {
        var returnArray = [];
        $.ajax({
            url: "/sites/bcast_prodreq/_vti_bin/listdata.svc/MWFDocument?$select=Id,AssociatedRequestID,Name,RequestType&$filter=AssociatedRequestID eq '" + CRid + "' and RequestType eq 'Correspondent%20Live%20Shot'",
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
    }

    // Upload the file.
    // You can upload files up to 2 GB with the REST API.
    function bnuploadFile() {

        // Define the folder path for this example.
        var serverRelativeUrlToFolder = '/sites/bcast_prodreq/MWFDocument';

        // Get test values from the file input and text input page controls.
        var fileInput = jQuery('#getFile-CLS');

        // Get the server URL.
        var serverUrl = _spPageContextInfo.webAbsoluteUrl;

        // Initiate method calls using jQuery promises.
        // Get the local file as an array buffer.
        var getFile = getFileBuffer();
        getFile.done(function (arrayBuffer) {

            // Add the file to the SharePoint folder.
            var addFile = addFileToFolder(arrayBuffer);
            addFile.done(function (file, status, xhr) {

                // Get the list item that corresponds to the uploaded file.
                var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
                getItem.done(function (listItem, status, xhr) {

                    // Change the display name and title of the list item.
                    var changeItem = updateListItem(listItem.d.__metadata);
                    changeItem.done(function (data, status, xhr) {
                        //alert('file uploaded and updated');

                        var docItems = getCrewDoc(NBCU.CrewRequest.Helper.clsSaveID);
                        var docItemsHTML = "";
                        $.each(docItems, function (ind, val) {
                            docItemsHTML += "<a href='/sites/bcast_prodreq/MWFDocument/" + val.Name + "'>" + val.Name + "</a> <br />";
                        })
                        $('.browfe-info-cls').html(docItemsHTML);
                    });
                    changeItem.fail(onError);
                });
                getItem.fail(onError);
            });
            addFile.fail(onError);
        });
        getFile.fail(onError);
        // Get the local file as an array buffer.
        function getFileBuffer() {
            var deferred = jQuery.Deferred();
            var reader = new FileReader();
            reader.onloadend = function (e) {
                deferred.resolve(e.target.result);
            }
            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            }
            reader.readAsArrayBuffer(fileInput[0].files[0]);
            return deferred.promise();
        }

        // Add the file to the file collection in the Shared Documents folder.
        function addFileToFolder(arrayBuffer) {

            // Get the file name from the file input control on the page.
            var parts = fileInput[0].value.split('\\');
            var fileName = parts[parts.length - 1];

            // Construct the endpoint.
            var fileCollectionEndpoint = String.format(
                    "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
                    "/add(overwrite=true, url='{2}')",
                    serverUrl, serverRelativeUrlToFolder, fileName);

            // Send the request and return the response.
            // This call returns the SharePoint file.
            return jQuery.ajax({
                url: fileCollectionEndpoint,
                type: "POST",
                data: arrayBuffer,
                processData: false,
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                    "content-length": arrayBuffer.byteLength
                }
            });
        }

        // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
        function getListItem(fileListItemUri) {

            // Send the request and return the response.
            return jQuery.ajax({
                url: fileListItemUri,
                type: "GET",
                headers: { "accept": "application/json;odata=verbose" }
            });
        }

        // Change the display name and title of the list item.
        function updateListItem(itemMetadata) {

            // Define the list item changes. Use the FileLeafRef property to change the display name.
            // For simplicity, also use the name as the title.
            // The example gets the list item type from the item's metadata, but you can also get it from the
            // ListItemEntityTypeFullName property of the list.
            //var body = String.format("{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}','AssociatedRequestID':'{3}','RequestType':'{4}'}}",
            //    itemMetadata.type, newName, newName,"23","Crew Request");

            var body = String.format("{{'__metadata':{{'type':'{0}'}},'AssociatedRequestID':'{1}','RequestType':'{2}'}}",
                itemMetadata.type, NBCU.CrewRequest.Helper.clsSaveID, "Correspondent Live Shot");

            // Send the request and return the promise.
            // This call does not return response content from the server.
            return jQuery.ajax({
                url: itemMetadata.uri,
                type: "POST",
                data: body,
                headers: {
                    "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                    "content-type": "application/json;odata=verbose",
                    "content-length": body.length,
                    "IF-MATCH": itemMetadata.etag,
                    "X-HTTP-Method": "MERGE"
                }
            });
        }
    }
    // Display error messages.
    function onError(error) {
        //alert(error.responseText);
    }

    this.redirect = function () {
        if ($(this).attr('title').trim() == "CLSBack") {
            $('.clsNav li').removeClass('active-inprogress').removeClass('active');
            $('.clsNav li:eq(0)').addClass('active-inprogress');
            $("#CLSwhoPage").show();
            $("#CLSwhatPage").hide();
            $("#CLSwherePage").hide();
            $("#CLSwhenPage").hide();
        }
        else {
            NBCU.CrewRequest.Master.redirectPage($(this).attr('title').trim());
        }
    }

    this.Init = function () {
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        talentData = this.talentData;
        $("#CLSwhatPage .Corrs-button-addt").unbind('click');
        $("#CLSwhatPage .Corrs-button-addt").bind('click', this.clsAddTalent);
        $(document).on("click", "#CLSwhatPage .Corrs-button-remove-talent", this.clsRemoveTalent);
        $("#CLSwhatPage .Corrs-button-addsu").unbind('click');
        $("#CLSwhatPage .Corrs-button-addsu").bind('click', this.clsAddShowUnit);
        $(document).on("click", "#CLSwhatPage .Corrs-button-remove-showunit", this.clsRemoveShowUnit);
        $('#CLSwhatPage span[title="CLSBack"]').unbind('click');
        $('#CLSwhatPage span[title="CLSBack"]').bind('click', this.redirect);
        $('#CLSwhatPage span[title="CLSNext"]').unbind('click');
        $('#CLSwhatPage span[title="CLSNext"]').bind('click', this.clsSaveUser);

        $('#CorrespondentLiveShot span[title="CLSwhoPage"]').unbind('click');
        $('#CorrespondentLiveShot span[title="CLSwhoPage"]').bind('click', this.redirect);
        $('#CorrespondentLiveShot span[title="CLSwhoPage"]').css('cursor', 'pointer');
        $('#CorrespondentLiveShot span[title="CLSwherePage"]').unbind('click');
        $('#CorrespondentLiveShot span[title="CLSwherePage"]').bind('click', this.clsSaveUser);
        $('#CorrespondentLiveShot span[title="CLSwherePage"]').css('cursor', 'pointer');
        $('#CorrespondentLiveShot span[title="CLSwhenPage"]').css('cursor', '');
        $('#CorrespondentLiveShot span[title="CLSwhenPage"]').unbind('click');

        $('#CLSwhatPage .file-attach').click(function () {
            if (NBCU.CrewRequest.Helper.clsSaveID != 0) {
                if (!!$('#getFile-CLS').val()) {
                    bnuploadFile();
                }
                else {
                    alert('Please Select file for upload');
                }
            }
        });

        var finalDataShowUnit = $.map(showUnitData, function (item) {
            return {
                label: item.ShowUnitTitle,
                value: item.ShowUnitTitle,
                title: item.DefaultBudgetCode,
                id: item.ID
            }
        });

        $(document).on('focus.autocomplete', "input:text[id^='txtUnit-Corrs_']", function () {
            $(this).autocomplete({
                source: finalDataShowUnit,
                width: 300,
                //height:250,
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
                        $('#txtUnit-Corrs_' + index).val(ui.item.label);
                        $('#txtCorrscode_' + index).val(ui.item.title);
                        $('#txtUnit-Corrs_' + index).attr('txtUnit-corrs_id_' + index, ui.item.id);
                    }
                    else {
                        $('#txtCorrscode_' + index).val('');
                        $('#txtUnit-Corrs_' + index).attr('txtUnit-corrs_id_' + index, '');
                    }
                },
                focus: function (event, ui) {
                    $(this).closest('.Corrs-cols-showunit').find('input').last().val('');
                },
                search: function (event, ui) {
                    var searchIndex = $(this).closest('.Corrs-cols-showunit').find('input').first().attr('id').split("_")[1];
                    $(this).closest('.Corrs-cols-showunit').find('input').last().val('');
                    $('#txtUnit-Corrs_' + searchIndex).attr('txtUnit-corrs_id_' + searchIndex, '');
                }
            });
        });

        var finalDataTalent = $.map(talentData, function (item) {
            return {
                label: item.Title,
                value: item.Title,
                title: item.ID
            }
        });

        $(document).on('focus.autocomplete', "input:text[id^='talent_cls_']", function () {
            $(this).autocomplete({
                source: finalDataTalent,
                width: 300,
                //height:250,
                max: 20,
                delay: 100,
                minLength: 1,
                autoFocus: true,
                cacheLength: 1,
                scroll: true,
                highlight: false,
                select: function (event, ui) {
                    var index = this.id.split("_")[2];
                    if (!!ui.item.label) {
                        $('#talent_cls_' + index).val(ui.item.label);
                        $('#talent_cls_' + index).attr('talent_cls_id_' + index, ui.item.title);
                    }
                    else {
                        $('#talent_cls_' + index).attr('talent_cls_id_' + index, '');
                    }
                },
                search: function (event, ui) {
                    var searchIndex = $(this).closest('.Corrs-forms-add-conatiner').find('input').first().attr('id').split("_")[2];
                    $('#talent_cls_' + searchIndex).attr('talent_cls_id_' + searchIndex, '');
                }
            });
        });
    }
};
NBCU.CrewRequest.Correspondent.What.prototype.PostBack = false;