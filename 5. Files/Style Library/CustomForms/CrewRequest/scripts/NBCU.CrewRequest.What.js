var storyData = [];
NBCU.CrewRequest.What = function () {
    var validCheck = true;
    this.talentData = [];
    this.productionTypeData = [];
    this.storyData = [];
    this.showUnitData = [];

    this.AppendProductionType = function (productionTypeData) {
        $('#productiontype').find('option:not(:first)').remove();
        $.each(productionTypeData, function (index, data) {
            $('#productiontype').append('<option id="' + data.ID + '">' + data.ProductionType + '</option>');
        });
    };

    function AppendTalent(talentData, cntTalent) {
        var control = '#talent_' + NBCU.CrewRequest.Helper.cntTalent;
        $(control).find('option:not(:first)').remove();
        $.each(talentData, function (index, data) {
            var lastName = (data.TalentLastName == null) ? "" : ', ' + data.TalentLastName;
            $(control).append('<option id="' + data.ID + '">' + data.TalentFirstName + '' + lastName + '</option>');
        });
    };

    this.AddShowUnit = function () {
        NBCU.CrewRequest.Helper.txtUnit++;
        var btn_click_cntl = '<div class="cols-12 cols-showunit">' +
							 '<div class="cols-5 form-group form-showunit">' +
                                        '<label class="label label-display">Show Unit <sup class="mandatory">*</sup></label>' +
                                        '<div class="field-input">' +
                                            '<input class="selectbox-full" type="text" id="txtUnit_' + NBCU.CrewRequest.Helper.txtUnit + '" txtUnitid_' + NBCU.CrewRequest.Helper.txtUnit + '="">' +
                                             '<div class="valid-msg valid-msg-error">Please complete the required field</div>' +
									'<div class="valid-msg valid-msg-error">Showunit and budgetcode is duplicated</div>' +
                                        '</div>' +
                                    '</div>' + '<div class="cols-7 form-group form-budget">' + '<label class="label label-display">Budget Code <sup class="mandatory">*</sup></label>'
									+ '<div class="field-input">' + '<input type="text" class="selectbox-full bdjCodeDiv" id="txtBucode_' + NBCU.CrewRequest.Helper.txtUnit + '" ><div class="valid-msg valid-msg-error">Please complete the required field </div>'
                                    + '</div>' + '</div>' + '<span class="remove-button button-remove-showunit"></span>' + '</div>';
        //$(this).parent().prev('div').append(btn_click_cntl);
        $(this).parent().before(btn_click_cntl);
    };

    this.RemoveShowUnit = function () {
        $(this).closest('.cols-showunit').remove();
    };

    this.AddTalent = function () {
        NBCU.CrewRequest.Helper.cntTalent++
        var btn_click_cntl = '<div class="forms-add-conatiner">' +
                      '<label class="label label-display">Talent (On Site) <sup class="mandatory">*</sup></label>' +
                      '<div class="field-input">' +
                            '<input type="text" class="selectbox-full talent-sel" id="talent_' + NBCU.CrewRequest.Helper.cntTalent + '" talentid_' + NBCU.CrewRequest.Helper.cntTalent + '="">' +
                            '<div class="valid-msg valid-msg-error">Please complete the required field</div>' +
							'<div class="valid-msg valid-msg-error">It is duplicated</div>' +
                      '</div>' +
					   '<span class="remove-button button-remove-talent"></span> ' +
                  '</div>';

        $(this).parent().before(btn_click_cntl);
    };

    this.RemoveTalent = function () {
        $(this).closest('.forms-add-conatiner').remove();
    };

    this.ShowUnitAutoComplete = function (showUnitData) {
        $(document).on("click", "input:text[id^='txtUnit']", this.ShowUnitComplete);
    };

    function getValidate() {
        $('#whatPage .valid-msg-error').hide()
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
            var index = $(this).closest('.form-budget').prev().find('input').attr('id').split('_')[1];
            if ($(this).closest('.form-budget').prev().find('input').val().trim() == "" || $('#txtBucode_' + index).val().trim() == "") {
                if ($(this).closest('.form-budget').prev().find('input').val().trim() == "") {
                    $(this).closest('.form-budget').prev().find('input').next().show();
                    validCheck = false;
                }
                else {
                    $('#txtBucode_' + index).next().show();
                    validCheck = false;
                }

            }
            else {
                if ($.inArray($(this).closest('.form-budget').prev().find('input').val().trim() + '|' + $('#txtBucode_' + index).val().trim(), budget) !== -1) {
                    $(this).closest('.form-budget').prev().find('input').next().next().show();
                    $(this).closest('.form-budget').prev().find('input').next().hide();
                    $('#txtBucode_' + index).next().hide();
                    validCheck = false;
                }
                else {
                    budget.push($(this).closest('.form-budget').prev().find('input').val().trim() + '|' + $('#txtBucode_' + index).val().trim());
                    validCheck = (validCheck == true) ? true : false;
                    $(this).closest('.form-budget').prev().find('input').next().hide();
                    $('#txtBucode_' + index).next().hide();
                    $(this).closest('.form-budget').prev().find('input').next().next().hide();
                }
            }
        });
        return validCheck;
    };

    this.saveUser = function () {
        validCheck = getValidate();
        if (validCheck) {
            var data = {
                __metadata: { 'type': 'SP.Data.CrewRequestListItem' },
                ProductionType: $('#productiontype option:selected').text().trim(),
                StoryName: $('#txtStoryName').val().trim(),
                AssignmentSlug: $('#assignmentslug').val().trim(),
                ShootStatus: $('#shootstatus option:selected').text().trim(),
                AttachEditRequestID: $('#requestid').val().trim(),
                CrewStatus: 'Step2'
            };
            NBCU.CrewRequest.Helper.updateItem(data, 'CrewRequest', NBCU.CrewRequest.Helper.saveID);
            var talent_data = [];
            var showunit_data = [];

            NBCU.CrewRequest.Helper.checkRemove('CRT_Talent', NBCU.CrewRequest.Helper.saveID, 'CrewRequestID');

            /** Save/Update Talent data into list**/
            $.each($('.talent-sel'), function (ind, val) {
                //var talentIndex = val.id.split("_")[1];
                talent_data = {
                    __metadata: { 'type': 'SP.Data.CRT_x005f_TalentListItem' },
                    Title: $(val).val(),
                    CrewRequestID: NBCU.CrewRequest.Helper.saveID.toString(),
                    TalentID: $(val).val()
                };
                NBCU.CrewRequest.Helper.addItem(talent_data, 'CRT_Talent');
            });

            NBCU.CrewRequest.Helper.checkRemove('CRT_ShowUnit', NBCU.CrewRequest.Helper.saveID, 'RequestID');

            /** Save/Update ShowUnit and Budgetcode data into list**/
            $.each($('.bdjCodeDiv'), function (ind, val) {
                if (!!$(this).val()) {
                    var showUnitIndex = $(this).closest('.form-budget').prev().find('input').attr('id').split("_")[1];
                    showunit_data = {
                        __metadata: { 'type': 'SP.Data.CRT_x005f_ShowUnitListItem' },
                        Title: $(this).closest('.form-budget').prev().find('input').val(),
                        RequestID: NBCU.CrewRequest.Helper.saveID.toString(),
                        ShowUnitID: $(this).closest('.form-budget').prev().find('input').attr('txtUnitid_' + showUnitIndex),
                        AssignedBudgetCode: $(this).val()
                    };
                    NBCU.CrewRequest.Helper.addItem(showunit_data, 'CRT_ShowUnit');
                }
            });

            NBCU.CrewRequest.Master.redirectPage($(this).attr('next') == null ? $('span[title="Where"]').attr('title').trim() : $(this).attr('next').trim());
        }

    };

    /**Fetching the document from list**/
    function getCrewDoc(CRid) {
        var returnArray = [];
        try {
            $.ajax({
                url: "/sites/bcast_prodreq/_vti_bin/listdata.svc/MWFDocument?$select=Id,AssociatedRequestID,Name,RequestType&$filter=AssociatedRequestID eq '" + CRid + "' and RequestType eq 'Crew%20Request'",
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
            console.log(e.message)
        }
    }

    // Upload the file.
    // You can upload files up to 2 GB with the REST API.
    function uploadFile() {

        // Define the folder path for this example.
        var serverRelativeUrlToFolder = '/sites/bcast_prodreq/MWFDocument';

        // Get test values from the file input and text input page controls.
        var fileInput = jQuery('#getFile');
        var newName = jQuery('#displayName').val();

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

                        var docItems = getCrewDoc(NBCU.CrewRequest.Helper.saveID);
                        var docItemsHTML = "";
                        $.each(docItems, function (ind, val) {
                            docItemsHTML += "<a href='/sites/bcast_prodreq/MWFDocument/" + val.Name + "'>" + val.Name + "</a> <br />";
                        })
                        $('.browfe-info').html(docItemsHTML);
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
                itemMetadata.type, NBCU.CrewRequest.Helper.saveID, "Crew Request");

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
        NBCU.CrewRequest.Master.redirectPage($(this).text().trim());
    }


    this.Init = function () {        
        $('#whatPage .valid-msg-error').hide();
        $(".button-addsu").unbind('click');
        $(".button-addsu").bind('click', this.AddShowUnit);
        $(document).on("click", ".button-remove-showunit", this.RemoveShowUnit);
        if ($('#productiontype option').length <= 1) {
            talentData = this.talentData;
            productionTypeData = this.productionTypeData;
            storyData = this.storyData;
            showUnitData = this.showUnitData;
            this.AppendProductionType(productionTypeData);
        }
        else {
            storyData = this.storyData;
            showUnitData = this.showUnitData;
            talentData = this.talentData;
        }
        $(".button-addt").unbind('click');
        $(".button-addt").bind('click', this.AddTalent);
        $(document).on("click", ".button-remove-talent", this.RemoveTalent);
        $('span[title="Next"]').unbind('click');
        $('span[title="Next"]').bind('click', this.saveUser);
        $('span[title="Who"]').unbind('click');
        $('span[title="Who"]').bind('click', this.redirect);
        $('span[title="Who"]').css('cursor', 'pointer');
        $('span[title="Where"]').unbind('click');
        $('span[title="Where"]').bind('click', this.saveUser);
        $('span[title="Where"]').css('cursor', 'pointer');
        $('span[title="When"]').css('cursor', '');
        $('span[title="Resources"]').css('cursor', '');
        $('span[title="When"]').unbind('click');
        $('span[title="Resources"]').unbind('click');

        var finalStoryData = $.map(storyData, function (item) {
            return {
                label: item.Story,
                value: item.Story
            }
        });

        $('.file-attach').click(function () {
            if (NBCU.CrewRequest.Helper.saveID != 0) {
                if (!!$('#getFile').val()) {
                    uploadFile();
                }
                else {
                    alert('Please Select file for upload');
                }
            }
        });

        //$("#txtStoryName").autocomplete({
        //    //source: finalStoryData,
        //    source: storyData,
        //    width: 300,
        //    max: 20,
        //    delay: 100,
        //    minLength: 1,
        //    autoFocus: true,
        //    cacheLength: 1,
        //    scroll: true,
        //    highlight: false,
        //    select: function (event, ui) {
        //        $('#txtStoryName').val(ui.item.Story);
        //    }
        //});

        var finalDataShowUnit = $.map(showUnitData, function (item) {
            return {
                label: item.ShowUnitTitle,
                value: item.ShowUnitTitle,
                title: item.DefaultBudgetCode,
                id: item.ID
            }
        });

        $(document).on('focus.autocomplete', "input:text[id^='txtUnit']", function () {
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
                        $('#txtUnit_' + index).val(ui.item.label);
                        $('#txtBucode_' + index).val(ui.item.title);
                        $('#txtUnit_' + index).attr('txtUnitid_' + index, ui.item.id);
                    }
                    else {
                        $('#txtBucode_' + index).val('');
                        $('#txtUnit_' + index).attr('txtUnitid_' + index, '');
                    }
                },
                focus: function (event, ui) {
                    $(this).closest('.cols-showunit').find('input').last().val('');
                },
                search: function (event, ui) {
                    var searchIndex = $(this).closest('.cols-showunit').find('input').first().attr('id').split("_")[1];
                    $(this).closest('.cols-showunit').find('input').last().val('');
                    $('#txtUnit_' + searchIndex).attr('txtUnitid_' + searchIndex, '');
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

        $(document).on('focus.autocomplete', "input:text[id^='talent_']", function () {
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
                    var index = this.id.split("_")[1];
                    if (!!ui.item.label) {
                        $('#talent_' + index).val(ui.item.label);
                        $('#talent_' + index).attr('talentid_' + index, ui.item.title);
                    }
                    else {
                        $('#talent_' + index).attr('talentid_' + index, '');
                    }
                },
                search: function (event, ui) {
                    var searchIndex = $(this).closest('.forms-add-conatiner').find('input').first().attr('id').split("_")[1];
                    $('#talent_' + searchIndex).attr('talentid_' + searchIndex, '');
                }
            });
        });
    }


};
NBCU.CrewRequest.What.prototype.PostBack = false;