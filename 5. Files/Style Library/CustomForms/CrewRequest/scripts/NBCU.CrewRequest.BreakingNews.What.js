NBCU.CrewRequest.BreakingNews.What = function () {
    var validCheck = true;
    this.talentData = [];
    this.productionTypeData = [];
    this.storyData = [];
    this.showUnitData = [];

    this.bnAddShowUnit = function () {
        NBCU.CrewRequest.Helper.txtUnit++;
        var btn_click_cntl = '<div class="row row-bns-showunit">' +
							'<div class="cols-12 bns-cols-showunit">' +
							 '<div class="cols cols-5 form-group bns-form-showunit">' +
                                        '<label class="label label-display">Show Unit <sup class="mandatory">*</sup></label>' +
                                        '<div class="field-input">' +
                                            '<input class="selectbox-full" type="text" id="txtUnit-bns_' + NBCU.CrewRequest.Helper.txtUnit + '" txtUnit-bns-id_' + NBCU.CrewRequest.Helper.txtUnit + '="">' +
                                             '<div class="valid-msg valid-msg-error">Please complete the required field </div>' +
									         '<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                                        '</div>' +
                                    '</div>' + '<div class="cols cols-7 form-group bns-form-budget">' + '<label class="label label-display">Budget Code <sup class="mandatory">*</sup></label>'
									+ '<div class="field-input">' + '<input type="text" class="selectbox-full" id="txtbnscode_' + NBCU.CrewRequest.Helper.txtUnit + '">' + '<div class="valid-msg valid-msg-error">Please complete the required field </div></div>' + '</div>' + '<span class="remove-button bns-button-remove-showunit"></span>' + '</div>';
        $(this).before(btn_click_cntl);
    };

    this.bnRemoveShowUnit = function () {
        $(this).closest('.bns-cols-showunit').remove();
    };

    this.bnAddTalent = function () {
        NBCU.CrewRequest.Helper.cntTalent++
        var btn_click_cntl = '<div class="cols-8 bns-forms-add-conatiner active">' +
                     '<label class="label label-display">Talent (On Site) <sup class="mandatory">*</sup></label>' +
                     '<div class="field-input">' +
                         '<input type="text" class="selectbox-full talent-sel-bns" id="talent_bns_' + NBCU.CrewRequest.Helper.cntTalent + '" talent_bns-id_' + NBCU.CrewRequest.Helper.cntTalent + '="">' +
                                             '<div class="valid-msg valid-msg-error">Please complete the required field</div>' +
									'<div class="valid-msg valid-msg-error">It is duplicated</div>' +
                     '</div>' +
                      '<span class="remove-button bns-button-remove-talent"></span> ' +
                 '</div>';
        $(this).parent().before(btn_click_cntl);
    };

    this.bnRemoveTalent = function () {
        $(this).closest('.bns-forms-add-conatiner').remove();
    };

    function getValidate() {
        $('#bns-whatPage .valid-msg-error').hide()
        validCheck = true;
        if ($('#assignmentslug-bns').val().trim() == "") {
            $('#assignmentslug-bns').next().show();
            validCheck = false;
        }
        else {
            validCheck = (validCheck == true) ? true : false;
            $('#assignmentslug-bns').next().hide();
        }
        var talent = [];
        $.each($("input:text[id^='talent_bns_']"), function (ind, val) {
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
        $.each($("input:text[id^='txtUnit-bns_']"), function (ind, val) {
            var index = $(val).attr('id').split('_')[1];
            if ($(val).val().trim() == "" || $('#txtbnscode_' + index).val().trim() == "") {
                if ($(val).val().trim() == "") {
                    $(val).next().show();
                    validCheck = false;
                }
                else {
                    $('#txtbnscode_' + index).next().show();
                    validCheck = false;
                }
            }
            else {
                if ($.inArray($(val).val().trim() + '|' + $('#txtbnscode_' + index).val().trim(), budget) !== -1) {
                    $(val).next().next().show();
                    $('#txtbnscode_' + index).next().hide();
                    $(val).next().hide();
                    validCheck = false;
                }
                else {
                    budget.push($(val).val().trim() + '|' + $('#txtbnscode_' + index).val().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(val).next().hide();
                    $('#txtbnscode_' + index).next().hide();
                    $(val).next().next().hide();
                }
            }
        });
        return validCheck;
    };

    this.bnsSaveUser = function () {
        validCheck = getValidate();
        if (validCheck) {
            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                StoryName: $('#txtStoryName-bns').val().trim(),
                AssignmentSlug: $('#assignmentslug-bns').val().trim(),
                AttachEditRequestID: $('#requestid-bns').val().trim(),
                CrewStatus: 'Step2'
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.bnSaveID);
            var talent_data = [];
            var showunit_data = [];

            NBCU.CrewRequest.Helper.checkRemove('CRT_Talent', NBCU.CrewRequest.Helper.bnSaveID, 'CrewRequestID');

            $.each($("input:text[id^='talent_bns_']"), function (ind, val) {
                var talentIndex = val.id.split("_")[2];
                talent_data = {
                    __metadata: { 'type': 'SP.Data.CRT_x005f_TalentListItem' },
                    Title: $(val).val(),
                    CrewRequestID: NBCU.CrewRequest.Helper.bnSaveID.toString(),
                    TalentID: $('#' + val.id).attr('talent_bns-id_' + talentIndex).trim()
                };
                NBCU.CrewRequest.Helper.addItem(talent_data, 'CRT_Talent');
            });

            NBCU.CrewRequest.Helper.checkRemove('CRT_ShowUnit', NBCU.CrewRequest.Helper.bnSaveID, 'RequestID');

            $.each($("input:text[id^='txtUnit-bns_']"), function (ind, val) {
                if (!!$(this).val()) {
                    var showUnitIndex = val.id.split("_")[1];
                    showunit_data = {
                        __metadata: { 'type': 'SP.Data.CRT_x005f_ShowUnitListItem' },
                        Title: $(val).val(),
                        RequestID: NBCU.CrewRequest.Helper.bnSaveID.toString(),
                        ShowUnitID: $(val).attr('txtUnit-bns-id_' + showUnitIndex).trim(),
                        AssignedBudgetCode: $('#txtbnscode_' + showUnitIndex).val()
                    };
                    NBCU.CrewRequest.Helper.addItem(showunit_data, 'CRT_ShowUnit');
                }
            });
            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="bns-wherePage"]').attr('title').trim() : $(this).attr('next').trim());
        }

    };

    function getCrewDoc(CRid) {
        var returnArray = [];
        $.ajax({
            url: "/sites/bcast_prodreq/_vti_bin/listdata.svc/MWFDocument?$select=Id,AssociatedRequestID,Name,RequestType&$filter=AssociatedRequestID eq '" + CRid + "' and RequestType eq 'Breaking%20News'",
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
        var fileInput = jQuery('#getFile-bns');

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

                        var docItems = getCrewDoc(NBCU.CrewRequest.Helper.bnSaveID);
                        var docItemsHTML = "";
                        $.each(docItems, function (ind, val) {
                            docItemsHTML += "<a href='/sites/bcast_prodreq/MWFDocument/" + val.Name + "'>" + val.Name + "</a> <br />";
                        })
                        $('.browse-info-bns').html(docItemsHTML);
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
                itemMetadata.type, NBCU.CrewRequest.Helper.bnSaveID, "Breaking News");

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
        if ($(this).attr('title').trim() == "bnBack") {
            $('.bnsNav li').removeClass('active-inprogress').removeClass('active');
            $('.bnsNav li:eq(0)').addClass('active-inprogress');
            $('#bns-whoPage').show();
            $("#bns-whatPage").hide();
            $("#bns-wherePage").hide();
            $("#bns-whenPage").hide();
        }
        else {
            NBCU.CrewRequest.Master.redirectPage($(this).attr('title').trim());
        }
    }

    this.Init = function () {
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        talentData = this.talentData;
        $("#bns-whatPage .bns-button-addt").unbind('click');
        $("#bns-whatPage .bns-button-addt").bind('click', this.bnAddTalent);
        $(document).on("click", "#bns-whatPage .bns-button-remove-talent", this.bnRemoveTalent);
        $("#bns-whatPage .bns-button-addsu").unbind('click');
        $("#bns-whatPage .bns-button-addsu").bind('click', this.bnAddShowUnit);
        $(document).on("click", "#bns-whatPage .bns-button-remove-showunit", this.bnRemoveShowUnit);
        $('#bns-whatPage span[title="bnBack"]').bind('click', this.redirect);
        $('#bns-whatPage span[title="bnNext"]').unbind('click');
        $('#bns-whatPage span[title="bnNext"]').bind('click', this.bnsSaveUser);

        $('#BreakingNews span[title="bns-whoPage"]').unbind('click');
        $('#BreakingNews span[title="bns-whoPage"]').bind('click', this.redirect);
        $('#BreakingNews span[title="bns-whoPage"]').css('cursor', 'pointer');
        $('#BreakingNews span[title="bns-wherePage"]').unbind('click');
        $('#BreakingNews span[title="bns-wherePage"]').bind('click', this.bnsSaveUser);
        $('#BreakingNews span[title="bns-wherePage"]').css('cursor', 'pointer');
        $('#BreakingNews span[title="bns-whenPage"]').css('cursor', '');
        $('#BreakingNews span[title="bns-whenPage"]').unbind('click');
        //$('#txtStoryName-bns').val('News:');
        //$('#txtStoryName-bns').attr("disabled", true);

        //var finalStoryData = $.map(storyData, function (item) {
        //    return {
        //        label: item.Story,
        //        value: item.Story
        //    }
        //});

        //$("#txtStoryName-bns").autocomplete({
        //    source: finalStoryData,
        //    width: 300,
        //    //height:25,
        //    max: 20,
        //    delay: 100,
        //    minLength: 1,
        //    autoFocus: true,
        //    cacheLength: 1,
        //    scroll: true,
        //    highlight: false,
        //    select: function (event, ui) {
        //        $('#txtStoryName-bns').val(ui.item.Story);
        //    }
        //});


        $('#bns-whatPage .file-attach').click(function () {
            if (NBCU.CrewRequest.Helper.bnSaveID != 0) {
                if (!!$('#getFile-bns').val()) {
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
        $(document).on('focus.autocomplete', "input:text[id^='txtUnit-bns_']", function () {
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
                    var index = this.id.split("_")[1];
                    if (!!ui.item.title) {
                        $('#txtUnit-bns_' + index).val(ui.item.label);
                        $('#txtbnscode_' + index).val(ui.item.title);
                        $('#txtUnit-bns_' + index).attr('txtUnit-bns-id_' + index, ui.item.id);
                    }
                    else {
                        $('#txtbnscode_' + index).val('');
                        $('#txtUnit-bns_' + index).attr('txtUnit-bns-id_' + index, '');
                    }
                },
                focus: function (event, ui) {
                    $(this).closest('.bns-cols-showunit').find('input').last().val('');
                },
                search: function (event, ui) {
                    var searchIndex = $(this).closest('.bns-cols-showunit').find('input').first().attr('id').split("_")[1];
                    $(this).closest('.bns-cols-showunit').find('input').last().val('');
                    $('#txtUnit-bns_' + searchIndex).attr('txtUnit-bns-id_' + searchIndex, '');
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

        $(document).on('focus.autocomplete', "input:text[id^='talent_bns_']", function () {
            $(this).autocomplete({
                source: finalDataTalent,
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
                    if (!!ui.item.label) {
                        $('#talent_bns_' + index).val(ui.item.label);
                        $('#talent_bns_' + index).attr('talent_bns-id_' + index, ui.item.title);
                    }
                    else {
                        $('#talent_bns_' + index).attr('talent_bns-id_' + index, '');
                    }
                },
                search: function (event, ui) {
                    var searchIndex = $(this).closest('.bns-forms-add-conatiner').find('input').first().attr('id').split("_")[1];
                    $('#talent_bns_' + searchIndex).attr('talent_bns-id_' + searchIndex, '');
                }
            });
        });
    }
};
NBCU.CrewRequest.BreakingNews.What.prototype.PostBack = false;