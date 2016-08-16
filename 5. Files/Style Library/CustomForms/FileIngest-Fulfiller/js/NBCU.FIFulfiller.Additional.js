NBCU.FIFulfiller.Additional = function () {
    var validCheck = true;
    this.productionTypeData = [];
    this.talentData = [];
    this.storyData = [];
    this.showUnitData = [];
    this.editRequestData;
    this.crt_TalentData = [];
    this.crt_ShowUnitData = [];
    this.crt_ShootData = [];

    this.AdditionalEditItems = function (event) {
        if ($(this).text() == "edit") {
            $(this).text("save");
            $(this).parent().parent().find('.display-data').hide();
            $('#getFile').show();
            $('#addFileButton').show();
            $('.browfe-info').show();
            $(this).parent().parent().find('.textbox').show();
        }
        else {
            var budgetCheck = true;
            $(this).text("edit");
            $('#getFile').hide();
            $('#addFileButton').hide();
            $('.browfe-info').hide();
            $(this).parent().parent().find('.display-data').each(function (ind, val) {
                var ctrlID = $(this).attr('id');
                $(this).show()
                $(this).text($(this).prev().val());
                $(this).prev().hide();
            });
            addiontalSectionSave();
        }
        event.stopPropagation();
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

    function addiontalSectionSave() {
        $('#FIF_cont_desc').text($('#FIF-contentDesc').val());
        $('#FIF_crewShooter').text($('#FIF_crewShooter_input').val());
        $('#FIF_crtid').text($('#FIF_crtid_input').val());
        $('#FIF_emails').text($('#FIF_emails_input').val());
        $('#FIF_harddrive_value').text($("input:radio[name='exteranlHD']:checked").val());
        $('#FIF_workgroup_value').text($('#FIF_workgroup_value').prev('select').val());
        $('#FIF_comments_value').text($('#FIF-comments').val());
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

                        var docItems = getCrewDoc(NBCU.FIFulfiller.Helper.staticEditRequestID);
                        var docItemsHTML = "";
                        $.each(docItems, function (ind, val) {
                            docItemsHTML += "<a href='/sites/bcast_prodreq/MWFDocument/" + val.Name + "'>" + val.Name + "</a> <br />";
                        })
                        $('.browfe-info').html(docItemsHTML);
                        $('#FIF_attached_file').html(docItemsHTML);
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
                itemMetadata.type, NBCU.FIFulfiller.Helper.staticEditRequestID, "File Ingest");

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

    this.Init = function () {
        $(".button-edit").off("click");
        $("#FIFSummary .button-edit").off("click");
        $("#FIFdevicecamera .button-edit").off("click");
        $("#FIFadditionalinfo .button-edit").off("click");
     
        editRequestData = this.editRequestData;
        storyData = this.storyData;
        showUnitData = this.showUnitData;
        $('#FIFadditionalinfo .button-edit').bind('click', this.AdditionalEditItems);

        if ($('#FIFadditionalinfo .button-edit').text() == "edit") {
            addiontalSectionSave();
        }
        $("input[name='exteranlHD']").unbind('change');
        $("input[name='exteranlHD']").change(function () {
            if ($(this).val() == "Yes") {
                $('#FIF_workgroup_value').prev('select').prop('disabled', false);
            }
            else {
                $('#FIF_workgroup_value').prev('select').val('');
                $('#FIF_workgroup_value').prev('select').prop('disabled', true);
            }
        });

        $('.browfe-info').show();
        $('.file-attach').unbind('click');
        $('.file-attach').click(function () {
            if (NBCU.FIFulfiller.Helper.staticEditRequestID != 0) {
                if (!!$('#getFile').val()) {
                    uploadFile();
                }
                else {
                    alert('Please Select file for upload');
                }
            }
        });
    }
};
NBCU.FIFulfiller.Additional.prototype.PostBack = false;